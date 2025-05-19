import React from 'react';
import { Wizard } from '../components/wizard/Wizard';

export const WizardPage: React.FC = () => {
  return (
    // Minimal wrapper - layout might be adjusted later if needed
    <div className="min-h-screen bg-gray-50 p-6">
      <Wizard />
    </div>
  );
}; 