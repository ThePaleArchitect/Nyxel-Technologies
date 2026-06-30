import React from 'react';

export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 font-mono text-[#EAEAEA]">
      <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.01em] text-[#00F0FF] mb-8">
        Refund Policy
      </h1>
      <p className="text-sm text-[#888888] mb-12">LAST UPDATED: 2026-06-29</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <p className="text-lg text-[#FFD700] mb-6">
            We structure our pricing and payment models around customer security, technical clarity, and track specifics.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            1. Personal Tier ($50–$300)
          </h2>
          <p>
            We provide a <strong>100% refund guarantee</strong> within 7 days of repository delivery if the architectural layout does not fulfill the initial agreed-upon requirements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            2. Incubation Tier ($500–$5,000)
          </h2>
          <p>
            We provide a <strong>100% refund guarantee</strong> within 14 days of project delivery, minus any third-party fixed costs incurred (e.g., domain purchases, server deployment costs, or specific external API subscriptions).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            3. Scale Tier ($18,000+)
          </h2>
          <p>
            We operate utilizing a decentralized milestone-based Escrow contract. Because the client explicitly controls the release of funds per milestone upon audit verification, <strong>no refunds are issued</strong> once a milestone payout is triggered.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            4. Emergency Incident Response
          </h2>
          <p>
            Due to the immediate mobilization of senior engineers and the emergency triage nature of operations, <strong>no refunds</strong> are offered for stabilizing incident response services.
          </p>
        </section>
      </div>
    </div>
  );
}
