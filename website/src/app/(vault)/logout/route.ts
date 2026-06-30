import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('nx_vault_session')?.value;
  
  if (sessionToken) {
    const sessionKey = `session:${sessionToken}`;
    await redis.del(sessionKey);
  }

  const loginUrl = new URL('/vault', req.url);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete('nx_vault_session');
  return response;
}
