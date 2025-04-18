import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md';
  rounded?: 'full' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  icon,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium";
  
  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1"
  };
  
  const roundedStyles = {
    full: "rounded-full",
    md: "rounded-md"
  };
  
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-700",
    outline: "bg-white border border-gray-300 text-gray-700"
  };
  
  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        roundedStyles[rounded],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="mr-1 -ml-0.5">{icon}</span>}
      {children}
    </span>
  );
}; 