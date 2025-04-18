import React, { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { Navigation } from './Navigation';
export const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const question = {
    title: 'Do you have any employees or regular volunteers?',
    description: 'The Health and Safety at Work Act 2015 applies to both paid staff and regular volunteers. You must ensure a safe working environment (Section 36), identify and manage risks (Section 30), and maintain appropriate policies and procedures. Employment relationships are governed by the Employment Relations Act 2000, requiring written agreements, fair processes, and compliance with minimum employment standards.',
    options: [{
      label: 'Yes, we have employees',
      value: 'employees'
    }, {
      label: 'Yes, regular volunteers only',
      value: 'volunteers'
    }, {
      label: 'No, neither',
      value: 'neither'
    }]
  };
  const handleSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep]: value
    }));
  };
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 10));
  };
  return <div className="min-h-screen bg-gray-50 p-6" data-prototypeId="2">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-500 text-white text-sm px-3 py-1 rounded">
                Step {currentStep}
              </div>
              <h1 className="text-xl font-medium text-gray-900">
                Registration
              </h1>
            </div>
            <ProgressBar currentStep={currentStep} totalSteps={10} />
          </div>
          <QuestionCard {...question} onSelect={handleSelect} selectedValue={answers[currentStep]} />
          <Navigation currentStep={currentStep} totalSteps={10} onPrevious={handlePrevious} onNext={handleNext} canContinue={Boolean(answers[currentStep])} />
        </div>
      </div>
    </div>;
};