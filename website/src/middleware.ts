import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export async function middleware(req: any) {
  const path = req.nextUrl.pathname;
  
  // Define protected dashboard and admin routes
  if (path.startsWith('/vault/dashboard') || path.startsWith('/vault/admin')) {
    const sessionToken = req.cookies.get('nx_vault_session')?.value;
    
    if (!sessionToken) {
      const loginUrl = new URL('/vault', req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access check for Admin
    if (path.startsWith('/vault/admin')) {
      const url = process.env.UPSTASH_REDIS_REST_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN;
      
      if (url && token && !url.includes('your-cluster')) {
        try {
          const res = await fetch(`${url}/get/session:${sessionToken}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          const sessionPayload = data.result ? JSON.parse(data.result) : null;
          
          if (!sessionPayload || sessionPayload.role !== 'admin') {
            const vaultUrl = new URL('/vault', req.url);
            return NextResponse.redirect(vaultUrl);
          }
        } catch (e) {
          console.error('Middleware Admin check failed:', e);
        }
      }
    }
  }

  // Security Headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://gateway.pinata.cloud; connect-src 'self' https://mainnet.base.org https://arb1.arbitrum.io/rpc;"
  );

  return response;
}

export const config = {
  matcher: ['/vault/dashboard/:path*', '/vault/admin/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
