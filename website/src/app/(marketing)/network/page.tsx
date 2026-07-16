'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Shield, X } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useState, useEffect } from 'react';

export default function NetworkPage() {
  const [dynamicRoster, setDynamicRoster] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

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
      transition: { duration: 0.6, ease: 'easeOut' as const }
    },
  };

  // Dossier Mock Data Compiler (Requirement 5)
  const getDossier = (handle: string, stack: string[]) => {
    const h = handle.toLowerCase();
    if (h.includes('omega') || h.includes('architect')) {
      return {
        projects: [
          "Project Aether: Decoupled High-Throughput Matching Engine",
          "LiquidBridge: Multi-Chain Liquidity Routing Hub"
        ],
        specializations: "Kernel Bypass (DPDK), Consensus Protocols (Raft/Paxos), Distributed Key-Value Engines",
        log: `commit b4a28f115a3a71b269ec398a6a8cd28148b8989f
Author: Architect Ω <omega@nxc.internal>
Date:   Mon May 18 04:12:33 2026 -0500

    [Core] Optimize ring-buffer concurrency; reduce atomic contention in pipeline.
    
    - Implement lock-free multi-producer single-consumer queue.
    - Align thread local storage structures to L1 cache lines (64 bytes padding).
    - Benchmark: Latency dropped from 4.2us to 2.1us at 10M events/sec.`
      };
    } else if (h.includes('delta') || h.includes('distributed')) {
      return {
        projects: [
          "Kafka Shard Master: Event Hub Scaling Router",
          "FlowDB: Edge Caching Event Sourcing Middleware"
        ],
        specializations: "Message Queue Broker Internals, Actor-Model Frameworks (Akka/ProtoActor), Low-Latency Caching",
        log: `commit f72e2938a7c293cf020f92b7400b6d9238cf78bc
Author: Distributed Δ <delta@nxc.internal>
Date:   Tue Jun 2 11:24:55 2026 +0100

    [Broker] Refactor partition log replication state machine.
    
    - Fix edge case in partition leader re-election ack quorum logic.
    - Defer network socket write flush calls to utilize batch buffers (16KB).
    - Memory allocation down 14% by reusing buffer slices in pool.`
      };
    } else if (h.includes('gamma') || h.includes('interface')) {
      return {
        projects: [
          "MatrixUI: Decentralized Modular Control Dashboard",
          "WebDraw: GPU-accelerated Canvas Rendering Library"
        ],
        specializations: "Declarative UI Layout Optimizations, WebGL / WebAssembly Interop Layers, Custom State-Machines",
        log: `commit d92a188f615e12f0a1c25a1b3c4f5e6d7e8f9a0b
Author: Interface Γ <gamma@nxc.internal>
Date:   Wed Jun 10 14:02:18 2026 -0800

    [Render] Implement virtualized node tree layout reconciliation in WebAssembly.
    
    - Write direct layout tree computations in Rust; compile to WASM target.
    - Reduce DOM paint triggers via batch scheduler animation frames.
    - FPS stabilized at locked 60Hz under 20,000 interactive DOM nodes.`
      };
    } else if (h.includes('psi') || h.includes('cloud')) {
      return {
        projects: [
          "MultiCloud Orchestrator: Sovereign K8s Core",
          "Aegis Sentinel: Automated Kubernetes eBPF Firewall"
        ],
        specializations: "Infrastructure as Code (Declarative IaC), eBPF Kernel Hooks, Zero-Trust Access Meshes",
        log: `commit e83c27183e92a83cf82b7c6c5a4d3e2f1a0b9c8d
Author: Cloud Ψ <psi@nxc.internal>
Date:   Thu Jun 18 19:42:01 2026 +0300

    [Infra] Deploy eBPF TC filter rules across Kubernetes DaemonSets.
    
    - Intercept ingress packets at TC layer to bypass Netfilter stack.
    - Implement secure namespace-to-namespace routing policy in kernel space.
    - Block invalid peer signatures without CPU penalty.`
      };
    } else if (h.includes('sigma') || h.includes('data')) {
      return {
        projects: [
          "DataStream: Real-time ML Pipeline Hub",
          "ChronosAnalytics: 100TB Snowflake-based Analytics Engine"
        ],
        specializations: "Columnar OLAP Engines, Vector Embeddings Pipelines, Big Data Stream Window Aggregations",
        log: `commit c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2
Author: Data Σ <sigma@nxc.internal>
Date:   Fri Jun 26 09:12:44 2026 +0530

    [Pipeline] Optimize vectorized window aggregation queries on OLAP shard.
    
    - Write custom parquet push-down filter routines.
    - Implement SIMD-accelerated array sorting in query compilation step.
    - Execution time for 1B records window aggregates reduced by 4x.`
      };
    } else if (h.includes('xi') || h.includes('mobile')) {
      return {
        projects: [
          "CoreWallet: Multi-Asset On-Chain Mobile Client",
          "P2PSecureChat: Native iOS/Android Encrypted Messenger"
        ],
        specializations: "Native Thread Isolation, Encrypted SQLite (SQLCipher), Bluetooth Mesh Networking",
        log: `commit m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0
Author: Mobile Ξ <xi@nxc.internal>
Date:   Sat Jul 4 17:35:12 2026 +1000

    [Client] Implement local key derivation iteration optimization in Enclave.
    
    - Move sensitive encryption operations to hardware secure enclave.
    - Cache local DB write transactions through cipher block chaining.
    - Interface battery overhead reduced by 22% during heavy chat encryption syncing.`
      };
    } else {
      const cleanHandle = handle.replace(/[^a-zA-Z0-9]/g, '');
      return {
        projects: [
          `Project ${cleanHandle}: High-Performance Architecture Migration`,
          `SystemSecure: Enterprise Authentication Infrastructure`
        ],
        specializations: `Systems Programming, ${stack.join(', ')}, Custom Cloud Integrations`,
        log: `commit ${Math.random().toString(16).substring(2, 10)}ae83c27183e92a83cf82
Author: ${handle} <${cleanHandle.toLowerCase()}@nxc.internal>
Date:   Tue Jul 7 14:24:00 2026 +0100

    [Allocation] Optimize thread pool dispatch for ${stack.slice(0, 2).join(' and ')} services.
    
    - Implement lock-free dispatch routines.
    - Resolve scheduling overhead; latency reduced by 18%.`
      };
    }
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
                className="h-full border border-white/10 flex flex-col justify-between hover:border-[#00F0FF]/60 cursor-pointer hover:-translate-y-1 hover:border-[#00F0FF] transition-all duration-300 p-6 rounded-2xl bg-white/[0.02]"
                onClick={() => setSelectedMember(member)}
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
                    {member.stack.map((s: string) => (
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

      {/* Roster Overlay Modal (Requirement 5) */}
      {selectedMember && (() => {
        const dossier = getDossier(selectedMember.handle, selectedMember.stack);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-[12px] transition-opacity"
              onClick={() => setSelectedMember(null)}
            />
            
            {/* Modal Container (Glassmorphic) */}
            <div className="relative w-full max-w-3xl bg-black/85 backdrop-blur-[12px] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden z-10 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <h3 className="font-serif text-xl font-bold text-[#EAEAEA] tracking-wide">
                  DOSSIER: {selectedMember.handle}
                </h3>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="p-1 text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors"
                  aria-label="Close dossier"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto flex-1 font-mono text-[#EAEAEA] space-y-6">
                <div>
                  <span className="text-[10px] text-[#888888] uppercase block tracking-wider mb-1">Assigned Role</span>
                  <span className="text-base font-semibold text-[#00F0FF]">{selectedMember.role} ({selectedMember.experience})</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#888888] uppercase block tracking-wider mb-1">Timezone Assignment</span>
                  <span className="text-sm text-[#FFD700]">{selectedMember.timezone}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#888888] uppercase block tracking-wider mb-2">Protocol & Layer Specializations</span>
                  <p className="text-sm text-[#EAEAEA] leading-relaxed bg-[#121212]/50 p-4 border border-[#2A2A2A] rounded-none">
                    {dossier.specializations}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-[#888888] uppercase block tracking-wider mb-2">Historical Core Projects</span>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[#888888]">
                    {dossier.projects.map((proj, idx) => (
                      <li key={idx}>
                        <strong className="text-[#EAEAEA]">{proj.split(':')[0]}:</strong>
                        {proj.split(':')[1]}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] text-[#888888] uppercase block tracking-wider mb-2">Engineering Contribution Log</span>
                  <pre className="text-xs bg-[#050505] text-[#00F0FF]/90 p-4 border border-[#2A2A2A] overflow-x-auto rounded-none select-text">
                    {dossier.log}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

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
