import React from 'react';
import { cn } from '../../utils/cn';
import { Label as LabelComponent } from './Typography';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSuccess?: boolean;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  isSuccess,
  fullWidth = false,
  disabled,
  id,
  ...props
}) => {
  // Generate a unique ID if none provided
  const inputId = id || React.useId();
  
  const baseInputStyles = "block rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm";
  
  const stateStyles = cn(
    error && "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500",
    isSuccess && "border-green-500 focus:border-green-500 focus:ring-green-500",
    disabled && "cursor-not-allowed bg-gray-50 text-gray-500"
  );
  
  const iconInputStyles = cn(
    leftIcon && "pl-10",
    rightIcon && "pr-10"
  );

  return (
    <div className={cn(fullWidth && "w-full")}>
      {label && (
        <LabelComponent htmlFor={inputId}>
          {label}
        </LabelComponent>
      )}
      <div className="relative rounded-md shadow-sm">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{leftIcon}</span>
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            baseInputStyles,
            stateStyles,
            iconInputStyles,
            fullWidth && "w-full",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-description` : undefined}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">{rightIcon}</span>
          </div>
        )}
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p 
          className={cn(
            "mt-2 text-sm", 
            error ? "text-red-600" : "text-gray-500"
          )}
          id={error ? `${inputId}-error` : `${inputId}-description`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}; 