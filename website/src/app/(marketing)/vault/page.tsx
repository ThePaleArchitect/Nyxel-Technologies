'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Tabs } from '@/components/ui/Tabs';
import { isCorporateEmail } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { Web3Connect } from '@/components/vault/Web3Connect';

export default function VaultPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('web2');

  // Unified Loading State (uniform reactive boolean for form disabling)
  const [isLoading, setIsLoading] = useState(false);

  // Web2 Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Solo Builder');
  const [challenge, setChallenge] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

    setIsLoading(true);
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
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to send passcode.');
    } finally {
      setIsLoading(false);
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
                  {/* Google OAuth & Manual Email Intake side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end border border-[#2A2A2A]/50 bg-[#121212]/50 p-4">
                    <Input
                      label="Corporate Email Address"
                      type="email"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      id="web2-email"
                      disabled={isLoading}
                    />

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] text-[#888888] uppercase tracking-wider font-mono">Alternative Entry</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoading(true);
                          signIn('google');
                        }}
                        disabled={isLoading}
                        className="w-full bg-[#1A1A1A] text-[#EAEAEA] border border-[#2A2A2A] rounded-none py-3 px-4 font-mono text-xs hover:bg-[#2A2A2A]/50 transition-colors flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4 fill-current text-[#EAEAEA]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.535 0-6.4-2.865-6.4-6.4s2.865-6.4 6.4-6.4c1.77 0 3.3.722 4.412 1.889l3.243-3.243C19.64 2.457 16.18 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.877 0 10.87-4.258 10.87-11.24 0-.64-.06-1.28-.18-1.955H12.24z"/>
                        </svg>
                        Sign in with Google
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      id="web2-name"
                      disabled={isLoading}
                    />
                    <Input
                      label="Company Name"
                      type="text"
                      placeholder="Acme Corp"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      id="web2-company"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-2 font-mono">
                      <label htmlFor="web2-role" className="text-xs text-[#888888] uppercase tracking-wider">Role</label>
                      <select
                        id="web2-role"
                        className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-none px-4 py-3 font-mono text-sm text-[#EAEAEA] focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={isLoading}
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
                    disabled={isLoading}
                  />

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="web2-agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      disabled={isLoading}
                      className="mt-1 cursor-pointer border-[#2A2A2A] bg-[#1A1A1A] focus:ring-[#00F0FF] accent-[#00F0FF] disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label htmlFor="web2-agree" className="text-xs text-[#888888] leading-relaxed cursor-pointer select-none">
                      I confirm I have authority to request architecture specs for this domain. I understand all data is processed strictly under our privacy guarantees.
                    </label>
                  </div>

                  <Button type="submit" variant="neo" className="w-full cursor-pointer" disabled={isLoading}>
                    <Lock className="w-4 h-4 mr-2" />
                    {isLoading ? 'Transmitting Code...' : 'Request Vault Access'}
                  </Button>
                </form>
              ) : (
                /* WEB3 CONNECT (Refactored using Web3Connect with SIWE flow) */
                <div className="text-center py-8 space-y-8">
                  <div className="max-w-md mx-auto space-y-4">
                    <p className="text-sm text-[#888888] leading-relaxed">
                      Connect your Ethereum Web3 Wallet and cryptographically sign a message to verify ownership. Recommended for Scale tier ($18,000+) clients.
                    </p>
                  </div>

                  <Web3Connect 
                    onError={setErrorMsg} 
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
