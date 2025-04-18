import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'danger' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";
  
  const sizeStyles = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base"
  };
  
  const variantStyles = {
    primary: "bg-brand-primary text-white hover:bg-brand-dark focus:ring-brand-primary active:bg-brand-dark/90",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 active:bg-gray-300",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-brand-primary active:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 active:bg-gray-200",
    link: "text-brand-primary underline hover:text-brand-dark p-0 focus:ring-0 focus:ring-offset-0",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 active:bg-yellow-700"
  };
  
  const disabledStyles = "opacity-60 cursor-not-allowed";
  const loadingStyles = "relative !text-transparent transition-none hover:!text-transparent";
  const fullWidthStyles = "w-full";
  
  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        (disabled || isLoading) && disabledStyles,
        isLoading && loadingStyles,
        fullWidth && fullWidthStyles,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon && <span className={cn("mr-2", isLoading && "opacity-0")}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={cn("ml-2", isLoading && "opacity-0")}>{rightIcon}</span>}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </button>
  );
};