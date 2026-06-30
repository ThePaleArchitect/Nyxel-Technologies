'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const VaultTeaser: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 400);
    let height = (canvas.height = 400);

    // 3D Sphere Points
    const numPoints = 60;
    const points: { x: number; y: number; z: number }[] = [];
    const radius = 130;

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;

      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
      });
    }

    let angleX = 0.003;
    let angleY = 0.005;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Center coordinates
      const cx = width / 2;
      const cy = height / 2;

      // Draw background circle
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotate points
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      points.forEach((p) => {
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;
      });

      // Project and draw connections (lines between close points)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dz = points[i].z - points[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 75) {
            // Project
            const x1_proj = points[i].x + cx;
            const y1_proj = points[i].y + cy;
            const x2_proj = points[j].x + cx;
            const y2_proj = points[j].y + cy;

            ctx.beginPath();
            ctx.moveTo(x1_proj, y1_proj);
            ctx.lineTo(x2_proj, y2_proj);
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      points.forEach((p) => {
        const x_proj = p.x + cx;
        const y_proj = p.y + cy;

        // Node size depending on depth z
        const size = ((p.z + radius) / (radius * 2)) * 3 + 1;
        const opacity = ((p.z + radius) / (radius * 2)) * 0.7 + 0.1;

        // Draw dot
        ctx.fillStyle = `rgba(0, 240, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x_proj, y_proj, size, 0, Math.PI * 2);
        ctx.fill();

        // Extra outer glow for some select nodes
        if (p.z > radius * 0.7) {
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x_proj, y_proj, size + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="py-24 border-t border-[#2A2A2A] bg-black">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Text details */}
        <div className="space-y-6">
          <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest font-mono block">
            CLASSIFIED DEPLOYMENTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#EAEAEA] leading-tight">
            The Vault
          </h2>
          <p className="font-mono text-sm text-[#888888] leading-relaxed">
            Our production architectures, network routing blueprints, and custom deployments are locked behind secure authorization walls. Access is restricted to active client accounts.
          </p>

          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-4 border border-[#2A2A2A] bg-[#121212]/50 p-4 font-mono select-none">
            <div>
              <span className="text-[10px] text-[#666666] block uppercase tracking-wider">Audit Registry</span>
              <strong className="text-sm text-[#00F0FF]">5 Deployments</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#666666] block uppercase tracking-wider">Uptime SLA</span>
              <strong className="text-sm text-[#00F0FF]">100% Record</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#666666] block uppercase tracking-wider">Daily Traffic</span>
              <strong className="text-sm text-[#00F0FF]">42M Requests</strong>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/vault">
              <Button variant="neo">
                Enter the Vault
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 3D Wireframe Globe representation */}
        <div className="flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[#00F0FF]/5 rounded-full filter blur-[80px] pointer-events-none" />
          <canvas ref={canvasRef} className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] z-10" />
        </div>

      </div>
    </section>
  );
};
