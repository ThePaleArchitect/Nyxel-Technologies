'use client';

import React from 'react';
import { ArrowLeft, Calculator, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HowWeBillPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 font-mono text-[#EAEAEA]">
      {/* Back button */}
      <div className="mb-8">
        <Link href="/capabilities" className="inline-flex items-center text-xs text-[#00F0FF] hover:underline gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Capabilities
        </Link>
      </div>

      {/* Header */}
      <div className="mb-16">
        <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest block mb-3">
          BILLING CORE SPECIFICATION
        </span>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#EAEAEA] mb-6">
          How We Bill
        </h1>
        <p className="font-mono text-base text-[#888888] leading-relaxed">
          Flat-rate, fixed-scope engineering pricing calculated based on architecture complexity, interface footprint, and motion complexity.
        </p>
      </div>

      <div className="space-y-12 leading-relaxed text-sm">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#FFD700] uppercase tracking-wider flex items-center gap-2">
            1. The Three Variables
          </h2>
          <p className="text-[#888888]">
            We assess and calculate build complexity utilizing three primary dimensions:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-[#888888]">
            <li>
              <strong className="text-[#EAEAEA]">Stack Complexity:</strong> The depth of backend integrations, APIs, database architectures (relational vs. distributed), and multi-region deployment demands.
            </li>
            <li>
              <strong className="text-[#EAEAEA]">Page Count & Views:</strong> The total unique responsive layout templates, modals, client dashboards, and dynamic views.
            </li>
            <li>
              <strong className="text-[#EAEAEA]">Motion Level:</strong> The complexity of scroll-driven animations, 3D Canvas rendering, GLSL shaders, or responsive micro-interactions.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#FFD700] uppercase tracking-wider">
            2. Personal Track (Web2)
          </h2>
          <p className="text-[#888888]">
            Built for solo founders, portfolios, and landing layouts. Access is validated using a standard Email + OTP code.
          </p>
          <div className="border border-[#2A2A2A] bg-black/40 p-6 space-y-3">
            <div className="flex justify-between font-bold text-[#EAEAEA]">
              <span>Base Single Page Setup</span>
              <span className="text-[#00F0FF]">$50</span>
            </div>
            <p className="text-xs text-[#666666]">1 Core Page, basic animations, standard styling.</p>
            <div className="flex justify-between font-bold text-[#EAEAEA] border-t border-[#2A2A2A] pt-3">
              <span>Multi-Page Portfolio Block</span>
              <span className="text-[#00F0FF]">$150–$300</span>
            </div>
            <p className="text-xs text-[#666666]">Up to 5 pages, custom layout components, and custom forms.</p>
          </div>
          <div className="text-xs text-[#888888]">
            <span className="text-[#FF4500] font-bold">Add-ons:</span> Additional static page: $30/page &middot; Custom forms submission integration: $20.
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#FFD700] uppercase tracking-wider">
            3. Incubation Track (Web2)
          </h2>
          <p className="text-[#888888]">
            Formulated for bootstrapped pre-seed startups, SaaS MVPs, and complex web apps. Requires a corporate domain address.
          </p>
          <div className="border border-[#2A2A2A] bg-black/40 p-6 space-y-4">
            <div className="flex justify-between font-bold text-[#EAEAEA]">
              <span>MVP Launch Pad</span>
              <span className="text-[#00F0FF]">$500–$1,500</span>
            </div>
            <p className="text-xs text-[#666666]">Dynamic dashboard, relational database integration, complete auth flow, and Stripe payments.</p>
            
            <div className="flex justify-between font-bold text-[#EAEAEA] border-t border-[#2A2A2A] pt-4">
              <span>Scale-Ready Product</span>
              <span className="text-[#00F0FF]">$2,000–$5,000</span>
            </div>
            <p className="text-xs text-[#666666]">Complete SaaS application with webhooks, complex state management, subdomains, and analytics.</p>
          </div>

          <div className="bg-[#121212] border border-[#2A2A2A] p-6 space-y-3">
            <strong className="text-xs text-[#FFD700] uppercase block">Example Quote:</strong>
            <p className="text-xs text-[#888888] leading-relaxed">
              Build a custom SaaS listing platform with a customer dashboard (3 layouts), Stripe subscription billing, and an admin panel.
              <br />
              <strong className="text-[#EAEAEA]">Base fee: $2,500</strong> &middot; Duration: 10 days. NDA signed, 100% IP transferred on final payout.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#FFD700] uppercase tracking-wider">
            4. Scale Track (Web3)
          </h2>
          <p className="text-[#888888]">
            Formulated for high-transaction platforms, decentralized protocols, and enterprise infrastructure projects. Operations are managed entirely on-chain.
          </p>
          <div className="border border-[#2A2A2A] bg-black/40 p-6 space-y-4">
            <div className="flex justify-between font-bold text-[#EAEAEA]">
              <span>Protocols & Core Infrastructure</span>
              <span className="text-[#FF4500]">$18,000+</span>
            </div>
            <p className="text-xs text-[#666666]">Custom smart contracts, high-speed matching systems, eBPF logging, multi-region container orchestration, and decentralized storage.</p>
          </div>
          <p className="text-xs text-[#888888]">
            Payments are distributed via a custom milestone-based Escrow smart contract with Arbitrum/Base USDC rails. An external technical arbiter safe is utilized to resolve delivery milestones.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#FFD700] uppercase tracking-wider">
            5. Core Guarantees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#EAEAEA] block mb-1">NDA Pre-discovery</strong>
                <span className="text-[#888888] text-xs">We execute mutual non-disclosures before looking at single files or repositories.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#EAEAEA] block mb-1">100% IP Transferred</strong>
                <span className="text-[#888888] text-xs">All commits, blueprints, assets, and cloud pipelines are entirely yours upon payment completion.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#EAEAEA] block mb-1">2 Round Revisions</strong>
                <span className="text-[#888888] text-xs">Every flat-rate build includes up to 2 complete cycles of revisions within 14 days of launch.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#EAEAEA] block mb-1">Escrow Protections</strong>
                <span className="text-[#888888] text-xs">Web3 contracts are governed by multi-sig arbiter safety locks, protecting clients and builders alike.</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer info */}
      <div className="mt-20 pt-8 border-t border-[#2A2A2A] text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/channel">
          <Button variant="neo">
            <Calculator className="w-4 h-4 mr-2" /> Calculate My Custom Build
          </Button>
        </Link>
        <Link href="/capabilities" className="text-xs text-[#888888] hover:text-[#EAEAEA] transition-colors">
          View Capabilities &rarr;
        </Link>
      </div>
    </div>
  );
}
