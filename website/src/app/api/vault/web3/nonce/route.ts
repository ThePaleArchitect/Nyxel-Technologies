import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { redis } from '@/lib/redis';
import { logError } from '@/lib/logger';

export async function GET() {
  try {
    // Generate secure random nonce
    const nonce = crypto.randomBytes(16).toString('hex');
    const nonceKey = `nonce:${nonce}`;

    // Store in Redis with 5 minute TTL (300 seconds)
    await redis.set(nonceKey, '1', { ex: 300 });

    return NextResponse.json({ nonce });
  } catch (error: any) {
    logError(error, { path: '/api/vault/web3/nonce' });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
