import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A]/85 backdrop-blur-[12px] transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#121212] border border-[#2A2A2A] rounded-none shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A] bg-black/40">
          {title ? (
            <h3 className="font-serif text-lg font-semibold text-[#EAEAEA] tracking-wide">
              {title}
            </h3>
          ) : (
            <div />
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="p-1 border-none hover:bg-white/5 active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#00F0FF]" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-[#EAEAEA]">
          {children}
        </div>
      </div>
    </div>
  );
};
