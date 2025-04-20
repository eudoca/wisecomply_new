import React, { useState } from 'react';
import { RadioGroup } from '../../wizard/RadioGroup'; // Assuming this path is correct
import { Button } from '@/components/ui/button'; // Standardized path
import { Alert } from '../../wizard/Alert'; // Assuming this path is correct
import { Input } from '@/components/ui/input'; // Standardized path

interface Step1PlanningProps {
  onComplete: () => void; // Function to call when the step is marked complete or saved
}

interface Step1FormData {
  registrationDecision?: boolean | null;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  targetDate?: string;
  generatePlan?: boolean | null;
}

const Step1Planning: React.FC<Step1PlanningProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Step1FormData>({});
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (name: keyof Step1FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Basic email validation on change
    if (name === 'ownerEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError(null);
      }
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setFormData(prev => ({ ...prev, targetDate: event.target.value }));
     // Add date validation if needed here
  };

  const handleSaveAndComplete = () => {
    // Add validation logic here before calling onComplete
    console.log('Saving Step 1 Data:', formData);
    onComplete();
  };

  // Get today's date + buffer for min date, format as YYYY-MM-DD
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDate = '2026-04-05'; // Max allowed date

  return (
    <div>
      {/* Remove main h2 title - context is above */}
      {/* <h2 className="text-lg font-semibold mb-6 border-b pb-2">Stage 1: Pre-requisites & Planning</h2> */}

      {/* 1.1 Registration Decision */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="1.1 Has your organisation formally decided to register/re-register as an incorporated society?"
          name="registrationDecision"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.registrationDecision}
          onChange={(value) => handleChange('registrationDecision', value)}
        />
        {formData.registrationDecision === false && (
          <Alert type="warning" message="A formal decision by your organisation is recommended before proceeding with the registration/re-registration process." />
        )}
      </div>

      {/* 1.2 Application Owner */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-800 mb-2">1.2 Application Owner</h3>
        <p className="text-sm text-gray-600 mb-4">Who will be the primary person responsible for driving this application process?</p>
        <div className="space-y-3">
          <div>
             <label htmlFor="ownerName" className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <Input 
              id="ownerName"
              name="ownerName"
              value={formData.ownerName || ''} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('ownerName', e.target.value)}
              placeholder="Enter full name"
            />
          </div>
           <div>
             <label htmlFor="ownerEmail" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <Input 
              id="ownerEmail"
              name="ownerEmail"
              type="email" 
              value={formData.ownerEmail || ''} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('ownerEmail', e.target.value)}
              placeholder="Enter email address"
            />
            {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
          </div>
           <div>
             <label htmlFor="ownerPhone" className="block text-xs font-medium text-gray-700 mb-1">Phone (Optional)</label>
            <Input 
              id="ownerPhone"
              name="ownerPhone"
              type="tel"
              value={formData.ownerPhone || ''} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('ownerPhone', e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      {/* 1.3 Target Completion Date */}
      <div className="mb-6 pb-6 border-b border-gray-200">
         <h3 className="text-sm font-medium text-gray-800 mb-2">1.3 Target Completion Date</h3>
         <p className="text-sm text-gray-600 mb-4">What is your target date for completing the registration process?</p>
        <Input 
          type="date"
          id="targetDate"
          name="targetDate"
          value={formData.targetDate || ''}
          onChange={handleDateChange}
          min={minDate} // Set min date to today
          max={maxDate} // Set max date to deadline
          className="max-w-xs" // Limit width
        />
        <p className="mt-1 text-xs text-gray-500">The final deadline for re-registration is 5 April 2026.</p>
         {/* Add validation message display if needed */}
      </div>

      {/* 1.4 Plan Generation */}
      <div className="mb-8">
        <RadioGroup
          label="1.4 Would you like to generate a tailored compliance plan based on your responses?"
          name="generatePlan"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.generatePlan}
          onChange={(value) => handleChange('generatePlan', value)}
        />
         {formData.generatePlan === true && (
           <div className="mt-4">
             <Button variant="outline" size="sm" disabled>Generate Plan (Coming Soon)</Button>
           </div>
         )}
      </div>

       {/* Action Buttons - Remove Back Button, update Save */}
      <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8"> 
        {/* <Button onClick={onBack} variant="outline">Back to Activities</Button> */}
        <Button onClick={handleSaveAndComplete} variant="primary">Save & Mark Complete</Button> 
      </div>
    </div>
  );
};

export default Step1Planning; 