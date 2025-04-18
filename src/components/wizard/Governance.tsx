import React from 'react';
import { RadioGroup } from './RadioGroup';
import { Alert } from './Alert';
import { Expandable } from './Expandable';

interface GovernanceProps {
  formData: any; // Consider defining a proper type
  updateFormData: (data: Partial<any>) => void;
}

export const Governance: React.FC<GovernanceProps> = ({ formData, updateFormData }) => {
  const handleChange = (name: keyof typeof formData, value: any) => {
    updateFormData({ [name]: value });
  };

  const constitutionRequirements = [
    "Member consent clause",
    "Contact Person appointment method",
    "Dispute resolution procedure",
    "Committee roles and powers defined",
    "Conflict of interest procedures",
    "Process for winding up the society"
  ];

  const officerDuties = [
    "Act in good faith in the best interests of the society",
    "Use powers properly for proper purpose",
    "Comply with the Act and constitution",
    "Exercise reasonable care and diligence",
    "Not create substantial risk to creditors",
    "Not incur obligations the society can't fulfill"
  ];

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Let's review your society's leadership structure and key governance requirements.
      </p>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Do you have (or plan to have) a committee with at least 3 members?"
          name="hasMinimumCommittee"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.hasMinimumCommittee}
          onChange={(value) => handleChange('hasMinimumCommittee', value)}
          tooltip="Under the 2022 Act, every society must have a governing committee with a minimum of three members."
        />
        {formData.hasMinimumCommittee === false && (
          <Alert type="error" message="Your society cannot register or operate under the new Act without a committee of at least 3 officers." />
        )}
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Have you designated at least one Contact Person for the society?"
          name="hasContactPerson"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.hasContactPerson}
          onChange={(value) => handleChange('hasContactPerson', value)}
          tooltip="The 2022 Act mandates each society to have 1 to 3 'contact persons' who are the primary contacts for the Registrar."
        />
        {formData.hasContactPerson === false && (
          <Alert type="warning" message="You must appoint a Contact Person and include this in your constitution as it's a legal requirement." />
        )}
      </div>

      {(formData.organisationType === 'new' || formData.organisationType === 'reregistering') && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <RadioGroup
            label="Have you prepared a constitution that complies with the 2022 Act's requirements?"
            name="hasCompliantConstitution"
            options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
            value={formData.hasCompliantConstitution}
            onChange={(value) => handleChange('hasCompliantConstitution', value)}
            tooltip="The 2022 Act requires specific clauses be included in every society's constitution."
          />
          <Expandable title="Key Constitution Requirements">
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
              {constitutionRequirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            {/* TODO: Add actual link */}
            <p className="mt-3 text-sm"><a href="#" className="text-brand-primary hover:underline">View Constitution Builder Tool</a></p>
          </Expandable>
          {formData.hasCompliantConstitution === false && (
            <Alert type="warning" message="You need to update or adopt a new constitution before registering under the 2022 Act." />
          )}
        </div>
      )}

      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Are all your society's officers eligible and have they consented to their roles in writing?"
          name="officersEligible"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.officersEligible}
          onChange={(value) => handleChange('officersEligible', value)}
          tooltip="All officers must be 16 or older and must certify in writing that they are not disqualified from holding office."
        />
        {formData.officersEligible === false && (
          <Alert type="warning" message="Each officer must sign a consent and certification before the society registers or continues under the new Act."/>
        )}
      </div>

      <div>
        <RadioGroup
          label="Are the officers (committee members) aware of their new legal duties under the 2022 Act?"
          name="officersAware"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.officersAware}
          onChange={(value) => handleChange('officersAware', value)}
          tooltip="The new Act explicitly outlines six duties for officers that they should understand."
        />
        <Expandable title="Officer Duties Under the 2022 Act">
          <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
            {officerDuties.map((duty, index) => (
              <li key={index}>{duty}</li>
            ))}
          </ul>
        </Expandable>
        {formData.officersAware === false && (
          <Alert type="info" message="It's recommended to educate officers on their statutory duties and responsibilities." />
        )}
      </div>
    </div>
  );
}; 