import React, { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react'; // Use lucide icons

interface ExpandableProps {
  title: string;
  children: ReactNode;
}

export const Expandable: React.FC<ExpandableProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
    
  return (
    <div className="mt-3 border border-gray-200 rounded-md overflow-hidden">
      <button 
        className="flex items-center w-full gap-2 px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Use Info icon consistent with InfoBox */}
        <span className="text-brand-primary">
           <Info className="w-5 h-5" /> 
        </span>
        <span className="text-sm font-medium flex-1 text-gray-700">{title}</span>
        <span className="text-gray-500">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-white border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}; 