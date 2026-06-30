import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neo' | 'ghost' | 'glass' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'neo',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 active:scale-[0.98] cursor-pointer';
  
  const variantStyles = {
    neo: 'bg-[#FF4500] text-[#0A0A0A] border-4 border-[#FF4500] hover:bg-[#FF4500]/90 hover:border-[#FF4500]/90 rounded-none font-semibold -rotate-[0.5deg] hover:rotate-0 hover:shadow-[4px_4px_0px_0px_#00F0FF]',
    ghost: 'bg-transparent text-[#00F0FF] border border-[#00F0FF] hover:bg-[#00F0FF]/10 rounded-none',
    glass: 'bg-white/5 backdrop-blur-[12px] border border-white/10 text-white hover:bg-white/10 rounded-none',
    danger: 'bg-[#FF1A1A] text-white border border-[#FF1A1A] hover:bg-[#FF1A1A]/80 rounded-none',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs tracking-wider uppercase',
    md: 'px-6 py-3 text-sm tracking-wide font-semibold',
    lg: 'px-8 py-4 text-base tracking-widest uppercase',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
