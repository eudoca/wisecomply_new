import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'warning';
  maxWidth?: number;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = 'top',
  children,
  variant = 'default',
  maxWidth = 250,
  delay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimer, setShowTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setShowTimer(timer);
  };

  const handleMouseLeave = () => {
    if (showTimer) {
      clearTimeout(showTimer);
      setShowTimer(null);
    }
    setIsVisible(false);
  };

  const baseStyles = "absolute z-50 px-3 py-2 text-sm rounded-md shadow-md opacity-0 invisible transition-opacity duration-200 pointer-events-none";
  const visibilityStyles = isVisible ? "opacity-100 visible" : "";
  
  const variantStyles = {
    default: "bg-gray-900 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-amber-600 text-white"
  };

  const positionStyles = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2",
    left: "right-full top-1/2 transform -translate-x-2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform translate-x-2 -translate-y-1/2 ml-2"
  };

  // Arrow styles based on position
  const arrowStyles = {
    top: "left-1/2 top-full -translate-x-1/2 border-t-gray-900 border-t-8 border-x-transparent border-x-8 border-b-0",
    bottom: "left-1/2 bottom-full -translate-x-1/2 border-b-gray-900 border-b-8 border-x-transparent border-x-8 border-t-0",
    left: "top-1/2 left-full -translate-y-1/2 border-l-gray-900 border-l-8 border-y-transparent border-y-8 border-r-0",
    right: "top-1/2 right-full -translate-y-1/2 border-r-gray-900 border-r-8 border-y-transparent border-y-8 border-l-0"
  };

  // Update arrow color for different variants
  const arrowVariantOverrides = {
    info: {
      top: "border-t-blue-600",
      bottom: "border-b-blue-600",
      left: "border-l-blue-600",
      right: "border-r-blue-600"
    },
    warning: {
      top: "border-t-amber-600",
      bottom: "border-b-amber-600",
      left: "border-l-amber-600",
      right: "border-r-amber-600"
    }
  };

  // Get the appropriate arrow style based on position and variant
  const getArrowStyle = () => {
    const baseArrowStyle = arrowStyles[position];
    const variantOverride = variant !== 'default' ? arrowVariantOverrides[variant][position] : '';
    return cn(baseArrowStyle, variantOverride);
  };

  return (
    <div className="relative inline-flex" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <div
        className={cn(
          baseStyles,
          variantStyles[variant],
          positionStyles[position],
          visibilityStyles
        )}
        style={{ maxWidth }}
        role="tooltip"
      >
        {text}
        <div className={cn("absolute w-0 h-0", getArrowStyle())}></div>
      </div>
    </div>
  );
}; 