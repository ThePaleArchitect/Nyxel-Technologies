'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Lock, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Charter', href: '/charter' },
    { name: 'Network', href: '/network' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Vault', href: '/vault' },
    { name: 'Channel', href: '/channel' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-[16px] border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.8)] px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="NXC Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8 object-contain"
            />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex flex-initial justify-center gap-6 font-mono text-sm items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors ${isActive ? 'text-[#00F0FF]' : 'text-[#888888] hover:text-[#EAEAEA]'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA & Mobile Trigger */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden md:block">
            <Link href="/vault">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <Lock className="w-4 h-4 mr-2" />
                Vault Access
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button 
            className="md:hidden text-[#888888] hover:text-[#EAEAEA] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-0 flex flex-col gap-4 font-mono text-sm bg-black/95 border-b border-white/5 p-6 absolute top-full left-0 right-0 shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`py-2 transition-colors ${isActive ? 'text-[#00F0FF]' : 'text-[#888888] hover:text-[#EAEAEA]'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/5">
            <Link href="/vault" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Vault Access
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
