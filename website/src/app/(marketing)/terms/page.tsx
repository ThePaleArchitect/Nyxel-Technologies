import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 font-mono text-[#EAEAEA]">
      <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.01em] text-[#00F0FF] mb-8">
        Terms of Service
      </h1>
      <p className="text-sm text-[#888888] mb-12">LAST UPDATED: 2026-06-29</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            1. Intellectual Property & Ownership
          </h2>
          <p>
            All custom deliverables, source code repositories, configurations, and architecture designs created under paid engagements are the exclusive property of the client. Full intellectual property (IP) transfer takes effect immediately upon settlement of the final corresponding invoice or milestone release.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            2. NDA Readiness & Discovery
          </h2>
          <p>
            We operate in stealth. A standard mutual non-disclosure agreement (NDA) must be digitally signed by both parties before accessing client codebases, sharing structural details, or starting project discovery.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            3. Retainer Cancellation
          </h2>
          <p>
            Ongoing engineering retainers or recurring development support contracts operate under a 30-day notice policy. Clients may cancel or downscale rolling retainers by providing written notification 30 days prior.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            4. Service Level Guarantees
          </h2>
          <p>
            Incident Response tasks are performed on a best-effort basis according to the SLA specified in the contract. Emergency support alerts are handled by our rotating on-call engineering leads.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            5. Dispute Resolution
          </h2>
          <p>
            For Web3 Scale tier contracts, milestone payouts are managed via on-chain Escrow smart contracts. In the event of a technical dispute, the arbiter multi-sig address retains sole authority to release or refund funds based on code audits.
          </p>
        </section>
      </div>
    </div>
  );
}
