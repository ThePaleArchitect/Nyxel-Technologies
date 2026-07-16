import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] py-12 px-6 font-mono text-[#888888] text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] font-bold mb-2">
            <Image 
              src="/logo.png" 
              alt="NXC Logo" 
              width={24} 
              height={24} 
              className="w-6 h-6 object-contain"
            />
            <span>NXC ✦</span>
          </div>
          <p className="text-xs">© 2026 · Anonymous Engineering Collective</p>
        </div>
        <div>
          <div className="font-bold text-[#EAEAEA] mb-2">Pages</div>
          <ul className="space-y-1 text-xs">
            <li><Link href="/charter" className="hover:text-[#EAEAEA] transition-colors">Charter</Link></li>
            <li><Link href="/network" className="hover:text-[#EAEAEA] transition-colors">Network</Link></li>
            <li><Link href="/capabilities" className="hover:text-[#EAEAEA] transition-colors">Capabilities</Link></li>
            <li><Link href="/vault" className="hover:text-[#EAEAEA] transition-colors">Vault</Link></li>
            <li><Link href="/channel" className="hover:text-[#EAEAEA] transition-colors">Channel</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-[#EAEAEA] mb-2">Docs</div>
          <ul className="space-y-1 text-xs">
            <li><Link href="/docs/how-we-bill" className="hover:text-[#EAEAEA] transition-colors">How We Bill</Link></li>
            <li><Link href="/privacy" className="hover:text-[#EAEAEA] transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-[#EAEAEA] transition-colors">Terms</Link></li>
            <li><Link href="/cookies" className="hover:text-[#EAEAEA] transition-colors">Cookie Policy</Link></li>
            <li><Link href="/refund" className="hover:text-[#EAEAEA] transition-colors">Refund Policy</Link></li>
            <li><Link href="/dmca" className="hover:text-[#EAEAEA] transition-colors">DMCA Notice</Link></li>
            <li><Link href="/gdpr" className="hover:text-[#EAEAEA] transition-colors">GDPR Deletion</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-[#EAEAEA] mb-2">Connect</div>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAEAEA] transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAEAEA] transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAEAEA] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-[#2A2A2A] text-center text-xs text-[#666666]">
        <p>Built in stealth. Deployed in scale.</p>
        <p className="mt-1">Nyxel Technologies is not affiliated with OmniVision Technologies or its Nyxel® sensor product.</p>
      </div>
    </footer>
  );
};
