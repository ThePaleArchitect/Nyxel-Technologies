import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { logError } from '@/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('nx_vault_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false });
    }

    const sessionKey = `session:${sessionToken}`;
    const sessionDataRaw = await redis.get(sessionKey);
    
    if (!sessionDataRaw) {
      // Session expired in database
      const response = NextResponse.json({ authenticated: false });
      response.cookies.delete('nx_vault_session');
      return response;
    }

    const sessionData = typeof sessionDataRaw === 'string' ? JSON.parse(sessionDataRaw) : sessionDataRaw;
    
    // Check if expired
    if (Date.now() > sessionData.expiresAt) {
      await redis.del(sessionKey);
      const response = NextResponse.json({ authenticated: false });
      response.cookies.delete('nx_vault_session');
      return response;
    }

    const user_email_or_wallet = sessionData.email || sessionData.address || '';
    if (user_email_or_wallet) {
      const crypto = require('crypto');
      const internalSalt = process.env.INTERNAL_SECRET_SALT || 'default_internal_salt';
      const referralSalt = process.env.REFERRAL_SECRET_SALT || 'default_referral_salt';
      
      const blindHash = crypto.createHmac('sha256', internalSalt).update(user_email_or_wallet.toLowerCase()).digest('hex');
      const referralCodeHash = crypto.createHmac('sha256', referralSalt).update(blindHash).digest('hex');
      const referralCode = referralCodeHash.substring(0, 8);
      
      sessionData.referralCode = referralCode;
    }

    return NextResponse.json({
      authenticated: true,
      session: sessionData
    });
  } catch (error: any) {
    logError(error, { path: '/api/vault/session' });
    return NextResponse.json({ authenticated: false, error: 'Internal Error' }, { status: 500 });
  }
}
