import React from 'react';
interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  canContinue: boolean;
}
export const Navigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canContinue
}: NavigationProps) => {
  return <div className="flex justify-between items-center mt-8">
      <button onClick={onPrevious} disabled={currentStep === 1} className="px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
        Previous
      </button>
      <div className="text-sm text-gray-500">
        {currentStep} of {totalSteps} steps
      </div>
      <button onClick={onNext} disabled={!canContinue} className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors">
        Continue
      </button>
    </div>;
};