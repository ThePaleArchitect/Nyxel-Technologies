import React from 'react';

interface TabOption {
  id: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  options,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex border-b border-[#2A2A2A] font-mono ${className}`}>
      {options.map((opt) => {
        const isActive = activeTab === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              isActive
                ? 'border-[#00F0FF] text-[#EAEAEA] bg-[#121212]'
                : 'border-transparent text-[#888888] hover:text-[#EAEAEA] hover:bg-white/5'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
