import React from 'react';
import { Plus, RefreshCw, ShieldCheck } from 'lucide-react';

interface OrganisationTypeProps {
  formData: any; // Consider defining a proper type
  updateFormData: (data: Partial<any>) => void;
}

export const OrganisationType: React.FC<OrganisationTypeProps> = ({ formData, updateFormData }) => {
  const handleSelection = (type: string) => {
    updateFormData({ organisationType: type });
  };

  const types = [
    {
      id: 'new',
      label: 'New Incorporated Society',
      description: 'Not yet registered (planning to incorporate under the 2022 Act)',
      icon: <Plus className="w-8 h-8" />
    },
    {
      id: 'reregistering',
      label: 'Re-registering an Existing Society',
      description: 'Already incorporated under the old law (1908 Act), now transitioning to the 2022 Act',
      icon: <RefreshCw className="w-8 h-8" />
    },
    {
      id: 'ongoing',
      label: 'Ongoing Compliance',
      description: 'Already re-registered under the 2022 Act, setting up ongoing compliance management',
      icon: <ShieldCheck className="w-8 h-8" />
    },
  ];

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Choose the type of incorporated society setup you are working on.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {types.map(type => (
          <div 
            key={type.id}
            className={`p-6 border-2 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all hover:border-brand-primary hover:transform hover:-translate-y-1 
              ${formData.organisationType === type.id ? 'border-brand-primary bg-brand-light' : 'border-gray-200'}`}
            onClick={() => handleSelection(type.id)}
          >
            <div className="text-brand-primary mb-4">{type.icon}</div>
            <h3 className="font-semibold mb-2 text-gray-900">{type.label}</h3> {/* Added text color */}
            <p className="text-sm text-gray-600">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 