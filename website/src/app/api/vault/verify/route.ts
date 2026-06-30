import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { redis } from '@/lib/redis';
import logger, { logError } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and security passcode are required' },
        { status: 400 }
      );
    }

    const emailTrimmed = email.toLowerCase().trim();

    // Lockout Check
    const lockoutKey = `lockout:${emailTrimmed}`;
    const isLocked = await redis.get(lockoutKey);
    if (isLocked) {
      return NextResponse.json(
        { error: 'This email is locked out. Try again in an hour.' },
        { status: 423 }
      );
    }

    const otpKey = `otp:${emailTrimmed}`;
    const otpDataRaw = await redis.get(otpKey);
    if (!otpDataRaw) {
      return NextResponse.json(
        { error: 'Passcode expired or not found. Please request a new one.' },
        { status: 400 }
      );
    }

    const otpData = typeof otpDataRaw === 'string' ? JSON.parse(otpDataRaw) : otpDataRaw;
    const { hash: storedHash, attempts } = otpData;

    // Check attempts limit before verification
    if (attempts >= 3) {
      // Lock out the user for 1 hour (3600 seconds)
      await redis.set(lockoutKey, '1', { ex: 3600 });
      await redis.del(otpKey);
      logger.warn({ email: emailTrimmed }, 'User locked out due to exceeding maximum verification attempts');
      return NextResponse.json(
        { error: 'Too many failed attempts. You have been locked out for 1 hour.' },
        { status: 423 }
      );
    }

    // Verify OTP hash
    const inputHash = crypto.createHash('sha256').update(otp.trim()).digest('hex');

    if (inputHash !== storedHash) {
      const nextAttempts = attempts + 1;
      
      if (nextAttempts >= 3) {
        // Lock out
        await redis.set(lockoutKey, '1', { ex: 3600 });
        await redis.del(otpKey);
        logger.warn({ email: emailTrimmed }, 'Incorrect code. User locked out for 1 hour.');
        return NextResponse.json(
          { error: 'Too many failed attempts. You have been locked out for 1 hour.' },
          { status: 423 }
        );
      } else {
        // Update attempts
        await redis.set(otpKey, JSON.stringify({
          hash: storedHash,
          attempts: nextAttempts
        }), { ex: 86400 });
        
        logger.info({ email: emailTrimmed, attempts: nextAttempts }, 'Incorrect OTP code entered');
        return NextResponse.json(
          { error: `Incorrect passcode. ${3 - nextAttempts} attempts remaining.` },
          { status: 400 }
        );
      }
    }

    // Success! Generate secure random session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    // Determine tier based on email domain (non-corporate defaults to Personal, corporate can see Incubation/Scale depending on their request)
    // For simplicity, default to Incubation if corporate, otherwise Personal.
    const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com'];
    const domain = emailTrimmed.split('@')[1];
    const isCorp = !publicDomains.includes(domain);
    const tier = isCorp ? 'Incubation' : 'Personal';

    const adminEmails = ['admin@nyxeltechnologies.com', 'relay@nyxeltechnologies.com'];
    const role = adminEmails.includes(emailTrimmed) ? 'admin' : 'client';

    const sessionData = {
      email: emailTrimmed,
      authType: 'web2',
      tier,
      expiresAt: Date.now() + 86400 * 1000, // 24 hours
      role,
    };

    // Store session in Redis with 24 hours TTL
    const sessionKey = `session:${sessionToken}`;
    await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 86400 });
    
    // Delete OTP key
    await redis.del(otpKey);

    logger.info({ email: emailTrimmed, tier }, 'Session successfully established');

    // Create response and set cookie
    const response = NextResponse.json({ success: true, redirect: '/vault/dashboard' });
    
    // HTTP-only cookie setup (Security Rule 26 & 16.1)
    response.cookies.set({
      name: 'nx_vault_session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (error: any) {
    logError(error, { path: '/api/vault/verify' });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
