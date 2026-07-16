'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Web3ConnectProps {
  onError: (msg: string) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export function Web3Connect({ onError, isLoading, setIsLoading }: Web3ConnectProps) {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();

  const handleSignAndEnter = async () => {
    if (!address || !isConnected) return;
    setIsLoading(true);
    onError('');

    try {
      // 1. Get nonce from server
      const nonceRes = await fetch('/api/vault/web3/nonce');
      if (!nonceRes.ok) {
        throw new Error('Failed to retrieve authentication nonce.');
      }
      const { nonce } = await nonceRes.json();

      // 2. Form SIWE Message
      const message = `nyxeltechnologies.com wants you to sign in with your Ethereum account:\n${address.toLowerCase()}\n\nURI: https://nyxeltechnologies.com\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}`;

      // 3. Request wallet signature
      const signature = await signMessageAsync({ message });

      // 4. Verify signature on backend
      const verifyRes = await fetch('/api/vault/web3/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          signature,
          address,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyRes.ok && verifyData.success) {
        // Save local authorization client flag
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('isAuthorized', 'true');
        }
        router.push(verifyData.redirect);
      } else {
        onError(verifyData.error || 'SIWE Signature verification failed.');
      }
    } catch (err: any) {
      console.error('SIWE Error:', err);
      onError(err.message || 'Failed to sign SIWE message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-center">
        <ConnectButton />
      </div>
      
      {isConnected && (
        <Button 
          variant="neo" 
          onClick={handleSignAndEnter} 
          disabled={isLoading}
          className="cursor-pointer w-full max-w-xs"
        >
          <Lock className="w-4 h-4 mr-2" />
          {isLoading ? 'Verifying Signature...' : 'Sign Message & Enter Vault'}
        </Button>
      )}
    </div>
  );
}
