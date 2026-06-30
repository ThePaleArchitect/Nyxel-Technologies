import React from 'react';
import Link from 'next/link';

export const NetworkMarquee: React.FC = () => {
  const members = [
    'Architect Ω',
    'Distributed Δ',
    'Interface Γ',
    'Cloud Ψ',
    'Data Σ',
    'Mobile Ξ',
  ];

  // Repeat members list to fill the width for a seamless infinite scroll
  const marqueeContent = [...members, ...members, ...members, ...members].join('   ·   ');

  return (
    <section className="py-12 border-t border-b border-[#2A2A2A] bg-black overflow-hidden select-none">
      <Link href="/network" className="block cursor-pointer">
        <div className="relative w-full flex items-center">
          {/* Custom marquee scroll container */}
          <div className="flex w-max animate-marquee whitespace-nowrap text-lg sm:text-2xl font-serif text-[#888888] hover:text-[#00F0FF] transition-colors">
            <span className="mx-4">{marqueeContent}</span>
            <span className="mx-4">{marqueeContent}</span>
          </div>
        </div>
      </Link>
    </section>
  );
};
