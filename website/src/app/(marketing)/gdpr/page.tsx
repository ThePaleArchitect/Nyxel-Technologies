'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Check, AlertTriangle } from 'lucide-react';

export default function GDPRPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required.');
      return;
    }
    setError('');
    // Mock submit action
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 font-mono text-[#EAEAEA]">
      <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.01em] text-[#00F0FF] mb-8">
        GDPR Data Deletion
      </h1>
      <p className="text-sm text-[#888888] mb-12">
        Nyxel Technologies Collective stores no persistent personal logs. In strict compliance with GDPR Article 17, you may verify and request purging of any active session variables or OTP logs matching your email.
      </p>

      {submitted ? (
        <div className="bg-[#121212] border border-[#2A2A2A] p-8 max-w-xl">
          <div className="flex items-center gap-3 text-[#FFD700] mb-4">
            <Check className="w-6 h-6" />
            <h3 className="text-lg font-bold uppercase tracking-wider">Scrub Request Initiated</h3>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            A confirmation token has been transmitted to <strong className="text-[#00F0FF]">{email}</strong>. Please click the link inside the email to finalize the immediate database purge.
          </p>
          <Button variant="ghost" size="sm" onClick={() => setSubmitted(false)}>
            Submit Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#121212] border border-[#2A2A2A] p-8 max-w-xl space-y-6">
          <div className="flex items-start gap-3 bg-[#FF1A1A]/10 border border-[#FF1A1A]/30 p-4 text-[#FF1A1A] text-xs">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="uppercase font-bold block mb-1">Warning: Irreversible Action</strong>
              This will destroy all active Vault sessions, OTP caching logs, and active secure briefs associated with this email domain.
            </div>
          </div>

          <Input
            label="Corporate / Personal Email"
            type="email"
            placeholder="your@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            id="gdpr-email"
          />

          <Button type="submit" variant="neo" className="w-full">
            <Mail className="w-4 h-4 mr-2" />
            Request Immediate Data Purge
          </Button>
        </form>
      )}
    </div>
  );
}
