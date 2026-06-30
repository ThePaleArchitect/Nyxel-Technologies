import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { verifyMessage } from 'viem';
import { redis } from '@/lib/redis';
import logger, { logError } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const { message, signature, address } = await req.json();

    if (!message || !signature || !address) {
      return NextResponse.json(
        { error: 'Message, signature, and address are required' },
        { status: 400 }
      );
    }

    // Extract nonce from SIWE message
    // Normal SIWE message format contains: "Nonce: <nonce>"
    const nonceMatch = message.match(/Nonce:\s*([a-zA-Z0-9]+)/);
    if (!nonceMatch) {
      return NextResponse.json(
        { error: 'Invalid message format: Missing nonce' },
        { status: 400 }
      );
    }

    const nonce = nonceMatch[1];
    const nonceKey = `nonce:${nonce}`;

    // Verify nonce exists and is single-use (Security Rule 16.1 - replay mitigation)
    const nonceExists = await redis.get(nonceKey);
    if (!nonceExists) {
      return NextResponse.json(
        { error: 'Nonce expired, invalid or already used.' },
        { status: 400 }
      );
    }

    // Delete nonce to prevent replay attacks
    await redis.del(nonceKey);

    // Verify cryptographic signature
    let isValid = false;
    try {
      isValid = await verifyMessage({
        address: address as `0x${string}`,
        message: message,
        signature: signature as `0x${string}`,
      });
    } catch (err: any) {
      logger.error({ error: err.message, address }, 'Signature verification threw error');
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid cryptographic signature' },
        { status: 400 }
      );
    }

    // Signature is valid! Create session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    // Scale tier is native to Web3 wallets (Section 6.5)
    const sessionData = {
      address: address.toLowerCase(),
      authType: 'web3',
      tier: 'Scale',
      expiresAt: Date.now() + 86400 * 1000, // 24 hours
    };

    // Store session in Redis
    const sessionKey = `session:${sessionToken}`;
    await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 86400 });

    logger.info({ address: address.toLowerCase(), tier: 'Scale' }, 'Web3 SIWE Session established');

    // Create response & set HTTP-only cookie
    const response = NextResponse.json({ success: true, redirect: '/vault/dashboard' });
    
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
    logError(error, { path: '/api/vault/web3/verify' });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
