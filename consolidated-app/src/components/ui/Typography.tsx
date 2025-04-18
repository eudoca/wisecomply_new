import React from 'react';
import { cn } from '../../utils/cn';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const H1 = ({ 
  children, 
  className, 
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 
    className={cn("text-2xl font-bold text-gray-900 mb-4", className)} 
    {...props}
  >
    {children}
  </h1>
);

export const H2 = ({ 
  children, 
  className, 
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 
    className={cn("text-xl font-medium text-gray-900 mb-3", className)} 
    {...props}
  >
    {children}
  </h2>
);

export const H3 = ({ 
  children, 
  className, 
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 
    className={cn("text-lg font-medium text-gray-900 mb-2", className)} 
    {...props}
  >
    {children}
  </h3>
);

export const H4 = ({ 
  children, 
  className, 
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 
    className={cn("text-base font-medium text-gray-900 mb-2", className)} 
    {...props}
  >
    {children}
  </h4>
);

export const Paragraph = ({ 
  children, 
  className, 
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) => (
  <p 
    className={cn("text-base text-gray-700 mb-4", className)} 
    {...props}
  >
    {children}
  </p>
);

export const SmallText = ({ 
  children, 
  className, 
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) => (
  <p 
    className={cn("text-sm text-gray-600", className)} 
    {...props}
  >
    {children}
  </p>
);

export const Label = ({ 
  children, 
  className, 
  htmlFor,
  ...props 
}: TypographyProps & React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label 
    className={cn("text-sm font-medium text-gray-700 mb-1", className)}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
);

export const InlineCode = ({ 
  children, 
  className, 
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLElement>) => (
  <code 
    className={cn("bg-gray-100 text-gray-800 rounded px-1 py-0.5 text-sm font-mono", className)} 
    {...props}
  >
    {children}
  </code>
); 