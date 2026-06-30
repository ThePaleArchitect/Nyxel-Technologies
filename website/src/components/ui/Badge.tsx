import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'orange' | 'gold' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-[#1A1A1A] text-[#888888] border border-[#2A2A2A]',
    cyan: 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30',
    orange: 'bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/30',
    gold: 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-mono tracking-wider uppercase border rounded-none ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
