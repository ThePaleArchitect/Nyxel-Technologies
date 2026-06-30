import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Tracks: React.FC = () => {
  const tracksList = [
    {
      id: 'personal',
      name: 'Personal',
      description: 'Solo builders and experimenters',
      price: '$50–$300',
      duration: '3–7 days',
      ctaText: 'View Plans',
    },
    {
      id: 'incubation',
      name: 'Incubation',
      description: 'Bootstrapped founders and MVPs',
      price: '$500–$5,000',
      duration: '8–12 days',
      ctaText: 'View Sprints',
    },
    {
      id: 'scale',
      name: 'Scale',
      description: 'Funded startups and enterprises',
      price: '$18,000+',
      duration: 'Rolling cycles',
      ctaText: 'View Retainers',
    },
  ];

  return (
    <section className="py-24 border-t border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-widest block mb-2">
            ENGAGEMENT SEGMENTATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#EAEAEA]">
            The Tracks
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracksList.map((track) => (
            <Card 
              key={track.id} 
              variant="neo" 
              className="flex flex-col justify-between h-full bg-[#121212] p-8 border-4"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#EAEAEA]">
                    {track.name}
                  </h3>
                  <Badge variant={track.id === 'scale' ? 'orange' : 'default'}>
                    {track.price}
                  </Badge>
                </div>
                <p className="font-mono text-sm text-[#888888] mb-6">
                  {track.description}
                </p>
                <div className="text-xs text-[#888888] font-mono border-t border-[#2A2A2A] pt-4 mb-8">
                  <span className="uppercase text-[#666666] block mb-1">Timeframe</span>
                  <span className="text-sm font-semibold text-[#EAEAEA]">{track.duration}</span>
                </div>
              </div>

              <Link href="/capabilities">
                <Button variant="ghost" className="w-full justify-between items-center cursor-pointer">
                  <span>{track.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
