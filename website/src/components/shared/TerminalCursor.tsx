import React from 'react';

export const TerminalCursor: React.FC = () => {
  return (
    <span className="animate-[pulse_1s_infinite] text-[#00F0FF] ml-1 select-none font-bold" aria-hidden="true">
      ▌
    </span>
  );
};
