'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    <nav className="sticky top-0 z-50 bg-black/85 backdrop-blur-[12px] border-b border-white/5 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-mono text-[#00F0FF] text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          NXC ✦
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 font-mono text-sm items-center">
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

        {/* CTA */}
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
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-4 font-mono text-sm bg-black/95 p-4 absolute top-[52px] left-0 right-0 border-b">
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
