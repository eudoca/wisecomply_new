import React from 'react';
import { RadioGroup } from './RadioGroup';
import { Alert } from './Alert';
import { InfoBox } from './InfoBox';
import { Tooltip } from './Tooltip';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FinancialObligationsProps {
  formData: any; // Consider defining a proper type
  updateFormData: (data: Partial<any>) => void;
}

export const FinancialObligations: React.FC<FinancialObligationsProps> = ({ formData, updateFormData }) => {
  const handleChange = (name: keyof typeof formData, value: any) => {
    updateFormData({ [name]: value });
  };

  const spendingOptions = [
    { value: 'under50k', label: 'Less than $50,000 per year' },
    { value: '50k-140k', label: '$50,000 - $140,000' },
    { value: '140k-2m', label: '$140,000 - $2 million' },
    { value: '2m-30m', label: '$2 million - $30 million' },
    { value: 'over30m', label: 'Over $30 million per year' }
  ];

  const getReportingTier = () => {
    switch(formData.annualSpending) {
      case 'under50k': return 'Small society - simplified financial statements';
      case '50k-140k': return 'XRB Tier 4 standard (simplified cash accounting)';
      case '140k-2m': return 'XRB Tier 3 reporting (accrual accounting with simplified format)';
      case '2m-30m': return 'XRB Tier 2 (PBE Standards with reduced disclosures)';
      case 'over30m': return 'XRB Tier 1 (full Public Benefit Entity standards)';
      default: return null;
    }
  };

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Let's determine your financial reporting requirements and other compliance obligations.
      </p>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-gray-700">Approximately what is your society's annual spending (operating expenditure)?</label>
            <Tooltip text="This determines your financial reporting tier and whether enhanced reporting/audit requirements apply.">
              <HelpCircle className="text-gray-500 hover:text-brand-primary cursor-help w-4 h-4" />
            </Tooltip>
          </div>
          <div className="relative">
            <select
              value={formData.annualSpending || ''}
              onChange={(e) => handleChange('annualSpending', e.target.value)}
              // Apply form plugin styles
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
            >
              <option value="" disabled>Select an option</option>
              {spendingOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
        {formData.annualSpending && (
          <InfoBox title="Your Reporting Tier" message={`Based on your society's size, you should follow: ${getReportingTier()}`} />
        )}
      </div>

      {formData.isCharity && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <RadioGroup
            label="Is your annual operating expenditure over $1.1 million?"
            name="expenditureOverThreshold"
            options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
            value={formData.expenditureOverThreshold}
            onChange={(value) => handleChange('expenditureOverThreshold', value)}
            tooltip="Registered charities with operating expenditure ≥ $1.1m in each of the last two years must have their financial statements audited."
          />
          {formData.expenditureOverThreshold === true && (
            <Alert type="info" message="Your society will need an independent audit by a qualified auditor (Charities Act requirement)." />
          )}
          {formData.expenditureOverThreshold === false && (
            <InfoBox title="Medium Charity Note" message="If your expenditure is between $550k and $1.1m, you'll need at least a financial review as per the Charities Act." />
          )}
        </div>
      )}

      {!formData.isCharity && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <RadioGroup
            label="Is your annual operating expenditure $3 million or more?"
            name="expenditureOverThreshold"
            options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
            value={formData.expenditureOverThreshold}
            onChange={(value) => handleChange('expenditureOverThreshold', value)}
            tooltip="The new Act requires a non-charitable incorporated society to have its financial statements audited if its total operating expenditure was $3m or more in each of the last two financial years."
          />
          {formData.expenditureOverThreshold === true && (
            <Alert type="info" message="Your society will need an annual audit of financial statements (2022 Act requirement for large societies)." />
          )}
        </div>
      )}

      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Aside from legal requirements, do any stakeholders (e.g. funders or your own rules) require your financial statements to be audited or reviewed?"
          name="requiresAudit"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.requiresAudit}
          onChange={(value) => handleChange('requiresAudit', value)}
          tooltip="Some grant funders or your society's constitution might mandate an audit even if the law doesn't."
        />
      </div>

      <div>
        <RadioGroup
          label="Does your society collect or hold personal information about individuals (e.g. members, donors, volunteers)?"
          name="handlesPersonalInfo"
          options={[ { value: true, label: 'Yes' }, { value: false, label: 'No' } ]}
          value={formData.handlesPersonalInfo}
          onChange={(value) => handleChange('handlesPersonalInfo', value)}
          tooltip="The Privacy Act 2020 applies to any 'agency' in NZ, including clubs and incorporated societies, that holds personal information."
        />
        {formData.handlesPersonalInfo === true && (
          <InfoBox title="Privacy Obligations" message="Your society will need to ensure compliance with the Privacy Act 2020, including having a privacy statement and following the 13 information privacy principles." />
        )}
      </div>
    </div>
  );
}; 