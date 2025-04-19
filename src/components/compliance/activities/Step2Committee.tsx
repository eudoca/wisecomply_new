import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button'; 
import { Input } from '../../ui/Input';
import { Alert } from '../../wizard/Alert'; 

interface Step2CommitteeProps {
  onComplete: () => void; // Function to call when the step is marked complete or saved
}

interface Step2FormData {
  committeeSize?: number | string; // Allow string for input, parse to number
}

const Step2Committee: React.FC<Step2CommitteeProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Step2FormData>({});
  const [sizeError, setSizeError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (name: keyof Step2FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate committee size on change
    if (name === 'committeeSize') {
      const size = parseInt(value, 10);
      if (isNaN(size) || size < 3) {
        setSizeError('Committee must have at least 3 members.');
      } else {
        setSizeError(null);
      }
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSaveAndComplete = () => {
    // Validation before completing
    const size = parseInt(formData.committeeSize as string, 10);
     if (isNaN(size) || size < 3) {
       setSizeError('Committee must have at least 3 members before completing.');
       return; // Prevent completion if invalid
     }
    setSizeError(null);
    console.log('Saving Step 2 Data:', formData);
    onComplete(); 
  };

  return (
    <div>
      {/* Stage Title - removed as context is above */}

      {/* 2.1 Committee Size */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-800 mb-2">2.1 Committee Size</h3>
        <label htmlFor="committeeSize" className="block text-sm text-gray-600 mb-2">How many committee members will your society have?</label>
        <Input 
          id="committeeSize"
          name="committeeSize"
          type="number"
          min="3"
          value={formData.committeeSize || ''} 
          onChange={(e) => handleChange('committeeSize', e.target.value)}
          placeholder="Enter number (min 3)"
          className="max-w-xs"
        />
        {sizeError && <p className="mt-1 text-xs text-red-600">{sizeError}</p>}
        <p className="mt-2 text-xs text-gray-500">Help Text: Your society must have at least 3 committee members, with the majority being members of the society.</p>
      </div>

      {/* 2.2 Committee Members Link */}
      <div className="mb-6 pb-6 border-b border-gray-200">
         <h3 className="text-sm font-medium text-gray-800 mb-2">2.2 Committee Members</h3>
         <p className="text-sm text-gray-600 mb-3">Members need to be added via the Officer Management page.</p>
         <Button variant="outline" size="sm" onClick={() => handleNavigate('/officers')}> {/* Assuming /officers is the route */}
           Go to Officer Management
         </Button>
      </div>
      
      {/* 2.3 Officer Qualifications Link */}
      <div className="mb-8">
         <h3 className="text-sm font-medium text-gray-800 mb-2">2.3 Officer Qualifications</h3>
         <p className="text-sm text-gray-600 mb-3">Please confirm all nominated officers meet eligibility requirements on the Officer Management page.</p>
         <Button variant="outline" size="sm" onClick={() => handleNavigate('/officers')}> {/* Assuming /officers is the route */}
           Go to Officer Management
         </Button>
      </div>

       {/* Action Buttons */}
       <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8"> 
         <Button onClick={handleSaveAndComplete} variant="primary" disabled={!!sizeError || formData.committeeSize === undefined}>Save & Mark Complete</Button> 
       </div>
    </div>
  );
};

export default Step2Committee; 