import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Standardized path
import { AlertTriangle } from 'lucide-react'; // Icon for alert
import { Alert } from '../../wizard/Alert';

interface Step6ConstitutionProps {
  onComplete: () => void; 
}

const Step6Constitution: React.FC<Step6ConstitutionProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSaveAndComplete = () => {
    // No form data to validate/save for this step
    console.log('Marking Step 6 complete (placeholder)');
    onComplete(); 
  };

  return (
    <div>
      {/* 6.1 Constitution Status */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">6.1 Constitution Status</h3>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex items-start">
          <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 text-blue-600"/>
          <div>
            <p className="font-medium mb-2">Action Required: A compliant constitution is required.</p>
            <p className="text-xs mb-3">Use the Constitution Management section to create, upload, or review your society's constitution against the requirements of the Incorporated Societies Act 2022.</p>
            <Button variant="outline" size="sm" onClick={() => handleNavigate('/constitution')}> {/* Adjust route if needed */}
              Go to Constitution Management
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8">
        {/* Keep the complete button for flow consistency */}
        <Button onClick={handleSaveAndComplete} variant="primary">Mark as Acknowledged & Complete</Button> 
      </div>
    </div>
  );
};

export default Step6Constitution; 