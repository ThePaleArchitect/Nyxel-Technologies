import React from 'react';
import { Cpu, Cloud, Layout, BarChart, ShieldAlert } from 'lucide-react';
import { Card } from '../ui/Card';

export const Pillars: React.FC = () => {
  const pillarsList = [
    {
      icon: Cpu,
      title: 'Core Engine',
      tech: 'Go / Rust / Node.js',
      desc: 'High-speed matching systems, distributed state caches, event-streaming queues, and microservices.',
    },
    {
      icon: Cloud,
      title: 'Mission Control',
      tech: 'K8s / Terraform / AWS / GCP',
      desc: 'Multi-region failover automation, auto-scaling deployment systems, and zero-overhead observability.',
    },
    {
      icon: Layout,
      title: 'Interface',
      tech: 'React / Next.js / Tailwind',
      desc: 'Ultra-fluid user dashboards, micro-interactions, complex state sync, and web client interfaces.',
    },
    {
      icon: BarChart,
      title: 'StratOps',
      tech: 'ClickHouse / Snowflake / dbt',
      desc: 'Data ingestion models, security audits, infrastructure reviews, and high-volume data streams.',
    },
  ];

  return (
    <section className="py-24 border-t border-[#2A2A2A] bg-black/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest block mb-2">
            OPERATIONAL PILLARS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#EAEAEA]">
            The Pillars of NXC
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillarsList.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <Card 
                key={pillar.title} 
                variant="standard" 
                className="hover:border-[#FF4500]/50 transition-colors p-8 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1A1A1A] border border-[#2A2A2A] text-[#FF4500]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#EAEAEA]">
                      {pillar.title}
                    </h3>
                    <span className="text-xs text-[#888888] font-semibold">{pillar.tech}</span>
                  </div>
                </div>
                <p className="font-mono text-sm text-[#888888] leading-relaxed pt-2">
                  {pillar.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
