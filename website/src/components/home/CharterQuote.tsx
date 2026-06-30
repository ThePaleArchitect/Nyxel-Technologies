import React from 'react';
import Link from 'next/link';

export const CharterQuote: React.FC = () => {
  return (
    <section className="py-24 border-t border-[#2A2A2A] bg-black/40 text-center">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <blockquote className="font-serif italic font-bold text-[clamp(1.8rem,4vw,3.2rem)] text-[#FFD700] tracking-[-0.01em] leading-tight">
          "Your IP is yours—exclusively. We retain nothing. We fork nothing. We sign your NDA before we even see your repository."
        </blockquote>
        <div className="pt-2">
          <Link 
            href="/charter" 
            className="font-mono text-xs uppercase tracking-widest text-[#888888] hover:text-[#00F0FF] transition-colors"
          >
            &mdash; From The Charter, Principle I &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
