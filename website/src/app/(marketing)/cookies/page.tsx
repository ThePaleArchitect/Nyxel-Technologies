import React from 'react';

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 font-mono text-[#EAEAEA]">
      <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.01em] text-[#00F0FF] mb-8">
        Cookie Policy
      </h1>
      <p className="text-sm text-[#888888] mb-12">LAST UPDATED: 2026-06-29</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            1. Cookie Usage Philosophy
          </h2>
          <p>
            We respect client privacy. Null Execution Collective does not utilize marketing, advertising, analytics, or third-party cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            2. Strictly Necessary Cookies
          </h2>
          <p>
            We set a single, essential session cookie when you authenticate to verify your identity before showing confidential architecture diagrams.
          </p>
          <table className="w-full mt-6 border-collapse border border-[#2A2A2A] text-left text-sm text-[#888888]">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-black/40 text-[#EAEAEA]">
                <th className="p-3 border-r border-[#2A2A2A]">Cookie Name</th>
                <th className="p-3 border-r border-[#2A2A2A]">Purpose</th>
                <th className="p-3">Lifespan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2A2A2A]">
                <td className="p-3 border-r border-[#2A2A2A] font-bold text-[#00F0FF]">nx_vault_session</td>
                <td className="p-3 border-r border-[#2A2A2A]">Stores secure encrypted session token to validate entry into the classified case studies Vault.</td>
                <td className="p-3">24 Hours</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            3. Control & Settings
          </h2>
          <p>
            Since this cookie is strictly required for technical operations, it cannot be disabled without preventing Vault access. You can clear cookies manually inside your browser settings at any time, which will immediately invalidate your session.
          </p>
        </section>
      </div>
    </div>
  );
}
