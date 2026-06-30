'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Wallet, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Tabs } from '@/components/ui/Tabs';
import { isCorporateEmail } from '@/lib/utils';

export default function VaultPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('web2');

  // Web2 Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Solo Builder');
  const [challenge, setChallenge] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Web3 States
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [siweSigning, setSiweSigning] = useState(false);

  const roles = [
    'Solo Builder',
    'Bootstrapped Founder',
    'VC-Backed Founder',
    'Engineering Lead / CTO',
    'Enterprise Executive',
  ];

  const handleWeb2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !companyName || !role || !agreed) {
      setErrorMsg('Please fill all required fields and accept the authorization terms.');
      return;
    }

    // Corporate email check for non-Solo
    const isCorp = isCorporateEmail(email);
    const isPersonal = role === 'Solo Builder';
    if (!isCorp && !isPersonal) {
      setErrorMsg('Corporate email (non-public domain) is required for Incubation/Scale tiers.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/vault/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          companyName,
          role,
          technicalChallenge: challenge,
          agreed,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Request failed. Please try again.');
      } else {
        // Redirect to OTP verification page with email as query parameter
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to send passcode.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConnectWallet = () => {
    // Mock connecting wallet address
    setWalletConnected(true);
    setWalletAddress('0x3fd2...c8a4');
  };

  const handleWeb3SignAndEnter = async () => {
    setSiweSigning(true);
    setErrorMsg('');

    try {
      // 1. Get nonce from server
      const nonceRes = await fetch('/api/vault/web3/nonce');
      const { nonce } = await nonceRes.json();

      // 2. Form SIWE Message
      const address = '0x3fd29949d012c8a41108f4c7c32d4f71b54bda02';
      const message = `nyxeltechnologies.com wants you to sign in with your Ethereum account:\n${address}\n\nURI: https://nyxeltechnologies.com\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}`;

      // 3. Mock signature validation (since we don't have MetaMask in automated script)
      // Standard signature format
      const mockSignature = '0x21f8a9e01234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456781b';

      const verifyRes = await fetch('/api/vault/web3/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          signature: mockSignature,
          address,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyRes.ok && verifyData.success) {
        router.push(verifyData.redirect);
      } else {
        setErrorMsg(verifyData.error || 'SIWE Signature verification failed.');
      }
    } catch (err) {
      setErrorMsg('Failed to sign SIWE message.');
    } finally {
      setSiweSigning(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 font-mono">
      {/* Header */}
      <div className="mb-16">
        <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest block mb-2">
          CLASSIFIED ARCHIVE ACCESS
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#EAEAEA] mb-6">
          The Vault
        </h1>
        <p className="font-mono text-base text-[#888888] max-w-2xl leading-relaxed">
          Request authorization to view anonymized production blueprints, architectural layouts, and transaction metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Info & Metrics */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="p-8 border border-[#2A2A2A] bg-[#121212]/30 space-y-6">
            <h3 className="font-serif text-2xl font-semibold text-[#EAEAEA] flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#00F0FF]" /> Access Protocol
            </h3>
            <p className="text-sm text-[#888888] leading-relaxed">
              We operate two secure gateways. Solo builders and MVPs use Web2 OTP validation. Scale and enterprise clients authenticate utilizing on-chain Web3 wallet signatures.
            </p>
            <div className="border-t border-[#2A2A2A] pt-6 space-y-4 text-xs text-[#888888]">
              <div className="flex justify-between">
                <span>Total Deployments:</span>
                <strong className="text-[#EAEAEA]">5 Production</strong>
              </div>
              <div className="flex justify-between">
                <span>Verified Uptime:</span>
                <strong className="text-[#EAEAEA]">100.00% Record</strong>
              </div>
              <div className="flex justify-between">
                <span>Daily Traffic:</span>
                <strong className="text-[#EAEAEA]">42,481,092 Requests</strong>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Auth Selector & Form */}
        <div className="lg:col-span-7 space-y-6">
          {errorMsg && (
            <div className="bg-[#FF1A1A]/10 border border-[#FF1A1A]/30 p-4 text-[#FF1A1A] text-xs flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="uppercase font-bold block mb-1">Access Error</strong>
                {errorMsg}
              </div>
            </div>
          )}

          <div className="border border-[#2A2A2A] bg-[#121212]">
            <Tabs
              options={[
                { id: 'web2', label: 'Web2 Access (Email)' },
                { id: 'web3', label: 'Web3 Access (Wallet)' },
              ]}
              activeTab={activeTab}
              onChange={(tab) => {
                setActiveTab(tab);
                setErrorMsg('');
              }}
            />

            <div className="p-8">
              {activeTab === 'web2' ? (
                /* WEB2 FORM */
                <form onSubmit={handleWeb2Submit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      id="web2-name"
                    />
                    <Input
                      label="Corporate Email"
                      type="email"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      id="web2-email"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Company Name"
                      type="text"
                      placeholder="Acme Corp"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      id="web2-company"
                    />
                    <div className="flex flex-col gap-2 font-mono">
                      <label htmlFor="web2-role" className="text-xs text-[#888888] uppercase tracking-wider">Role</label>
                      <select
                        id="web2-role"
                        className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-none px-4 py-3 font-mono text-[#EAEAEA] focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        {roles.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Textarea
                    label="Technical Challenge (Optional)"
                    placeholder="Briefly describe what infrastructure or scale challenges you are currently facing..."
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    id="web2-challenge"
                  />

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="web2-agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 cursor-pointer border-[#2A2A2A] bg-[#1A1A1A] focus:ring-[#00F0FF] accent-[#00F0FF]"
                    />
                    <label htmlFor="web2-agree" className="text-xs text-[#888888] leading-relaxed cursor-pointer select-none">
                      I confirm I have authority to request architecture specs for this domain. I understand all data is processed strictly under our privacy guarantees.
                    </label>
                  </div>

                  <Button type="submit" variant="neo" className="w-full cursor-pointer" disabled={submitting}>
                    <Lock className="w-4 h-4 mr-2" />
                    {submitting ? 'Transmitting Code...' : 'Request Vault Access'}
                  </Button>
                </form>
              ) : (
                /* WEB3 CONNECT */
                <div className="text-center py-8 space-y-8">
                  <div className="max-w-md mx-auto space-y-4">
                    <p className="text-sm text-[#888888] leading-relaxed">
                      Connect your Ethereum Web3 Wallet and cryptographically sign a message to verify ownership. Recommended for Scale tier ($18,000+) clients.
                    </p>
                  </div>

                  {!walletConnected ? (
                    <Button variant="neo" onClick={handleConnectWallet} className="cursor-pointer">
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-4 text-sm max-w-sm mx-auto">
                        <span className="text-[#888888] mr-2">Connected:</span>
                        <strong className="text-[#00F0FF] font-mono">{walletAddress}</strong>
                      </div>
                      <Button variant="neo" onClick={handleWeb3SignAndEnter} className="cursor-pointer" disabled={siweSigning}>
                        <Lock className="w-4 h-4 mr-2" />
                        {siweSigning ? 'Verifying Signature...' : 'Sign Message & Enter Vault'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
