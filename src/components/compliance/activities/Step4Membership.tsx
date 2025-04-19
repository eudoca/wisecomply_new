import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button'; 
import { Input } from '../../ui/Input';
import { RadioGroup } from '../../wizard/RadioGroup'; 
import { Alert } from '../../wizard/Alert'; 

interface Step4MembershipProps {
  onComplete: () => void; 
}

interface Step4FormData {
  memberCount?: number | string;
  hasRegister?: boolean | null;
  registerHasFullName?: boolean;
  registerHasAddress?: boolean;
  registerHasJoinDate?: boolean;
  registerHasMemberClass?: boolean;
}

const Step4Membership: React.FC<Step4MembershipProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Step4FormData>({ 
    registerHasFullName: false,
    registerHasAddress: false,
    registerHasJoinDate: false,
    registerHasMemberClass: false,
  });
  const [countError, setCountError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (name: keyof Step4FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'memberCount') {
      const count = parseInt(value, 10);
      if (isNaN(count) || count < 10) {
        setCountError('Society must have at least 10 members.');
      } else {
        setCountError(null);
      }
    }
  };
  
   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const { name, checked } = event.target;
     setFormData(prev => ({ ...prev, [name]: checked }));
   };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const validateForm = (): boolean => {
      let isValid = true;
      const count = parseInt(formData.memberCount as string, 10);
      if (isNaN(count) || count < 10) {
          setCountError('Society must have at least 10 members.');
          isValid = false;
      }
      if (formData.hasRegister === null || formData.hasRegister === undefined) {
          isValid = false;
      }
      return isValid;
  }

  const handleSaveAndComplete = () => {
     if (validateForm()) {
         console.log('Saving Step 4 Data:', formData);
         onComplete(); 
     } else {
         console.log("Validation failed");
     }
  };

  return (
    <div>
      {/* 4.1 Membership Size */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-800 mb-2">4.1 Membership Size</h3>
        <label htmlFor="memberCount" className="block text-sm text-gray-600 mb-2">How many members does your society currently have?</label>
        <Input 
          id="memberCount"
          name="memberCount"
          type="number"
          min="10"
          value={formData.memberCount || ''} 
          onChange={(e) => handleChange('memberCount', e.target.value)}
          placeholder="Enter number (min 10)"
          className="max-w-xs"
        />
        {countError && <p className="mt-1 text-xs text-red-600">{countError}</p>}
        <p className="mt-2 text-xs text-gray-500">Help Text: Your society must maintain at least 10 members to qualify as an incorporated society.</p>
      </div>

      {/* 4.2 Membership Register */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="4.2 Do you have a current register of members?"
          name="hasRegister"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.hasRegister}
          onChange={(value) => handleChange('hasRegister', value)}
        />
        {formData.hasRegister === false && (
           <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
             <p className="mb-2">Action Required: A compliant membership register is mandatory. Please establish one.</p>
             <Button variant="outline" size="sm" onClick={() => handleNavigate('/members')}> {/* Adjust route if needed */}
               Go to Member Management 
             </Button>
           </div>
        )}
      </div>

      {/* 4.3 Membership Register Details (conditional) */}
      {formData.hasRegister === true && (
         <div className="mb-8">
           <h3 className="text-sm font-medium text-gray-800 mb-2">4.3 Membership Register Details</h3>
           <p className="text-sm text-gray-600 mb-4">Does your membership register contain the following information for each member?</p>
           <div className="space-y-2">
             <label htmlFor="regFullName" className="flex items-center text-sm text-gray-700">
               <input
                 id="regFullName"
                 name="registerHasFullName"
                 type="checkbox"
                 checked={!!formData.registerHasFullName}
                 onChange={handleCheckboxChange} 
                 className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"
               />
               Full name
             </label>
             <label htmlFor="regAddress" className="flex items-center text-sm text-gray-700">
                <input
                 id="regAddress"
                 name="registerHasAddress"
                 type="checkbox"
                 checked={!!formData.registerHasAddress}
                 onChange={handleCheckboxChange}
                 className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"
               />
               Contact address
             </label>
             <label htmlFor="regJoinDate" className="flex items-center text-sm text-gray-700">
               <input
                 id="regJoinDate"
                 name="registerHasJoinDate"
                 type="checkbox"
                 checked={!!formData.registerHasJoinDate}
                 onChange={handleCheckboxChange}
                 className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"
               />
                Date they became a member
             </label>
              <label htmlFor="regMemberClass" className="flex items-center text-sm text-gray-700">
                 <input
                 id="regMemberClass"
                 name="registerHasMemberClass"
                 type="checkbox"
                 checked={!!formData.registerHasMemberClass}
                 onChange={handleCheckboxChange}
                 className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"
               />
                Membership class/type (if applicable)
             </label>
           </div>
            {(!formData.registerHasFullName || !formData.registerHasAddress || !formData.registerHasJoinDate) && (
                <Alert type="warning" message="Your register must include at least the full name, contact address, and join date for each member to be compliant." />
            )}
         </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8">
        <Button onClick={handleSaveAndComplete} variant="primary" disabled={!!countError || formData.hasRegister === null || formData.hasRegister === undefined}>Save & Mark Complete</Button>
      </div>
    </div>
  );
};

export default Step4Membership; 