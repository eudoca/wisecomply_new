import React from 'react';
import { RadioGroup } from './RadioGroup';
import { Alert } from './Alert';
import { InfoBox } from './InfoBox';

interface BasicDetailsProps {
  formData: any; // Consider defining a proper type
  updateFormData: (data: Partial<any>) => void;
}

export const BasicDetails: React.FC<BasicDetailsProps> = ({ formData, updateFormData }) => {
  const handleChange = (name: keyof typeof formData, value: any) => {
    updateFormData({ [name]: value });
  };

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Let's gather some fundamental information about your society's status and context.
      </p>
      
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Does your society have at least 10 members?"
          name="hasMinimumMembers"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.hasMinimumMembers}
          onChange={(value) => handleChange('hasMinimumMembers', value)}
          tooltip="The Incorporated Societies Act 2022 requires a minimum of 10 members, reduced from 15 under the old law."
        />
        {formData.hasMinimumMembers === false && (
          <Alert type="warning" message="Your society must have at least 10 members to register or remain compliant under the 2022 Act." />
        )}
      </div>
      
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Is (or will) the society be registered as a charity with Charities Services?"
          name="isCharity"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.isCharity}
          onChange={(value) => handleChange('isCharity', value)}
          tooltip="This affects reporting standards and additional filings required by Charities Services."
        />
      </div>
      
      <div>
        <RadioGroup
          label="Do you receive any significant grants or funding that require accountability reporting to funders?"
          name="hasExternalFunding"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.hasExternalFunding}
          onChange={(value) => handleChange('hasExternalFunding', value)}
          tooltip="This includes government grants, philanthropic funding, or any other external funding that comes with reporting obligations."
        />
      </div>
      
      {formData.organisationType === 'reregistering' && (
        <InfoBox 
          title="Re-registration Deadline"
          message="All existing societies must re-register under the 2022 Act by 5 April 2026 to remain on the register."
        />
      )}
    </div>
  );
}; 