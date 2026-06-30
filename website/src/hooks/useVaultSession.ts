'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VaultSession } from '@/types/session';

export function useVaultSession() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [session, setSession] = useState<VaultSession | null>(null);
  const router = useRouter();

  const checkSession = async () => {
    try {
      const res = await fetch('/api/vault/session');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          setSession(data.session);
        } else {
          setAuthenticated(false);
          setSession(null);
        }
      }
    } catch (e) {
      setAuthenticated(false);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('/logout'); // triggers next session deletion route
      setAuthenticated(false);
      setSession(null);
      router.push('/vault');
    } catch (e) {
      // Fallback redirect
      router.push('/vault');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    authenticated,
    session,
    logout,
    refresh: checkSession
  };
}
