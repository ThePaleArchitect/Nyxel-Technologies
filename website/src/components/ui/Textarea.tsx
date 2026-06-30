import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full font-mono flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-xs text-[#888888] uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`w-full bg-[#1A1A1A] border ${error ? 'border-[#FF1A1A] focus:border-[#FF1A1A]' : 'border-[#2A2A2A] focus:border-[#00F0FF]'} rounded-none px-4 py-3 font-mono text-[#EAEAEA] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20 transition-all duration-200 resize-y min-h-[100px] ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-[#FF1A1A]">
          {error}
        </span>
      )}
    </div>
  );
};
