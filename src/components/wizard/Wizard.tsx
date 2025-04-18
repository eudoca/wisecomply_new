import React, { useState, ReactNode } from 'react';
import { 
  HelpCircle, Info, ChevronDown, ChevronUp, BookOpen, RefreshCw, ShieldCheck, 
  ArrowLeft, ArrowRight, Download, ClipboardList, Flag, Building, Hash, CheckCircle, Clock, AlertTriangle, RefreshCwIcon, GaugeIcon, WandIcon, FileText, Users, UserCog, MessageSquare, Vote, Calendar, Settings, Check, XCircle, Plus, UserCheck
} from 'lucide-react'; // Import necessary lucide icons

// Import Wizard sub-components
import { Tooltip } from './Tooltip';
import { RadioGroup } from './RadioGroup';
import { Alert } from './Alert';
import { InfoBox } from './InfoBox';
import { Expandable } from './Expandable';
import { Button } from '../ui/Button'; // Import shared Button
import { useNavigate } from 'react-router-dom'; // Import for final navigation

// --- Define formData type --- 
interface WizardFormData {
  organisationType?: string | null;
  proposedName?: string | null;
  hasMinimumMembers?: boolean | null;
  isCharity?: boolean | null;
  hasExternalFunding?: boolean | null;
  hasMinimumCommittee?: boolean | null;
  hasContactPerson?: boolean | null;
  hasCompliantConstitution?: boolean | null;
  officersEligible?: boolean | null;
  officersAware?: boolean | null;
  annualSpending?: string | null;
  expenditureOverThreshold?: boolean | null;
  requiresAudit?: boolean | null;
  handlesPersonalInfo?: boolean | null;
}

// --- Helper Data --- (Moved outside Wizard)
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
const spendingOptions = [
  { value: 'under50k', label: 'Less than $50,000 per year' },
  { value: '50k-140k', label: '$50,000 - $140,000' },
  { value: '140k-2m', label: '$140,000 - $2 million' },
  { value: '2m-30m', label: '$2 million - $30 million' },
  { value: 'over30m', label: 'Over $30 million per year' }
];

// --- Step Component Definitions (Moved Outside Wizard) ---

