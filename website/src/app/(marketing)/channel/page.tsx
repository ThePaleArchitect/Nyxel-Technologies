'use client';

import React, { useState } from 'react';
import { Send, Copy, Wallet, Check, AlertTriangle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { SLA_TABLE } from '@/lib/constants';

export default function ChannelPage() {
  // Web2 Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Solo Builder');
  const [tier, setTier] = useState<'Personal' | 'Incubation' | 'Scale' | 'Incident Response'>('Personal');
  const [brief, setBrief] = useState('');
  const [referral, setReferral] = useState('');
  const [ndaReady, setNdaReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Feedback States
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const roles = [
    'Solo Builder',
    'Bootstrapped Founder',
    'VC-Backed Founder',
    'CTO / Engineering Lead',
    'Enterprise Representative',
  ];

  const pgpPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.2
Comment: https://openpgpjs.org

xsFNBF8KxNYBEADf13N04e9c7d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w
3x4y5z0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv
wxyz0123456789+/=
=yX3e
-----END PGP PUBLIC KEY BLOCK-----`;

  const handleCopyPGP = () => {
    navigator.clipboard.writeText(pgpPublicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !companyName || !brief || !ndaReady) {
      setErrorMsg('Please complete all required fields and confirm NDA readiness.');
      return;
    }

    if (brief.length > 500) {
      setErrorMsg('Technical brief must not exceed 500 characters.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          companyName,
          role,
          tier,
          technicalBrief: brief,
          referralCode: referral,
          ndaReady,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Submission failed. Please try again.');
      } else {
        setSuccessMsg(data.message || 'Transmission successful. We will respond within 24 hours.');
        // Reset form
        setFullName('');
        setEmail('');
        setCompanyName('');
        setBrief('');
        setReferral('');
        setNdaReady(false);
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to transmit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 font-mono">
      {/* Header */}
      <div className="mb-16">
        <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest block mb-2">
          SECURE COMMUNICATION LINK
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#EAEAEA] mb-6">
          The Channel
        </h1>
        <p className="font-mono text-base text-[#888888] max-w-2xl leading-relaxed">
          Secure, direct, and obligation-free. We sign mutual NDAs before discovery, and respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Interactive Intake Form */}
        <div className="lg:col-span-7 space-y-6">
          {successMsg && (
            <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/30 p-6 text-[#00F0FF] text-xs">
              <strong className="uppercase font-bold block mb-1">Inquiry Transmitted</strong>
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="bg-[#FF1A1A]/10 border border-[#FF1A1A]/30 p-6 text-[#FF1A1A] text-xs flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="uppercase font-bold block mb-1">Transmission Error</strong>
                {errorMsg}
              </div>
            </div>
          )}

          <Card className="bg-[#121212] border border-[#2A2A2A] p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  id="channel-name"
                />
                <Input
                  label="Corporate Email"
                  type="email"
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="channel-email"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Company / Project Name"
                  type="text"
                  placeholder="Acme Inc"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  id="channel-company"
                />
                <div className="flex flex-col gap-2 font-mono">
                  <label htmlFor="channel-role" className="text-xs text-[#888888] uppercase tracking-wider">Your Role</label>
                  <select
                    id="channel-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-none px-4 py-3 font-mono text-[#EAEAEA] focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Engagement Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs text-[#888888] uppercase tracking-wider block">Engagement Tier</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Personal', 'Incubation', 'Scale', 'Incident Response'] as const).map((t) => {
                    const isActive = tier === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTier(t)}
                        className={`px-3 py-3 border text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/5'
                            : 'border-[#2A2A2A] text-[#888888] hover:text-[#EAEAEA] hover:border-[#888888]/40'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Brief */}
              <div className="space-y-2 relative">
                <Textarea
                  label="Technical Brief (500 chars max)"
                  placeholder="Summarize your stack setup, page requirements, animations, and infrastructure goals..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value.slice(0, 500))}
                  required
                  id="channel-brief"
                  className="pb-8"
                />
                <span className={`absolute bottom-2 right-3 text-[10px] ${brief.length >= 480 ? 'text-[#FF1A1A]' : 'text-[#666666]'}`}>
                  {500 - brief.length} chars remaining
                </span>
              </div>

              {/* Referral Code */}
              <Input
                label="Referral Code (Optional)"
                type="text"
                placeholder="NXC-REF-XXXX"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                id="channel-referral"
              />

              {/* NDA Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="channel-nda"
                  checked={ndaReady}
                  onChange={(e) => setNdaReady(e.target.checked)}
                  required
                  className="mt-1 cursor-pointer border-[#2A2A2A] bg-[#1A1A1A] focus:ring-[#00F0FF] accent-[#00F0FF]"
                />
                <label htmlFor="channel-nda" className="text-xs text-[#888888] leading-relaxed cursor-pointer select-none">
                  I confirm that our team is prepared to execute a mutual NDA before initiating architectural discovery. (Required)
                </label>
              </div>

              <Button type="submit" variant="neo" className="w-full cursor-pointer" disabled={submitting}>
                <Send className="w-4 h-4 mr-2" />
                {submitting ? 'Transmitting brief...' : 'Send Encrypted Inquiry'}
              </Button>
            </form>
          </Card>
        </div>

        {/* Right: Web3 XMTP, PGP Block, and SLA Matrix */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Web3 XMTP */}
          <Card className="bg-[#121212] border border-[#2A2A2A] p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#EAEAEA] flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#FF4500]" /> Web3 Channel (XMTP)
            </h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Prefer wallet-to-wallet secure communications? Connect your wallet to initiate an end-to-end encrypted chat session directly with our resolver address.
            </p>
            <div className="bg-black/40 border border-[#2A2A2A] p-4 text-xs font-mono select-all">
              <span className="text-[#666666] block uppercase tracking-wider mb-1">XMTP Domain</span>
              <strong className="text-[#00F0FF]">nxc.eth</strong>
            </div>
          </Card>

          {/* PGP Block */}
          <Card className="bg-[#121212] border border-[#2A2A2A] p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#EAEAEA] flex items-center gap-2">
                PGP Security Key
              </h3>
              <button
                onClick={handleCopyPGP}
                className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#FFD700]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Key'}
              </button>
            </div>
            <p className="text-xs text-[#888888] leading-relaxed">
              Prefer PGP encrypted email? Paste your message encrypted with our public key below and mail it to <a href="mailto:relay@nyxeltechnologies.com" className="text-[#00F0FF] hover:underline font-mono">relay@nyxeltechnologies.com</a>.
            </p>
            <textarea
              readOnly
              value={pgpPublicKey}
              className="w-full bg-black text-[9px] text-[#666666] font-mono p-3 border border-[#2A2A2A] h-[100px] select-all resize-none focus:outline-none"
            />
          </Card>

          {/* SLA Table */}
          <Card className="bg-[#121212] border border-[#2A2A2A] p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#EAEAEA]">
              Response SLA Table
            </h3>
            <div className="overflow-hidden border border-[#2A2A2A]">
              <table className="w-full text-left text-xs text-[#888888]">
                <thead>
                  <tr className="border-b border-[#2A2A2A] bg-black/60 text-[#EAEAEA] font-semibold">
                    <th className="p-2.5">Tier</th>
                    <th className="p-2.5">Response Time</th>
                    <th className="p-2.5">Who Replies</th>
                  </tr>
                </thead>
                <tbody>
                  {SLA_TABLE.map((item) => (
                    <tr key={item.tier} className="border-b border-[#2A2A2A]/40 last:border-none">
                      <td className="p-2.5 text-[#EAEAEA] font-semibold">{item.tier}</td>
                      <td className="p-2.5 text-[#00F0FF]">{item.responseTime}</td>
                      <td className="p-2.5">{item.whoReplies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
