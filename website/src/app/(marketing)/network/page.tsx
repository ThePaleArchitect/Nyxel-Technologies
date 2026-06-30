'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Shield } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useState, useEffect } from 'react';
import { ROSTER } from '@/lib/constants';

export default function NetworkPage() {
  const [dynamicRoster, setDynamicRoster] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoster() {
      try {
        const res = await fetch('/api/admin/roster');
        const data = await res.json();
        if (data.success) {
          setDynamicRoster(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic roster:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRoster();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 font-mono">
      {/* Header */}
      <div className="mb-20">
        <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4" /> DISTRIBUTED CORES
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#EAEAEA] mb-6">
          The Network
        </h1>
        <p className="font-mono text-base text-[#888888] max-w-2xl leading-relaxed">
          A global distributed collective of senior engineers, systems architects, and product designers operating under aliases.
        </p>
      </div>

      {/* Roster Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#888888] animate-pulse">
          Retrieving network nodes...
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {dynamicRoster.map((member) => (
          <motion.div key={member.handle} variants={itemVariants}>
            <Card 
              variant="glass" 
              className="h-full border border-white/10 flex flex-col justify-between hover:border-[#00F0FF]/40 transition-colors p-6 rounded-2xl bg-white/[0.02]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-lg font-bold text-[#EAEAEA] tracking-wide">
                    {member.handle}
                  </h3>
                  <Badge variant="cyan" className="text-[10px]">
                    {member.timezone}
                  </Badge>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-[10px] text-[#888888] uppercase block tracking-wider">Role</span>
                    <span className="text-sm font-semibold text-[#EAEAEA]">{member.role}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888888] uppercase block tracking-wider">Experience</span>
                    <span className="text-sm text-[#EAEAEA]">{member.experience}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[#888888] uppercase block tracking-wider mb-2">Core Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {member.stack.map((s) => (
                    <span 
                      key={s} 
                      className="text-[11px] bg-[#121212] border border-[#2A2A2A] text-[#EAEAEA] px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
          ))}
        </motion.div>
      )}

      {/* Assembly Logic & Trust Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="border border-[#2A2A2A] bg-[#121212]/30 p-8 space-y-4">
          <h3 className="font-serif text-xl font-semibold text-[#FFD700]">
            Dynamic Assembly Logic
          </h3>
          <p className="text-sm text-[#888888] leading-relaxed">
            No single engineer has access to your entire repository or cloud infrastructure. We isolate services and allocate custom squads (frontend, backend, SRE) dynamically per sprint, enforcing micro-service security and mitigating insider threat profiles.
          </p>
        </div>

        <div className="border border-[#2A2A2A] bg-[#121212]/30 p-8 space-y-4">
          <h3 className="font-serif text-xl font-semibold text-[#FFD700]">
            Operational Trust Benchmarks
          </h3>
          <p className="text-sm text-[#888888] leading-relaxed flex gap-3 items-start">
            <Shield className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
            <span>
              Every member has successfully completed a rigorous 5-stage architectural review and contributed to a minimum of 3 production-grade open-source codebases. All squads are vetted.
            </span>
          </p>
        </div>
      </div>

      {/* CTA Conversion */}
      <div className="text-center py-12 border-t border-[#2A2A2A]">
        <h3 className="font-serif text-2xl font-bold mb-6 text-[#EAEAEA]">
          Ready to deploy a custom engineering squad?
        </h3>
        <Link href="/channel">
          <Button variant="neo">
            <Mail className="w-4 h-4 mr-2" />
            Open Secure Channel
          </Button>
        </Link>
      </div>
    </div>
  );
}
