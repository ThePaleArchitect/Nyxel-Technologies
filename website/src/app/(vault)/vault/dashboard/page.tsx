'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, X, ArrowRight, Mail, Cpu, Database, Network } from 'lucide-react';
import { useVaultSession } from '@/hooks/useVaultSession';
import { Project } from '@/lib/projects';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export default function VaultDashboardPage() {
  const { session, logout } = useVaultSession();
  const [timeLeft, setTimeLeft] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch dynamic projects from Redis-backed API
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/admin/projects');
        const data = await res.json();
        if (data.success) {
          setDynamicProjects(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  // 24hr countdown timer
  useEffect(() => {
    if (!session?.expiresAt) return;

    const timer = setInterval(() => {
      const distance = session.expiresAt - Date.now();
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft('EXPIRED');
        logout();
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [session, logout]);

  const handleOpenBlueprint = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseBlueprint = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-mono text-[#EAEAEA] flex flex-col">
      {/* Session Status Bar (Glass) */}
      <div className="sticky top-0 z-40 bg-black/85 backdrop-blur-[12px] border-b border-white/10 px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
            <strong className="text-[#00F0FF] uppercase tracking-wider text-xs sm:text-sm">
              Vault Unlocked
            </strong>
            <span className="text-[#2A2A2A] font-bold">|</span>
            <span className="text-[10px] sm:text-xs text-[#888888]">
              Identity: {session?.email || session?.address || 'Anonymous'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {session?.role === 'admin' && (
              <Link 
                href="/vault/admin" 
                className="text-xs text-[#FF4500] hover:underline font-bold uppercase tracking-wider mr-2"
              >
                [Admin Console]
              </Link>
            )}
            <div className="flex items-center gap-2 text-xs text-[#FFD700]">
              <Clock className="w-4 h-4" />
              <span>{timeLeft || '24:00:00'} remaining</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#FF1A1A] transition-colors uppercase tracking-wider cursor-pointer"
            >
              <X className="w-4 h-4" /> Destroy Session
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-16 space-y-12">
        {/* Intro */}
        <div>
          <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest block mb-2">
            ARCHITECTURAL SCHEMATICS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#EAEAEA]">
            Anonymized Blueprints
          </h1>
          <p className="text-sm text-[#888888] max-w-2xl mt-2 leading-relaxed">
            Select an engineering case study to inspect the verified technical blueprints. Codenames are used to maintain customer stealth.
          </p>
        </div>

        {/* 5 Project Cards (Glass + Neo hybrid) */}
        {loadingProjects ? (
          <div className="text-center py-20 text-[#888888] animate-pulse">
            Loading blueprints...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dynamicProjects.map((project) => (
              <Card
                key={project.id}
                variant="standard"
                className="border border-[#2A2A2A] hover:border-[#00F0FF]/30 transition-all duration-300 p-8 flex flex-col justify-between"
              >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-[#2A2A2A]/40 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#EAEAEA] tracking-wide">
                      {project.codename}
                    </h2>
                    <span className="text-[10px] text-[#888888] block uppercase mt-1">
                      {project.industry}
                    </span>
                  </div>
                  <Badge variant="cyan">{project.id}</Badge>
                </div>

                {/* Metrics / Scale */}
                <div className="text-xs bg-black/40 border border-[#2A2A2A]/40 p-3">
                  <span className="text-[#666666] uppercase block text-[9px] mb-1">Production Scale</span>
                  <span className="text-[#00F0FF]">{project.scale}</span>
                </div>

                {/* Problem, Solution, Result Monospace block */}
                <div className="space-y-3 text-xs leading-relaxed text-[#888888]">
                  <p>
                    <strong className="text-[#EAEAEA] uppercase block mb-0.5">Problem:</strong>
                    {project.problem}
                  </p>
                  <p>
                    <strong className="text-[#EAEAEA] uppercase block mb-0.5">Solution:</strong>
                    {project.solution}
                  </p>
                  <p>
                    <strong className="text-[#EAEAEA] uppercase block mb-0.5">Result:</strong>
                    <span className="text-[#FFD700]">{project.result}</span>
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 border-t border-[#2A2A2A]/40 mt-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenBlueprint(project)}
                  className="w-full justify-between cursor-pointer"
                >
                  <span>View Architecture Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
            ))}
          </div>
        )}

        {/* Conversion Footer */}
        <div className="border-t border-[#2A2A2A] pt-12 text-center space-y-6">
          <h3 className="font-serif text-2xl font-semibold text-[#EAEAEA]">
            Trust the architecture?
          </h3>
          <p className="text-xs text-[#888888] max-w-md mx-auto leading-relaxed">
            Let's discuss how we can build, scale, and secure your systems under full mutual NDA.
          </p>
          <div className="pt-2">
            <Link href="/channel">
              <Button variant="neo">
                <Mail className="w-4 h-4 mr-2" /> Open Secure Channel
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Blueprint SVG Modal (Glass) */}
      <Modal
        isOpen={selectedProject !== null}
        onClose={handleCloseBlueprint}
        title={selectedProject ? `Blueprint: ${selectedProject.codename} Architecture` : ''}
      >
        <div className="space-y-6 relative min-h-[400px] flex flex-col justify-between">
          
          {/* Anonymized Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-5">
            <div className="font-serif text-3xl sm:text-5xl font-bold tracking-[5px] text-[#FF1A1A] rotate-12 uppercase text-center border-4 border-[#FF1A1A] p-6">
              ANONYMIZED FOR CONFIDENTIALITY
            </div>
          </div>

          {/* Interactive SVG Diagram representing systems layout */}
          <div className="border border-[#2A2A2A] bg-black/80 p-8 flex items-center justify-center relative overflow-hidden z-10 flex-1 min-h-[300px]">
            <svg 
              className="w-full max-w-lg h-[260px] text-[#888888]" 
              viewBox="0 0 500 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Elements & Connections */}
              <g className="animate-pulse" style={{ animationDuration: '4s' }}>
                {/* Node 1: Client Gateway */}
                <rect x="30" y="110" width="80" height="50" rx="4" fill="#121212" stroke="#00F0FF" strokeWidth="1.5" />
                <text x="70" y="140" fill="#00F0FF" fontSize="10" fontFamily="monospace" textAnchor="middle">Client Gate</text>

                {/* Node 2: Core Load Balancer */}
                <rect x="170" y="110" width="80" height="50" rx="4" fill="#121212" stroke="#FFD700" strokeWidth="1.5" />
                <text x="210" y="140" fill="#FFD700" fontSize="10" fontFamily="monospace" textAnchor="middle">LB Cluster</text>

                {/* Node 3: Backend Services (Rust/Go) */}
                <rect x="310" y="50" width="90" height="50" rx="4" fill="#121212" stroke="#FF4500" strokeWidth="1.5" />
                <text x="355" y="80" fill="#FF4500" fontSize="9" fontFamily="monospace" textAnchor="middle">Rust Core Node</text>

                {/* Node 4: DB Layer */}
                <rect x="310" y="170" width="90" height="50" rx="4" fill="#121212" stroke="#2A2A2A" strokeWidth="1.5" />
                <text x="355" y="200" fill="#EAEAEA" fontSize="9" fontFamily="monospace" textAnchor="middle">DB Cluster</text>
              </g>

              {/* Connections (Lines & Arrows) */}
              <path d="M 110 135 L 170 135" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 250 135 L 280 135 L 280 75 L 310 75" stroke="#888888" strokeWidth="1" />
              <path d="M 250 135 L 280 135 L 280 195 L 310 195" stroke="#888888" strokeWidth="1" />
              <path d="M 355 100 L 355 170" stroke="#FF4500" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Details Table */}
          <div className="z-10 text-xs space-y-2 border-t border-[#2A2A2A] pt-4">
            <div className="grid grid-cols-3 text-[#888888]">
              <span>STACK</span>
              <span>SCALE TARGET</span>
              <span>DEPLOYMENT CID</span>
            </div>
            <div className="grid grid-cols-3 font-semibold text-[#EAEAEA]">
              <span>{selectedProject?.stack.join(', ')}</span>
              <span>{selectedProject?.scale}</span>
              <span className="text-[#00F0FF] break-all">{selectedProject?.ipfsCid}</span>
            </div>
          </div>

          {/* Close button */}
          <div className="text-center z-10 pt-4">
            <Button
              variant="neo"
              onClick={handleCloseBlueprint}
              className="px-8 cursor-pointer"
            >
              <X className="w-4 h-4 mr-2" /> Close Blueprint
            </Button>
          </div>

        </div>
      </Modal>
    </div>
  );
}