// Step 1: OrganisationType
interface OrganisationTypeProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}
const OrganisationType: React.FC<OrganisationTypeProps> = ({ formData, updateFormData }) => {
  const handleSelection = (type: string) => updateFormData({ organisationType: type });
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ proposedName: event.target.value });
  };

  const types = [
      { id: 'new', label: 'New Incorporated Society', description: 'Not yet registered (planning to incorporate under the 2022 Act)', icon: <Plus className="w-8 h-8"/> },
      { id: 'reregistering', label: 'Re-registering an Existing Society', description: 'Already incorporated under the old law (1908 Act), now transitioning to the 2022 Act', icon: <RefreshCw className="w-8 h-8"/> },
      { id: 'ongoing', label: 'Ongoing Compliance', description: 'Already re-registered under the 2022 Act, setting up ongoing compliance management', icon: <ShieldCheck className="w-8 h-8"/> },
    ];
  return (
    <div>
      <p className="text-gray-600 mb-6">
        Choose the type of incorporated society setup you are working on.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         {types.map(type => (
             <div 
              key={type.id}
              className={`p-6 border-2 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all hover:border-brand-primary hover:transform hover:-translate-y-1 
                ${formData.organisationType === type.id ? 'border-brand-primary bg-brand-light' : 'border-gray-200'}`}
              onClick={() => handleSelection(type.id)}
            >
              <div className="text-brand-primary mb-4">{type.icon}</div>
              <h3 className="font-semibold mb-2">{type.label}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
      </div>

      {/* Conditional Input/Search Placeholder */}
      {formData.organisationType === 'new' && (
        <div className="mt-6">
          <label htmlFor="proposedName" className="block text-sm font-medium text-gray-700 mb-1">
            Proposed name of the Incorporated Society
          </label>
          <input
            type="text"
            id="proposedName"
            name="proposedName"
            value={formData.proposedName || ''}
            onChange={handleNameChange}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
            placeholder="Enter proposed name"
          />
          <p className="mt-1 text-xs text-gray-500">You can change this later if required.</p>
        </div>
      )}

      {(formData.organisationType === 'reregistering' || formData.organisationType === 'ongoing') && (
         <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50 text-center">
            <p className="text-sm text-gray-600">Society Search Functionality (Coming Soon)</p>
             {/* Placeholder for future search input/button */}
             {/* <input type="text" disabled className="mt-2 w-full p-2 border border-gray-200 rounded-md bg-gray-100" placeholder="Search Society Register..." /> */}
          </div>
      )}
    </div>
  );
};

// Step 2: BasicDetails
interface BasicDetailsProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}
const BasicDetails: React.FC<BasicDetailsProps> = ({ formData, updateFormData }) => {
  const handleChange = (name: keyof WizardFormData, value: any) => updateFormData({ [name]: value });

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

// Step 3: Governance
interface GovernanceProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}
const Governance: React.FC<GovernanceProps> = ({ formData, updateFormData }) => {
  const handleChange = (name: keyof WizardFormData, value: any) => updateFormData({ [name]: value });

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

// Step 4: FinancialObligations
interface FinancialObligationsProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}
const FinancialObligations: React.FC<FinancialObligationsProps> = ({ formData, updateFormData }) => {
  const handleChange = (name: keyof WizardFormData, value: any) => updateFormData({ [name]: value });
  const getReportingTier = () => { /* ... as before ... */ };

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
             {/* Basic styled select - could be replaced with a custom dropdown component later */}
            <select
              value={formData.annualSpending || ''}
              onChange={(e) => handleChange('annualSpending', e.target.value)}
               className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary appearance-none"
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

interface WizardActionItem {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  type: 'task' | 'info' | 'warning';
  details?: string;
  category: string; // e.g., 'Constitution', 'Officers', 'Financial'
}

// Step 5: Summary
interface SummaryProps {
  formData: WizardFormData;
  handleDownloadPlan: () => void;
}
const Summary: React.FC<SummaryProps> = ({ formData, handleDownloadPlan }) => {
  console.log("Rendering Summary component with formData:", formData); // Keep log
  
  // Restore generateActionItems logic (you'll replace this with actual logic later)
  const generateActionItems = (): WizardActionItem[] => { 
    const actions: WizardActionItem[] = [];
    // --- Placeholder: Replace with actual logic to generate actions based on formData --- 
    console.log("Generating action items (placeholder)...", formData);
    // Example: Add a placeholder item if needed for testing 
    /* 
    actions.push({ 
        id: 'placeholder-1', 
        text: 'Review constitution requirements.', 
        priority: 'medium', 
        type: 'task', 
        category: 'Constitution' 
    });
    */
    // --- End Placeholder --- 
    console.log("Generated action items:", actions);
    return actions;
  }; 
  
  const actionItems = generateActionItems();
  console.log("Final actionItems to render:", actionItems); // Keep log

  // Restore priority constants
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const priorityIcons = {
    high: <AlertTriangle className="text-yellow-500 w-4 h-4" />,
    medium: <Info className="text-blue-500 w-4 h-4" />,
    low: <CheckCircle className="text-green-500 w-4 h-4" /> 
  };
  
  if (!actionItems || actionItems.length === 0) {
    console.warn("No action items generated for summary."); // Keep warning
    return (
        <div className="text-center py-10 px-6">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Immediate Action Items Identified</h3>
            <p className="mt-1 text-sm text-gray-500">Based on your answers, there are no high-priority compliance tasks required at this moment. Review the recommendations below.</p>
             {/* Optionally add a button to download anyway or proceed */}
             {/* <Button onClick={handleDownloadPlan} className="mt-4">Download Summary</Button> */}
        </div>
    ); 
  }
  
  return (
    <div>
      {/* ... Header ... */}
       <div className="mb-6">
         <h4 className="text-lg font-semibold text-gray-900 mb-1">Your Compliance Action Plan</h4>
         <p className="text-sm text-gray-600">Based on your responses, here are the recommended next steps and key considerations.</p>
       </div>

        {/* Action Items List */}
       <div className="space-y-4">
         {actionItems
            .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]) // Sort by priority
            .map((action, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg flex items-start space-x-3">
                 <span className="flex-shrink-0 mt-1">{priorityIcons[action.priority]}</span>
                 <div className="flex-1">
                   <p className="text-sm font-medium text-gray-900">{action.text}</p>
                   {action.details && <p className="text-sm text-gray-500 mt-1">{action.details}</p>}
                 </div>
                 <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{action.category}</span>
              </div>
           ))}
       </div>

        {/* Additional Resources / Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Additional Resources</h5>
            <ul className="list-disc pl-5 space-y-2 text-sm text-brand-primary">
                 <li><a href="#" className="hover:underline">Understanding Officer Duties Guide</a></li>
                 <li><a href="#" className="hover:underline">Financial Reporting Templates</a></li>
                 <li><a href="#" className="hover:underline">Constitution Best Practices Checklist</a></li>
            </ul>
        </div>

       {/* Download Button */}
       <div className="mt-8 text-center">
         <Button onClick={handleDownloadPlan} size="lg">
           <Download className="w-4 h-4 mr-2" />
           Download Action Plan (PDF)
         </Button>
       </div>
    </div>
  );
};

