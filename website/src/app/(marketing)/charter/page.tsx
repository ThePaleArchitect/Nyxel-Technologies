'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CHARTER_PRINCIPLES } from '@/lib/constants';
import { useAccount, useSignTypedData } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { 
  prepareCharterAttestation, 
  completeOffchainAttestation, 
  verifyOffChainAttestation 
} from '@/services/easOffChain';

export default function CharterPage() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signTypedDataAsync } = useSignTypedData();

  const [status, setStatus] = useState<'idle' | 'signing' | 'verified' | 'error'>('idle');
  const [attestationJson, setAttestationJson] = useState<string | null>(null);

  // Load and verify saved off-chain attestation on mount
  useEffect(() => {
    const saved = localStorage.getItem('nxc_charter_attestation');
    if (saved) {
      try {
        const attestation = JSON.parse(saved);
        const isValid = verifyOffChainAttestation(attestation);
        if (isValid) {
          setStatus('verified');
          setAttestationJson(JSON.stringify(attestation, null, 2));
        }
      } catch (e) {
        console.error('Failed to verify saved off-chain attestation:', e);
      }
    }
  }, []);

  const handleSignAndVerify = async () => {
    if (!isConnected) {
      if (openConnectModal) {
        openConnectModal();
      }
      return;
    }

    setStatus('signing');
    try {
      // 1. Prepare EIP-712 parameters
      const prepared = prepareCharterAttestation(
        "Sovereign IP, Zero Leak, Elite Assembly, Dynamic Sprint, Escrow Scale, Permanent Anonymity",
        "Acknowledged & Immutably Signed",
        address!
      );

      // 2. Sign typed data via connected wallet client
      const signature = await signTypedDataAsync({
        domain: prepared.domain,
        types: prepared.types,
        primaryType: 'Attest',
        message: prepared.message,
      });

      // 3. Construct completed off-chain attestation
      const attestation = completeOffchainAttestation(prepared, signature, address!);

      // 4. Verify attestation cryptographically (strictly off-chain)
      const isValid = verifyOffChainAttestation(attestation);

      if (isValid) {
        setStatus('verified');
        const jsonStr = JSON.stringify(attestation, null, 2);
        setAttestationJson(jsonStr);
        localStorage.setItem('nxc_charter_attestation', jsonStr);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Off-chain signing/verification error:', err);
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 font-mono">
      {/* Hero Header */}
      <div className="mb-20">
        <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4" /> THE COLLECTIVE MANIFESTO
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#EAEAEA] mb-6">
          The Charter
        </h1>
        <p className="font-mono text-base text-[#888888] max-w-2xl leading-relaxed">
          The immutable principles that govern every engagement, mandate our anonymity, and safeguard your intellectual property.
        </p>
      </div>

      {/* 6 Principles Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {CHARTER_PRINCIPLES.map((principle) => (
          <motion.div key={principle.num} variants={itemVariants}>
            <Card 
              className="h-full border-l-4 border-l-[#FFD700] hover:border-[#FFD700] bg-[#121212] transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="font-serif text-3xl font-bold text-[#FFD700] select-none leading-none pt-1">
                  {principle.num}
                </span>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#EAEAEA] tracking-wide">
                    {principle.title}
                  </h3>
                  <p className="font-mono text-sm text-[#888888] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* EAS Attestation Box */}
      <div className="border border-[#2A2A2A] bg-black/40 p-8 text-center max-w-3xl mx-auto space-y-6">
        <p className="text-sm text-[#888888]">
          Sign these principles off-chain using your connected wallet. EAS Off-Chain signatures verify cryptographically without gas fees.
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          {status !== 'verified' ? (
            <button
              onClick={handleSignAndVerify}
              disabled={status === 'signing'}
              className={`inline-flex items-center gap-2 px-6 py-3 border font-mono text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                status === 'signing'
                  ? 'bg-[#1A1A1A] border-[#2A2A2A] text-[#888888] cursor-wait'
                  : 'bg-transparent border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] cursor-pointer'
              }`}
            >
              {status === 'signing' && <Loader2 className="w-4 h-4 animate-spin" />}
              {!isConnected ? 'Connect Wallet to Sign' : status === 'signing' ? 'Signing...' : 'Sign Charter Off-Chain'}
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 px-6 py-3 border bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] font-mono text-sm font-bold tracking-wider uppercase">
                <Check className="w-4 h-4" />
                <span>Attestation Verified</span>
              </div>
              <span className="text-[10px] text-emerald-400/80 font-mono uppercase tracking-widest animate-pulse">
                ✓ Cryptographic signature valid (Base Network EIP-712)
              </span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 text-rose-400 text-xs mt-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Attestation failed. Please check your wallet connection and try again.</span>
            </div>
          )}
        </div>

        {/* Display Off-Chain JSON payload if verified */}
        {attestationJson && (
          <div className="text-left mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#888888] font-bold uppercase tracking-wider">EAS Off-Chain Attestation Payload JSON</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('nxc_charter_attestation');
                  setAttestationJson(null);
                  setStatus('idle');
                }}
                className="text-xs text-rose-400 hover:underline hover:text-rose-300 font-bold uppercase tracking-wider"
              >
                Clear Signature
              </button>
            </div>
            <pre className="p-4 bg-[#121212] border border-[#2A2A2A] text-xs text-[#00F0FF] overflow-x-auto max-h-60 rounded-none font-mono scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-950">
              <code>{attestationJson}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Closing Quote */}
      <div className="mt-24 text-center">
        <blockquote className="font-serif italic font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-[#FFD700] tracking-[-0.01em] max-w-4xl mx-auto mb-6">
          "If these principles resonate, your infrastructure is ready for us."
        </blockquote>
        <p className="text-xs text-[#888888] uppercase tracking-widest font-mono">
          NULL EXECUTION COLLECTIVE &middot; DEPLOYED IN SCALE
        </p>
      </div>
    </div>
  );
}
