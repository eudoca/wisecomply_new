import React from 'react';
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}
export const ProgressBar = ({
  currentStep,
  totalSteps
}: ProgressBarProps) => {
  const progress = currentStep / totalSteps * 100;
  return <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300 ease-in-out" style={{
      width: `${progress}%`
    }} />
    </div>;
};