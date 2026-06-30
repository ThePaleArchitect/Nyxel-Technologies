'use client';

import React from 'react';
import { Layout, Cloud, Cpu, BarChart, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function CapabilitiesPage() {
  const pillars = [
    {
      icon: Cpu,
      title: 'Core Engine',
      tech: 'Go, Rust, Node.js, C++',
      desc: 'High-performance microservices, custom protocol buffers, matching engines, and secure API gateways with minimal footprints.',
    },
    {
      icon: Cloud,
      title: 'Mission Control',
      tech: 'Terraform, K8s, Prometheus, AWS/GCP',
      desc: 'Zero-downtime containerized orchestration, infrastructure-as-code deployment, multi-region failover, and comprehensive log telemetry.',
    },
    {
      icon: Layout,
      title: 'Interface',
      tech: 'React, Next.js, TypeScript, Tailwind',
      desc: 'Responsive user interfaces utilizing state-of-the-art animations, type-safe data loading, and pixel-perfect design standards.',
    },
    {
      icon: BarChart,
      title: 'StratOps',
      tech: 'ClickHouse, dbt, Snowflake, Python',
      desc: 'High-volume analytics architecture, data ingestion pipelines, automated reporting pipelines, and structural audits.',
    },
  ];

  const tracks = [
    {
      id: 'personal',
      name: 'Personal',
      desc: 'Solo builders and micro projects',
      price: '$50–$300',
      speed: '3–7 days delivery',
      auth: 'Web2 (Email + OTP)',
      pay: 'Stripe (Credit Card)',
      storage: 'Static Hosting',
    },
    {
      id: 'incubation',
      name: 'Incubation',
      desc: 'Bootstrapped founders and MVPs',
      price: '$500–$5,000',
      speed: '8–12 days delivery',
      auth: 'Web2 (Email + OTP)',
      pay: 'Stripe / USDC',
      storage: 'Static Hosting',
    },
    {
      id: 'scale',
      name: 'Scale',
      desc: 'Funded startups & enterprises',
      price: '$18,000+',
      speed: 'Rolling Cycles',
      auth: 'Web3 (Wallet + SIWE)',
      pay: 'USDC Escrow (Arbitrum/Base)',
      storage: 'Decentralized IPFS',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 font-mono">
      {/* Header */}
      <div className="mb-20">
        <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest block mb-3">
          CAPABILITIES ENGINE
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#EAEAEA] mb-6">
          Pillars & Tracks
        </h1>
        <p className="font-mono text-base text-[#888888] max-w-2xl leading-relaxed">
          Four technical engineering pillars. Three client investment tracks. Two secure authentication layers.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="mb-24">
        <h2 className="font-serif text-3xl font-semibold text-[#EAEAEA] mb-8 border-b border-[#2A2A2A] pb-4">
          Engineering Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => {
            const IconComponent = p.icon;
            return (
              <div key={p.title} className="border border-[#2A2A2A] p-8 space-y-4 hover:border-[#00F0FF]/30 transition-colors bg-[#121212]/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 border border-[#2A2A2A] text-[#00F0FF] bg-black">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#EAEAEA]">{p.title}</h3>
                </div>
                <p className="text-sm text-[#888888] leading-relaxed">{p.desc}</p>
                <div className="text-xs text-[#00F0FF] border-t border-white/5 pt-3">
                  <span className="text-[#666666] uppercase mr-2">Stack:</span> {p.tech}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Tracks Overview (Neo Cards) */}
      <div className="mb-24">
        <h2 className="font-serif text-3xl font-semibold text-[#EAEAEA] mb-8 border-b border-[#2A2A2A] pb-4">
          Investment Tracks
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tracks.map((t) => (
            <Card key={t.id} variant="neo" className="flex flex-col justify-between h-full bg-[#121212]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#EAEAEA]">{t.name}</h3>
                  <Badge variant={t.id === 'scale' ? 'orange' : 'default'}>{t.price}</Badge>
                </div>
                <p className="text-xs text-[#888888] mb-6">{t.desc}</p>
                <ul className="space-y-3 text-sm text-[#EAEAEA] border-t border-[#2A2A2A] pt-6 mb-8">
                  <li className="flex justify-between"><span className="text-[#888888]">Timeline:</span> <span>{t.speed}</span></li>
                  <li className="flex justify-between"><span className="text-[#888888]">Authentication:</span> <span>{t.auth}</span></li>
                  <li className="flex justify-between"><span className="text-[#888888]">Payment Method:</span> <span>{t.pay}</span></li>
                  <li className="flex justify-between"><span className="text-[#888888]">Storage Layer:</span> <span>{t.storage}</span></li>
                </ul>
              </div>
              <Link href="/docs/how-we-bill" className="w-full mt-auto">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  View Track Details <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Auth Model Comparison */}
      <div className="mb-20">
        <h2 className="font-serif text-3xl font-semibold text-[#EAEAEA] mb-8 border-b border-[#2A2A2A] pb-4">
          Authentication Matrix
        </h2>
        <div className="overflow-x-auto border border-[#2A2A2A] bg-black/40">
          <table className="w-full text-left text-sm text-[#888888] min-w-[500px]">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-black text-[#EAEAEA] uppercase text-xs font-bold tracking-wider">
                <th className="p-4 border-r border-[#2A2A2A]">Feature</th>
                <th className="p-4 border-r border-[#2A2A2A] text-[#00F0FF]">Web2 Gate</th>
                <th className="p-4 text-[#FF4500]">Web3 Gate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2A2A2A]">
                <td className="p-4 border-r border-[#2A2A2A] text-[#EAEAEA] font-bold">Login Method</td>
                <td className="p-4 border-r border-[#2A2A2A]">Email + One-Time Passcode</td>
                <td className="p-4">Crypto Wallet + SIWE Signature</td>
              </tr>
              <tr className="border-b border-[#2A2A2A]">
                <td className="p-4 border-r border-[#2A2A2A] text-[#EAEAEA] font-bold">Payment Rails</td>
                <td className="p-4 border-r border-[#2A2A2A]">Stripe / Credit Cards / Invoices</td>
                <td className="p-4">USDC Escrow Contract Payouts</td>
              </tr>
              <tr className="border-b border-[#2A2A2A]">
                <td className="p-4 border-r border-[#2A2A2A] text-[#EAEAEA] font-bold">Confidentiality Layer</td>
                <td className="p-4 border-r border-[#2A2A2A]">Standard session tracking cookies</td>
                <td className="p-4">IPFS blueprint storage, zero-identity check</td>
              </tr>
              <tr>
                <td className="p-4 border-r border-[#2A2A2A] text-[#EAEAEA] font-bold">Primary Target</td>
                <td className="p-4 border-r border-[#2A2A2A]">Solo builders & MVPs ($50-$5k)</td>
                <td className="p-4">Enterprise & VC-backed scale ($18k+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conversion link */}
      <div className="text-center">
        <Link href="/docs/how-we-bill">
          <Button variant="neo">
            <FileText className="w-4 h-4 mr-2" />
            Read Full Billing & Pricing Guide
          </Button>
        </Link>
      </div>
    </div>
  );
}
