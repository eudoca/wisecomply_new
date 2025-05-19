import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-10 w-48 px-3 py-2 -ml-24 text-xs text-white bg-gray-800 rounded-md shadow-md left-1/2 top-full mt-1">
          {text}
          {/* Arrow */}
          <div className="absolute bottom-full left-1/2 -ml-1 w-0 h-0 border-4 border-transparent border-b-gray-800"></div>
        </div>
      )}
    </div>
  );
}; 