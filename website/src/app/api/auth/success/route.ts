import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { redis } from '@/lib/redis';
import crypto from 'crypto';

export async function GET(req: any) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return NextResponse.redirect(new URL('/vault', req.url));
  }

  const emailTrimmed = session.user.email.toLowerCase().trim();
  
  // 1. Generate sessionToken
  const sessionToken = crypto.randomBytes(32).toString('hex');
  
  // 2. Determine tier & role
  const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com'];
  const domain = emailTrimmed.split('@')[1];
  const isCorp = !publicDomains.includes(domain);
  const tier = isCorp ? 'Incubation' : 'Personal';
  
  const adminEmails = ['paley@nyxeltechnologies.com', 'thepalearchitect@gmail.com'];
  const role = adminEmails.includes(emailTrimmed) ? 'admin' : 'client';
  
  const sessionData = {
    email: emailTrimmed,
    authType: 'web2',
    tier,
    expiresAt: Date.now() + 86400 * 1000,
    role,
  };
  
  // 3. Save to Redis
  const sessionKey = `session:${sessionToken}`;
  await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 86400 });
  
  // 4. Generate & Save Blind Hash (Requirement 6)
  const internalSalt = process.env.INTERNAL_SECRET_SALT || 'default_internal_salt';
  const blindHash = crypto.createHmac('sha256', internalSalt).update(emailTrimmed).digest('hex');
  await redis.sadd('nxc:verified_identities', blindHash);

  // 5. Create redirect response to vault/dashboard and set HTTP-only cookie nx_vault_session
  const response = NextResponse.redirect(new URL('/vault/dashboard', req.url));
  
  response.cookies.set({
    name: 'nx_vault_session',
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 86400,
  });

  return response;
}
