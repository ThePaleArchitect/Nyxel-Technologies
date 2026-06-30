import React from 'react';
import { Hero } from '@/components/home/Hero';
import { Pillars } from '@/components/home/Pillars';
import { VaultTeaser } from '@/components/home/VaultTeaser';
import { Tracks } from '@/components/home/Tracks';
import { CharterQuote } from '@/components/home/CharterQuote';
import { NetworkMarquee } from '@/components/home/NetworkMarquee';
import { ConversionZone } from '@/components/home/ConversionZone';

export default function HomePage() {
  return (
    <div className="bg-[#0A0A0A] overflow-x-hidden">
      <Hero />
      <Pillars />
      <VaultTeaser />
      <Tracks />
      <CharterQuote />
      <NetworkMarquee />
      <ConversionZone />
    </div>
  );
}
