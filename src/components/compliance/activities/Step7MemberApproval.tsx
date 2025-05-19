import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup } from '../../wizard/RadioGroup'; 
import { Alert } from '../../wizard/Alert'; 

interface Step7MemberApprovalProps {
  onComplete: () => void; 
}

interface Step7FormData {
  meetingHeld?: boolean | null;
  meetingDate?: string;
  membersPresent?: number | string;
  membersInFavor?: number | string;
  membersEligible?: number | string;
  hasCommitteeProcess?: boolean;
  hasMembershipConfirmation?: boolean;
  hasFinancialYear?: boolean;
  hasOfficerRoles?: boolean;
}

const Step7MemberApproval: React.FC<Step7MemberApprovalProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Step7FormData>({
    // Initialize checklist states
    hasCommitteeProcess: false,
    hasMembershipConfirmation: false,
    hasFinancialYear: false,
    hasOfficerRoles: false,
  });
  const [meetingError, setMeetingError] = useState<string | null>(null);

  const handleChange = (name: keyof Step7FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear meeting error if meeting held is changed or details are entered
    if (name === 'meetingHeld' || name === 'meetingDate' || name === 'membersPresent' || name === 'membersInFavor' || name === 'membersEligible') {
        setMeetingError(null);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validateForm = (): boolean => {
      setMeetingError(null); // Reset error
      let isValid = true;

      if (formData.meetingHeld === null || formData.meetingHeld === undefined) {
          // Add error state maybe?
          return false; 
      }

      if (formData.meetingHeld === true) {
          const present = parseInt(formData.membersPresent as string, 10);
          const favor = parseInt(formData.membersInFavor as string, 10);
          const eligible = parseInt(formData.membersEligible as string, 10);
          
          if (!formData.meetingDate) isValid = false;
          if (isNaN(present) || present < 0) isValid = false;
          if (isNaN(favor) || favor < 0) isValid = false;
          if (isNaN(eligible) || eligible <= 0) isValid = false; // Must be at least 1 eligible
          
          if (isValid && favor <= eligible / 2) {
              setMeetingError('The number of members in favor must be a majority (>50%) of those eligible to vote.');
              isValid = false;
          }
          if (!isValid && !meetingError) { // Set generic error if specific fields fail
              setMeetingError('Please fill in all meeting details correctly.');
          }
      }
      // Checklist validation could be added if necessary
      return isValid;
  }

  const handleSaveAndComplete = () => {
     if (validateForm()) {
         console.log('Saving Step 7 Data:', formData);
         onComplete(); 
     } else {
         console.log("Validation failed for Step 7");
     }
  };

  // Get today's date for max meeting date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      {/* 7.1 Member Meeting */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="7.1 Have you held a general meeting of members to approve the constitution?"
          name="meetingHeld"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.meetingHeld}
          onChange={(value) => handleChange('meetingHeld', value)}
        />
        <p className="mt-1 text-xs text-gray-500">Help Text: Your constitution must be approved by a majority of members entitled to vote.</p>
        {formData.meetingHeld === false && (
          <Alert type="warning" message="Approval by a majority of voting members at a general meeting is required before proceeding with registration/re-registration." />
        )}
      </div>

      {/* 7.2 Meeting Details (conditional) */}
      {formData.meetingHeld === true && (
        <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-800 mb-2">7.2 Meeting Details</h3>
            <p className="text-sm text-gray-600 mb-4">If yes, please provide details of the meeting:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="meetingDate" className="block text-xs font-medium text-gray-700 mb-1">Meeting Date</label>
                    <Input 
                        id="meetingDate"
                        name="meetingDate"
                        type="date"
                        max={today} // Cannot be in the future
                        value={formData.meetingDate || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('meetingDate', e.target.value)}
                    />
                </div>
                 <div>
                    <label htmlFor="membersPresent" className="block text-xs font-medium text-gray-700 mb-1">Number Present</label>
                    <Input 
                        id="membersPresent"
                        name="membersPresent"
                        type="number"
                        min="0"
                        value={formData.membersPresent || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('membersPresent', e.target.value)}
                        placeholder="e.g., 15"
                    />
                </div>
                <div>
                     <label htmlFor="membersInFavor" className="block text-xs font-medium text-gray-700 mb-1">Number in Favor</label>
                    <Input 
                        id="membersInFavor"
                        name="membersInFavor"
                        type="number"
                        min="0"
                        value={formData.membersInFavor || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('membersInFavor', e.target.value)}
                        placeholder="e.g., 12"
                    />
                </div>
                 <div>
                    <label htmlFor="membersEligible" className="block text-xs font-medium text-gray-700 mb-1">Number Eligible to Vote</label>
                    <Input 
                        id="membersEligible"
                        name="membersEligible"
                        type="number"
                        min="1" // Must be at least 1
                        value={formData.membersEligible || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('membersEligible', e.target.value)}
                        placeholder="e.g., 20"
                    />
                </div>
            </div>
            {meetingError && <Alert type="error" message={meetingError} />}
        </div>
      )}

      {/* 7.3 Operational Procedures */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-800 mb-2">7.3 Operational Procedures</h3>
        <p className="text-sm text-gray-600 mb-4">Have you established the following operational procedures?</p>
        <div className="space-y-2">
            <label htmlFor="hasCommitteeProcess" className="flex items-center text-sm text-gray-700">
                <input id="hasCommitteeProcess" name="hasCommitteeProcess" type="checkbox" checked={!!formData.hasCommitteeProcess} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
                Committee appointment process
            </label>
            <label htmlFor="hasMembershipConfirmation" className="flex items-center text-sm text-gray-700">
                <input id="hasMembershipConfirmation" name="hasMembershipConfirmation" type="checkbox" checked={!!formData.hasMembershipConfirmation} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
                Confirmation of membership numbers
            </label>
            <label htmlFor="hasFinancialYear" className="flex items-center text-sm text-gray-700">
                <input id="hasFinancialYear" name="hasFinancialYear" type="checkbox" checked={!!formData.hasFinancialYear} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
                Financial year/balance date
            </label>
             <label htmlFor="hasOfficerRoles" className="flex items-center text-sm text-gray-700">
                <input id="hasOfficerRoles" name="hasOfficerRoles" type="checkbox" checked={!!formData.hasOfficerRoles} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
                Additional officer roles and responsibilities
            </label>
        </div>
         {/* Optional: Alert if some are unchecked */}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8">
        <Button onClick={handleSaveAndComplete} variant="primary" disabled={formData.meetingHeld === null || formData.meetingHeld === undefined}>Save & Mark Complete</Button>
      </div>
    </div>
  );
};

export default Step7MemberApproval; 