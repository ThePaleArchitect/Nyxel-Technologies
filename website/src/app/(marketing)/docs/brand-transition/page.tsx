import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function BrandTransitionPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 font-mono text-[#EAEAEA]">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="pl-0 text-[#888888] hover:text-[#00F0FF]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.01em] text-[#00F0FF] mb-8 leading-tight">
        Brand Evolution & Domain Notice
      </h1>
      <p className="text-sm text-[#888888] mb-12">PUBLISHED: 2026-07-16</p>

      <div className="space-y-8 leading-relaxed">
        <section className="border-l-4 border-[#FFD700] pl-6 py-2">
          <blockquote className="font-serif italic font-bold text-lg text-[#FFD700]">
            "Our name is new. Our commitment to absolute security, anonymity, and zero-knowledge infrastructure remains unchanged."
          </blockquote>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FF4500] mb-4">
            1. The Transition to Null Execution Collective
          </h2>
          <p>
            Effective immediately, the engineering studio formerly known as <strong>Nyxel Technologies Collective</strong> has rebranded to <strong>Null Execution Collective (NXC)</strong>. 
          </p>
          <p className="mt-4">
            This name change is a proactive measure to resolve potential naming conflicts with OmniVision Technologies' *Nyxel®* sensor trademark, ensuring our operations remain independent and legally unencumbered.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FF4500] mb-4">
            2. Meaning of "Null Execution"
          </h2>
          <p>
            The name <strong>Null Execution Collective</strong> reflects our technical principles and stealth philosophy:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Stateless & Ephemeral:</strong> "Null Execution" refers to running code cleanly, leaving zero residual logs, side-effects, or public tracking markers.
            </li>
            <li>
              <strong>Anonymous Architecture:</strong> We design systems that protect founder identities, customer telemetry, and client database logs.
            </li>
            <li>
              <strong>Hacker-First Mentality:</strong> A nod to clean code, execution sandboxes, and cryptographic integrity.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FF4500] mb-4">
            3. Active Domain & Email Routing Policy
          </h2>
          <p>
            Although our public identity has evolved, <strong>our active web domain remains <code className="text-[#00F0FF]">nyxeltechnologies.com</code></strong> for the remainder of our 1-year registration cycle.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>No Downtime:</strong> All services, API verification gateways, and client dashboards will continue to run securely at <code className="text-[#EAEAEA]">nyxeltechnologies.com</code>.
            </li>
            <li>
              <strong>Secure Communications:</strong> Email relays and secure channel endpoints (e.g., <code className="text-[#EAEAEA]">relay@nyxeltechnologies.com</code>, <code className="text-[#EAEAEA]">dmca@nyxeltechnologies.com</code>, <code className="text-[#EAEAEA]">gdpr@nyxeltechnologies.com</code>) remain fully active. Your inquiries are PGP-encrypted and securely routed without delay.
            </li>
            <li>
              <strong>Future Migrations:</strong> Once the current registration cycle concludes, the web assets will migrate to our new home domain. Clear alerts and directions will be posted in advance of the transition.
            </li>
          </ul>
        </section>

        <section className="pt-6 border-t border-[#2A2A2A]">
          <p className="text-xs text-[#888888]">
            For further technical questions or to discuss classified incubation engagements, open a PGP channel or contact our on-duty architect via the <Link href="/channel" className="text-[#00F0FF] hover:underline">Secure Channel</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
