'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ShieldAlert, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useVaultSession } from '@/hooks/useVaultSession';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { authenticated } = useVaultSession();

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // If user is already authenticated, send them straight to dashboard
    if (authenticated) {
      router.push('/vault/dashboard');
    }
  }, [authenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit passcode.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/vault/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Verification failed. Try again.');
      } else {
        setIsAuthorized(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('isAuthorized', 'true');
        }
        router.push(data.redirect);
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to verify passcode.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 font-mono text-[#EAEAEA]">
      <Card className="w-full max-w-md border border-[#2A2A2A] bg-[#121212] p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">Security Check</h2>
          <p className="text-xs text-[#888888]">
            We have transmitted a 6-digit verification code to
            <br />
            <strong className="text-[#00F0FF] font-semibold">{email}</strong>
          </p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="bg-[#FF1A1A]/10 border border-[#FF1A1A]/30 p-4 text-[#FF1A1A] text-xs flex gap-2 items-start">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Security Passcode (OTP)"
            type="text"
            placeholder="000000"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            required
            id="verify-otp"
            disabled={isLoading}
            className="text-center text-2xl tracking-[10px] placeholder:tracking-normal font-bold"
          />

          <Button type="submit" variant="neo" className="w-full cursor-pointer" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Code & Enter Vault'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-2">
          <button 
            type="button"
            onClick={() => router.push('/vault')}
            className="text-xs text-[#888888] hover:text-[#EAEAEA] transition-colors"
          >
            &larr; Request a new code
          </button>
        </div>

      </Card>
    </div>
  );
}
