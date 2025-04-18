import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
interface Option {
  label: string;
  value: string;
}
interface QuestionCardProps {
  title: string;
  description?: string;
  options: Option[];
  onSelect: (value: string) => void;
  selectedValue?: string;
}
export const QuestionCard = ({
  title,
  description,
  options,
  onSelect,
  selectedValue
}: QuestionCardProps) => {
  return <div className="w-full max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        {description && <p className="text-gray-600 text-sm leading-relaxed">{description}</p>}
      </div>
      <div className="space-y-3">
        {options.map(option => <button key={option.value} onClick={() => onSelect(option.value)} className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex justify-between items-center hover:border-indigo-500 hover:bg-indigo-50 ${selectedValue === option.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
            <span className="text-gray-900">{option.label}</span>
            <ChevronRightIcon className={`w-5 h-5 text-gray-400 ${selectedValue === option.value ? 'text-indigo-500' : ''}`} />
          </button>)}
      </div>
    </div>;
};