'use client';

import React, { useEffect } from 'react';
import { useVaultSession } from '@/hooks/useVaultSession';
import { useRouter, usePathname } from 'next/navigation';
import { TerminalCursor } from '@/components/shared/TerminalCursor';

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, authenticated, logout } = useVaultSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading and not authenticated, redirect to /vault
    // Except when we are currently on the verify page (where they are logging in)
    if (!loading && !authenticated && pathname !== '/verify') {
      router.push('/vault');
    }
  }, [loading, authenticated, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-mono text-[#00F0FF]">
        <div className="space-y-3 text-center">
          <div className="text-sm uppercase tracking-widest text-[#888888]">
            Verifying secure credentials
          </div>
          <div className="text-xl font-bold">
            ESTABLISHING VAULT LINK<TerminalCursor />
          </div>
        </div>
      </div>
    );
  }

  // Allow children if authenticated OR on /verify page
  if (authenticated || pathname === '/verify') {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return null;
}
