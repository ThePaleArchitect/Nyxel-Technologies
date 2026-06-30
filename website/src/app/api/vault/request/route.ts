import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { redis } from '@/lib/redis';
import { sendOtpEmail } from '@/lib/email';
import { vaultRequestSchema } from '@/lib/validation/vaultRequest';
import { isCorporateEmail } from '@/lib/utils';
import logger, { logError } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = vaultRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, fullName, companyName, role, technicalChallenge } = result.data;

    // Corporate email check
    // If not a Personal request (indicated by role or optional fields, or general validation)
    // Section 6.7: "Corporate Email - Rejects Gmail for non-Personal"
    const isCorp = isCorporateEmail(email);
    const isPersonalTier = role.toLowerCase().includes('personal') || role.toLowerCase().includes('solo');

    if (!isCorp && !isPersonalTier) {
      return NextResponse.json(
        { error: 'Corporate email is required for Incubation and Scale tier access.' },
        { status: 400 }
      );
    }

    // Rate Limiting (based on IP or email)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimitKey = `ratelimit:vault:${ip}`;
    const rateLimitCount = await redis.incr(rateLimitKey);
    if (rateLimitCount === 1) {
      // Set TTL to 1 hour (3600 seconds)
      await redis.set(rateLimitKey, '1', { ex: 3600 });
    }
    const maxLimit = Number(process.env.VAULT_REQUEST_LIMIT) || 3;
    if (rateLimitCount > maxLimit) {
      logger.warn({ ip, email }, 'Vault request rate limit exceeded');
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      );
    }

    // Lockout Check
    const lockoutKey = `lockout:${email}`;
    const isLocked = await redis.get(lockoutKey);
    if (isLocked) {
      logger.warn({ email }, 'Locked out user tried to request OTP');
      return NextResponse.json(
        { error: 'This email is locked out due to too many failed attempts. Try again in an hour.' },
        { status: 423 }
      );
    }

    // Generate 6-digit OTP
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    // Hash the OTP before storage (Security Rule 24)
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Store in Redis with TTL 24 hours (86400 seconds)
    const otpKey = `otp:${email}`;
    await redis.set(otpKey, JSON.stringify({
      hash: hashedOtp,
      attempts: 0,
    }), { ex: 86400 });

    logger.info({ email, fullName, companyName }, 'Vault OTP generated & cached');

    // Send the email via Resend
    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent) {
      logger.error({ email }, 'Failed to deliver OTP email');
      return NextResponse.json(
        { error: 'Failed to deliver passcode email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'OTP passcode sent' });
  } catch (error: any) {
    logError(error, { path: '/api/vault/request' });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
