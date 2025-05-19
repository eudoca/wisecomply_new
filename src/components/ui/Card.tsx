import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  clickable = false,
  selected = false,
  className,
  children,
  ...props
}) => {
  const baseStyles = "rounded-lg bg-white";
  
  const variantStyles = {
    default: "border border-gray-200",
    bordered: "border-2 border-gray-300",
    elevated: "border border-gray-200 shadow-md",
    ghost: "bg-gray-50 border border-gray-200"
  };
  
  const paddingStyles = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };
  
  const interactionStyles = cn(
    clickable && "cursor-pointer hover:border-purple-300 transition-all duration-200 hover:shadow-sm",
    selected && "border-purple-400 bg-purple-50"
  );
  
  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        interactionStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("mb-4 flex items-center justify-between", className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={cn("text-base font-semibold text-gray-900", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn("text-sm text-gray-500", className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("", className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("mt-4 flex items-center justify-between", className)} {...props}>
    {children}
  </div>
); 