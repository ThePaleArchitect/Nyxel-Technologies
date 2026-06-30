'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Lock, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { TerminalCursor } from '../shared/TerminalCursor';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid configuration
    const spacing = 40;
    const dots: { x: number; y: number; baseSize: number }[] = [];

    // Initialize dots
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        dots.push({
          x: c * spacing,
          y: r * spacing,
          baseSize: 1,
        });
      }
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, width, height);

      time += 0.015;

      dots.forEach((dot) => {
        // Wave offset
        const waveX = Math.sin(dot.y * 0.01 + time) * 3;
        const waveY = Math.cos(dot.x * 0.01 + time) * 3;
        const currentX = dot.x + waveX;
        const currentY = dot.y + waveY;

        // Distance to mouse
        const dx = mouse.x - currentX;
        const dy = mouse.y - currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let size = dot.baseSize;
        let color = 'rgba(136, 136, 136, 0.15)'; // text-secondary with opacity

        if (dist < 120) {
          const factor = (120 - dist) / 120;
          size = dot.baseSize + factor * 2.5;
          color = `rgba(0, 240, 255, ${0.15 + factor * 0.55})`; // cyan glow
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(currentX, currentY, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden scanline bg-[#0A0A0A]">
      {/* Background canvas dot grid */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 py-20">
        {/* Trust Badges */}
        <div className="inline-flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-widest font-mono text-[#888888] bg-[#121212] border border-[#2A2A2A] px-4 py-2 select-none">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#FFD700]" /> 48hr Architecture Audit</span>
          <span className="text-[#2A2A2A] font-bold">&middot;</span>
          <span>100% IP Indemnified</span>
          <span className="text-[#2A2A2A] font-bold">&middot;</span>
          <span>99.99% Uptime Guarantee</span>
        </div>

        {/* H1 Title */}
        <h1 className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#EAEAEA]">
          Build in stealth.
          <br />
          <span className="text-[#FF4500]">Deploy at scale.</span>
        </h1>

        {/* Sub-headline */}
        <p className="font-mono text-sm sm:text-base text-[#888888] max-w-2xl mx-auto leading-relaxed">
          We are the faceless engineering collective that designs, builds, and secures the architecture for funded startups, enterprises, and solo builders—without ever leaving a public trace. No bylines. No blog posts. No noise.
          <TerminalCursor />
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Link href="/vault" className="w-full sm:w-auto">
            <Button variant="neo" className="w-full sm:w-auto cursor-pointer">
              <Lock className="w-4 h-4 mr-2" />
              Request Vault Access
            </Button>
          </Link>
          <Link href="/capabilities" className="w-full sm:w-auto">
            <Button variant="ghost" className="w-full sm:w-auto cursor-pointer">
              View Capabilities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
