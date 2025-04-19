import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button'; 
import { Input } from '../../ui/Input';
import { RadioGroup } from '../../wizard/RadioGroup'; 
import { Alert } from '../../wizard/Alert'; 

interface Step5RegistersProps {
  onComplete: () => void; 
}

interface Step5FormData {
  hasInterestsRegister?: boolean | null;
  interestsHasNature?: boolean;
  interestsHasDate?: boolean;
  interestsHasManagement?: boolean;
  hasDisputesRegister?: boolean | null;
  disputesHasNature?: boolean;
  disputesHasParties?: boolean;
  disputesHasProcess?: boolean;
  disputesHasOutcome?: boolean;
  registerResponsiblePerson?: string;
}

const Step5Registers: React.FC<Step5RegistersProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Step5FormData>({
    // Initialize checklist states
    interestsHasNature: false,
    interestsHasDate: false,
    interestsHasManagement: false,
    disputesHasNature: false,
    disputesHasParties: false,
    disputesHasProcess: false,
    disputesHasOutcome: false,
  });
  const navigate = useNavigate();

  const handleChange = (name: keyof Step5FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const validateForm = (): boolean => {
      // Basic validation: ensure Yes/No questions are answered
      if (formData.hasInterestsRegister === null || formData.hasInterestsRegister === undefined) return false;
      if (formData.hasDisputesRegister === null || formData.hasDisputesRegister === undefined) return false;
      if (!formData.registerResponsiblePerson) return false; // Require responsible person
      // Add checklist validation if needed when applicable
      return true;
  }

  const handleSaveAndComplete = () => {
     if (validateForm()) {
         console.log('Saving Step 5 Data:', formData);
         onComplete(); 
     } else {
         console.log("Validation failed for Step 5");
         // Optionally set error states here
     }
  };

  return (
    <div>
      {/* 5.1 Interests Register */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="5.1 Does your society have a process for recording and managing conflicts of interest?"
          name="hasInterestsRegister"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.hasInterestsRegister}
          onChange={(value) => handleChange('hasInterestsRegister', value)}
        />
        {formData.hasInterestsRegister === false && (
           <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
             {/* Corrected alert text */}
             <p className="mb-2">Action Required: A compliant process for managing conflicts of interest is mandatory. Please establish one.</p>
             <Button variant="outline" size="sm" onClick={() => handleNavigate('/disputes')}> {/* Adjust route if needed */}
               Go to Dispute and Conflicts Management
             </Button>
           </div>
        )}
      </div>

      {/* 5.2 Interests Register Details (conditional) */}
      {formData.hasInterestsRegister === true && (
         <div className="mb-6 pb-6 border-b border-gray-200">
           <h3 className="text-sm font-medium text-gray-800 mb-2">5.2 Interests Register Details</h3>
           <p className="text-sm text-gray-600 mb-4">What information does your interests register contain?</p>
           <div className="space-y-2">
             <label htmlFor="interestsHasNature" className="flex items-center text-sm text-gray-700">
               <input id="interestsHasNature" name="interestsHasNature" type="checkbox" checked={!!formData.interestsHasNature} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
               Nature and extent of officer's interest
             </label>
              <label htmlFor="interestsHasDate" className="flex items-center text-sm text-gray-700">
               <input id="interestsHasDate" name="interestsHasDate" type="checkbox" checked={!!formData.interestsHasDate} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
               Date disclosure was made
             </label>
             <label htmlFor="interestsHasManagement" className="flex items-center text-sm text-gray-700">
               <input id="interestsHasManagement" name="interestsHasManagement" type="checkbox" checked={!!formData.interestsHasManagement} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
               How the conflict was managed
             </label>
           </div>
            {(!formData.interestsHasNature || !formData.interestsHasDate || !formData.interestsHasManagement) && (
                 <Alert type="warning" message="Ensure your register captures the nature, date, and management of conflicts."/>
            )}
         </div>
      )}
      
      {/* 5.3 Disputes Register */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="5.3 Does your society have a process for recording and managing disputes?"
          name="hasDisputesRegister"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.hasDisputesRegister}
          onChange={(value) => handleChange('hasDisputesRegister', value)}
        />
        {formData.hasDisputesRegister === false && (
           <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
             {/* Corrected alert text */}
             <p className="mb-2">Action Required: A compliant process for managing disputes is mandatory. Please establish one.</p>
              <Button variant="outline" size="sm" onClick={() => handleNavigate('/disputes')}> {/* Adjust route if needed */}
               Go to Dispute and Conflicts Management
             </Button>
           </div>
        )}
      </div>

      {/* 5.4 Disputes Register Details (conditional) */}
      {formData.hasDisputesRegister === true && (
         <div className="mb-6 pb-6 border-b border-gray-200">
           <h3 className="text-sm font-medium text-gray-800 mb-2">5.4 Disputes Register Details</h3>
           <p className="text-sm text-gray-600 mb-4">What information does your disputes register contain?</p>
           <div className="space-y-2">
              <label htmlFor="disputesHasNature" className="flex items-center text-sm text-gray-700">
               <input id="disputesHasNature" name="disputesHasNature" type="checkbox" checked={!!formData.disputesHasNature} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
               Nature of dispute
             </label>
             <label htmlFor="disputesHasParties" className="flex items-center text-sm text-gray-700">
               <input id="disputesHasParties" name="disputesHasParties" type="checkbox" checked={!!formData.disputesHasParties} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
               Parties involved
             </label>
             <label htmlFor="disputesHasProcess" className="flex items-center text-sm text-gray-700">
               <input id="disputesHasProcess" name="disputesHasProcess" type="checkbox" checked={!!formData.disputesHasProcess} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
               Resolution process followed
             </label>
             <label htmlFor="disputesHasOutcome" className="flex items-center text-sm text-gray-700">
               <input id="disputesHasOutcome" name="disputesHasOutcome" type="checkbox" checked={!!formData.disputesHasOutcome} onChange={handleCheckboxChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"/>
               Outcome of dispute
             </label>
           </div>
           {(!formData.disputesHasNature || !formData.disputesHasParties || !formData.disputesHasProcess || !formData.disputesHasOutcome) && (
                 <Alert type="warning" message="Ensure your register captures the nature, parties, process, and outcome of disputes."/>
            )}
         </div>
      )}
      
       {/* 5.5 Register Responsibility */}
       <div className="mb-8">
           <h3 className="text-sm font-medium text-gray-800 mb-2">5.5 Register Responsibility</h3>
            <label htmlFor="registerResponsiblePerson" className="block text-sm text-gray-600 mb-2">Who will be responsible for maintaining these registers?</label>
             <Input 
               id="registerResponsiblePerson"
               name="registerResponsiblePerson"
               value={formData.registerResponsiblePerson || ''} 
               onChange={(e) => handleChange('registerResponsiblePerson', e.target.value)}
               placeholder="Enter name or role"
               className="max-w-md"
             />
             <p className="mt-1 text-xs text-gray-500">Help Text: This person will need to ensure all registers are kept up-to-date.</p>
           {/* Add error display if needed */}
       </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8">
        <Button onClick={handleSaveAndComplete} variant="primary" disabled={formData.hasInterestsRegister === null || formData.hasDisputesRegister === null || !formData.registerResponsiblePerson}>Save & Mark Complete</Button>
      </div>
    </div>
  );
};

export default Step5Registers; 