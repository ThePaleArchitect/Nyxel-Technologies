'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CHARTER_PRINCIPLES } from '@/lib/constants';

export default function CharterPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 font-mono">
      {/* Hero Header */}
      <div className="mb-20">
        <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4" /> THE COLLECTIVE MANIFESTO
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#EAEAEA] mb-6">
          The Charter
        </h1>
        <p className="font-mono text-base text-[#888888] max-w-2xl leading-relaxed">
          The immutable principles that govern every engagement, mandate our anonymity, and safeguard your intellectual property.
        </p>
      </div>

      {/* 6 Principles Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {CHARTER_PRINCIPLES.map((principle) => (
          <motion.div key={principle.num} variants={itemVariants}>
            <Card 
              className="h-full border-l-4 border-l-[#FFD700] hover:border-[#FFD700] bg-[#121212] transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="font-serif text-3xl font-bold text-[#FFD700] select-none leading-none pt-1">
                  {principle.num}
                </span>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#EAEAEA] tracking-wide">
                    {principle.title}
                  </h3>
                  <p className="font-mono text-sm text-[#888888] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* EAS Attestation Box */}
      <div className="border border-[#2A2A2A] bg-black/40 p-8 text-center max-w-3xl mx-auto space-y-6">
        <p className="text-sm text-[#888888]">
          These principles are immutably attested on-chain via the Ethereum Attestation Service (EAS).
        </p>
        <div>
          <a 
            href="https://eas.eth.limo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#00F0FF] hover:text-[#00F0FF]/80 text-sm font-bold tracking-wide uppercase transition-colors hover:underline"
          >
            Verify EAS Attestation Link &rarr;
          </a>
        </div>
      </div>

      {/* Closing Quote */}
      <div className="mt-24 text-center">
        <blockquote className="font-serif italic font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-[#FFD700] tracking-[-0.01em] max-w-4xl mx-auto mb-6">
          "If these principles resonate, your infrastructure is ready for us."
        </blockquote>
        <p className="text-xs text-[#888888] uppercase tracking-widest font-mono">
          Nyxel Technologies Collective &middot; Deployed in Scale
        </p>
      </div>
    </div>
  );
}
