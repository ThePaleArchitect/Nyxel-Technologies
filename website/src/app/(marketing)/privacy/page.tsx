import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 font-mono text-[#EAEAEA]">
      <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.01em] text-[#00F0FF] mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm text-[#888888] mb-12">LAST UPDATED: 2026-06-29</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            1. Zero-Data Retention Mission
          </h2>
          <p>
            We do not store, mine, sell, or share your data. Null Execution Collective operates on an absolute stealth and anonymous engineering paradigm. We do not use persistent tracking databases for visitor activities.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            2. One-Time Passcodes (OTP)
          </h2>
          <p>
            OTPs requested for Web2 authentication are cryptographically hashed and automatically deleted after 24 hours. We store no history of OTP tokens once verified or expired.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            3. Cookies
          </h2>
          <p>
            We use strictly necessary cookies only. The only cookie placed is <code className="bg-[#1A1A1A] px-1.5 py-0.5 border border-[#2A2A2A] text-[#00F0FF]">nx_vault_session</code>, which is an HTTP-only, SameSite=Strict session cookie required to maintain secure access to the Vault. No advertising, tracking, or third-party cookies are allowed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            4. Analytics
          </h2>
          <p>
            We do not run third-party tracking scripts (such as Google Analytics, Meta Pixels, or Mixpanel). Visual performance and anonymous edge requests are audited locally using privacy-preserving Vercel Analytics with zero aggregate logging of identifiable IPs.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            5. Contact and Data Deletion
          </h2>
          <p>
            You may request complete data scrubbing or submit inquiries regarding GDPR compliance at any time by mailing us at <a href="mailto:gdpr@nyxeltechnologies.com" className="text-[#00F0FF] hover:underline">gdpr@nyxeltechnologies.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
