import React from 'react';
import { Tooltip } from './Tooltip'; // Import Tooltip
import { HelpCircle } from 'lucide-react'; // Use lucide icon

interface RadioOption {
  value: string | boolean | number;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string | boolean | number | null | undefined;
  onChange: (value: string | boolean | number) => void;
  tooltip?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  label, 
  name, 
  options, 
  value, 
  onChange, 
  tooltip 
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <label className="font-medium text-gray-700">{label}</label>
        {tooltip && (
          <Tooltip text={tooltip}>
            <HelpCircle className="text-gray-500 hover:text-brand-primary cursor-help w-4 h-4" />
          </Tooltip>
        )}
      </div>
      
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label key={String(option.value)} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              // Use brand color for consistency
              className="w-4 h-4 text-brand-primary focus:ring-brand-primary focus:ring-offset-0 focus:ring-2 border-gray-300"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}; 