// --- Main Wizard Component --- 
export const Wizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>({}); 

  const steps = [
    { number: 1, name: "Organisation Type" },
    { number: 2, name: "Basic Details" },
    { number: 3, name: "Governance" },
    { number: 4, name: "Financial Obligations" },
    { number: 5, name: "Summary & Action Plan" }
  ];

  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
    console.log("Form data updated:", { ...formData, ...data }); 
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final step completion - navigate to compliance page
      console.log("Wizard Complete: ", formData);
      navigate('/compliance'); // Navigate after finish
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleDownloadPlan = () => {
     // Placeholder for PDF generation/download
     alert('PDF Download functionality not implemented yet.');
     console.log('Download Action Plan clicked. Data:', formData);
  };

  // --- Validation Logic ---
  const isStepComplete = (stepNumber: number): boolean => {
    const requiredFields: { [key: number]: (keyof WizardFormData)[] } = {
      1: ['organisationType'], // Required field for step 1
      2: ['hasMinimumMembers', 'isCharity', 'hasExternalFunding'], // Required fields for step 2
      3: ['hasMinimumCommittee', 'hasContactPerson', 'hasCompliantConstitution', 'officersEligible', 'officersAware'], // Required fields for step 3
      4: ['annualSpending', 'expenditureOverThreshold', 'requiresAudit', 'handlesPersonalInfo'], // Required fields for step 4
      // Step 5 (Summary) has no inputs, always considered complete
    };

    const fieldsToCheck = requiredFields[stepNumber];
    if (!fieldsToCheck) return true; // No required fields for this step (or step doesn't exist)

    // Special handling for constitution check (only required if new/reregistering)
    if (stepNumber === 3 && 
        formData.organisationType !== 'new' && 
        formData.organisationType !== 'reregistering') {
        const governanceFields = fieldsToCheck.filter(field => field !== 'hasCompliantConstitution');
        return governanceFields.every(field => formData[field] !== undefined && formData[field] !== null);
    }
    
    // Special handling for expenditure threshold (only required if applicable)
    if (stepNumber === 4 && 
        (formData.isCharity !== true) &&
        (formData.annualSpending !== '2m-30m' && formData.annualSpending !== 'over30m')) {
      const financialFields = fieldsToCheck.filter(field => field !== 'expenditureOverThreshold');
       return financialFields.every(field => formData[field] !== undefined && formData[field] !== null);
    } else if (stepNumber === 4 && formData.isCharity === true && (formData.annualSpending === 'under50k' || formData.annualSpending === '50k-140k')) {
        const financialFields = fieldsToCheck.filter(field => field !== 'expenditureOverThreshold');
        return financialFields.every(field => formData[field] !== undefined && formData[field] !== null);
    }

    // Check if all required fields for the step have a non-null/undefined value
    return fieldsToCheck.every(field => formData[field] !== undefined && formData[field] !== null);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      // Render the externally defined components
      case 1: return <OrganisationType formData={formData} updateFormData={updateFormData} />;
      case 2: return <BasicDetails formData={formData} updateFormData={updateFormData} />;
      case 3: return <Governance formData={formData} updateFormData={updateFormData} />;
      case 4: return <FinancialObligations formData={formData} updateFormData={updateFormData} />;
      case 5: return <Summary formData={formData} handleDownloadPlan={handleDownloadPlan} />;
      default: return null;
    }
  };

  // Main Wizard Layout
  return (
    <div className="max-w-4xl mx-auto"> {/* Retain max-width from WizardPage */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-2">Incorporated Society Compliance Wizard</h1>
        <p className="text-gray-600">Navigate the requirements of the Incorporated Societies Act 2022</p>
      </header>
      
      {/* Progress Indicator */}
      <div className="relative flex justify-between mb-10"> {/* Added more bottom margin */}
         {/* Background line */}
         <div className="absolute top-[18px] left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        {steps.map(step => (
          <div key={step.number} className="flex flex-col items-center text-center w-1/5"> {/* Equal width */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold mb-2 border-2 z-10
              ${currentStep === step.number ? 'bg-brand-primary border-brand-primary text-white' : 
               currentStep > step.number ? 'bg-green-500 border-green-500 text-white' : 
               'bg-white border-gray-300 text-gray-500'}`}
            >
               {currentStep > step.number ? <Check className="w-5 h-5"/> : step.number}
             </div>
             <div className={`text-xs ${currentStep === step.number ? 'text-brand-primary font-semibold' : 'text-gray-500'}`}>
              {step.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold pb-4 mb-6 border-b border-gray-200">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}
        </h2>
        
        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
           <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
           
           {currentStep === steps.length ? (
             <div className="flex gap-2">
               <Button onClick={handleDownloadPlan} leftIcon={<Download className="w-4 h-4"/>}>
                 Download Action Plan (PDF)
               </Button>
               <Button 
                onClick={nextStep} 
                rightIcon={<Check className="w-4 h-4"/>}
                disabled={!isStepComplete(currentStep)} // Use validation function
              >
                Finish & View Compliance
              </Button>
             </div>
           ) : (
             <Button 
              onClick={nextStep} 
              rightIcon={<ArrowRight className="w-4 h-4" />}
              disabled={!isStepComplete(currentStep)} // Use validation function
            >
              Next
            </Button>
           )}
        </div>
      </div>
      
      <footer className="text-center text-sm text-gray-500 mt-8">
        <p>This wizard is designed to help you navigate the Incorporated Societies Act 2022. It does not provide legal advice.</p>
      </footer>
    </div>
  );
};
