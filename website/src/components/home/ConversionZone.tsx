import React from 'react';
import Link from 'next/link';
import { Lock, Shield, Mail, Calculator } from 'lucide-react';
import { Button } from '../ui/Button';

export const ConversionZone: React.FC = () => {
  return (
    <section className="py-24 border-t border-[#2A2A2A] bg-[#121212]/30 text-center">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#EAEAEA]">
          Ready to move in silence?
        </h2>
        <p className="font-mono text-sm text-[#888888] max-w-xl mx-auto leading-relaxed">
          Submit your requirements via our encrypted forms or connect your wallet to start on-chain development.
        </p>

        {/* Buttons / CTAs */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 max-w-2xl mx-auto">
          <Link href="/vault">
            <Button variant="neo" size="sm" className="w-full sm:w-auto">
              <Lock className="w-4 h-4 mr-2" /> Request Vault Access
            </Button>
          </Link>
          <Link href="/charter">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              <Shield className="w-4 h-4 mr-2" /> Read The Charter
            </Button>
          </Link>
          <Link href="/channel">
            <Button variant="glass" size="sm" className="w-full sm:w-auto text-[#00F0FF] border-[#00F0FF]/30 hover:border-[#00F0FF]/80">
              <Mail className="w-4 h-4 mr-2" /> Secure Channel
            </Button>
          </Link>
          <Link href="/docs/how-we-bill">
            <Button variant="glass" size="sm" className="w-full sm:w-auto text-[#FFD700] border-[#FFD700]/30 hover:border-[#FFD700]/80">
              <Calculator className="w-4 h-4 mr-2" /> Calculate My Build
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
