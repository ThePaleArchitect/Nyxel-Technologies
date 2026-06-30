import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'glass' | 'neo' | 'editorial';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'standard',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-mono transition-all duration-300';

  const variantStyles = {
    standard: 'bg-[#121212] border border-[#2A2A2A] p-6 rounded-none',
    glass: 'bg-white/5 backdrop-blur-[12px] border border-white/10 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
    neo: 'bg-[#121212] border-4 border-[#FF4500] p-6 rounded-none shadow-none hover:shadow-[6px_6px_0px_0px_#00F0FF]',
    editorial: 'bg-[#121212] border border-[#2A2A2A] p-8 rounded-none transform rotate-1 hover:rotate-0',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
