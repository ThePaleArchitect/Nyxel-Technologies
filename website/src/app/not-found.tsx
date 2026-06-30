'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 font-mono text-[#EAEAEA]">
      <div className="w-full max-w-xl border border-[#2A2A2A] bg-[#121212] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#2A2A2A] bg-black/40">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-xs text-[#888888]">session: terminal_404</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-6 text-sm">
          <div className="space-y-1">
            <div className="text-[#888888]">$ whoami</div>
            <div className="text-[#EAEAEA]">&gt; Unknown</div>
          </div>

          <div className="space-y-1">
            <div className="text-[#888888]">$ pwd</div>
            <div className="text-[#EAEAEA]">&gt; /nyxeltechnologies/404</div>
          </div>

          <div className="space-y-1">
            <div className="text-[#888888]">$ cat page_not_found.md</div>
            <div className="text-[#FF1A1A] leading-relaxed">
              &gt; 404 — Classified information not found.
              <br />
              &gt; Either the page was redacted, or you took a wrong turn.
            </div>
          </div>

          <div className="space-y-2 border-t border-[#2A2A2A]/40 pt-4">
            <div className="text-[#888888]">$ exit</div>
            <div className="pt-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Return to Headquarters <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
