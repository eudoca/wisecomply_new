import React, { useState, ReactNode } from 'react';
import { 
  HelpCircle, Info, ChevronDown, ChevronUp, BookOpen, RefreshCw, ShieldCheck, 
  ArrowLeft, ArrowRight, Download, ClipboardList, Flag, Building, Hash, CheckCircle, Clock, AlertTriangle, RefreshCwIcon, GaugeIcon, WandIcon, FileText, Users, UserCog, MessageSquare, Vote, Calendar, Settings, Check, XCircle, Plus, UserCheck, Home, DollarSign, Shield, Briefcase, Lock, FileQuestion, LandPlot, Car, Handshake, User, Database, Banknote
} from 'lucide-react'; // Added more icons

// Import Wizard sub-components
import { Tooltip } from './Tooltip';
import { RadioGroup } from './RadioGroup';
import { Alert } from './Alert';
import { InfoBox } from './InfoBox';
import { Expandable } from './Expandable';
import { Button } from '../ui/Button'; // Import shared Button
import { useNavigate } from 'react-router-dom'; // Import for final navigation

// --- Define NEW formData type --- 
interface WizardFormData {
  // Step 1
  societySetupType?: 'new' | 'reregistering' | 'ongoing' | null;
  proposedName?: string | null;
  // societyId?: string | null; // For future search functionality
  hasTenMembers?: boolean | null;
  isDualRegisteredCharity?: boolean | null; // Changed from isCharity
  isRegisteredCharity?: boolean | null; // New field for charity status
  hasOutstandingObligations?: boolean | null; // New field

  // Step 2
  managesAssets?: boolean | null; // New field
  holdsLicenses?: boolean | null; // New field
  hasGoverningBody?: boolean | null; // New field

  // Step 3
  hasEmployees?: boolean | null; // New field
  managesPersonalInfo?: boolean | null; // Renamed from handlesPersonalInfo
  receivesExternalFunding?: boolean | null; // Renamed from hasExternalFunding

  // Step 4
  hasExistingConstitution?: boolean | null; // New field
}

// --- NEW Step Component Definitions ---

// --- Step 1: Organisation Status and Basic Information ---
interface Step1Props {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}
const Step1OrganisationStatus: React.FC<Step1Props> = ({ formData, updateFormData }) => {
  const handleChange = (name: keyof WizardFormData, value: any) => updateFormData({ [name]: value });
  const handleSelection = (type: 'new' | 'reregistering' | 'ongoing') => updateFormData({ societySetupType: type });
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ proposedName: event.target.value });
  };

  const setupTypes = [
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
         {setupTypes.map(type => (
             <div 
              key={type.id}
              className={`p-6 border-2 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all hover:border-brand-primary hover:transform hover:-translate-y-1 
                ${formData.societySetupType === type.id ? 'border-brand-primary bg-brand-light' : 'border-gray-200'}`}
              onClick={() => handleSelection(type.id as 'new' | 'reregistering' | 'ongoing')}
            >
              <div className="text-brand-primary mb-4">{type.icon}</div>
              <h3 className="font-semibold mb-2">{type.label}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
      </div>

      {/* Conditional Input/Search Placeholder */}
      {formData.societySetupType === 'new' && (
        <div className="mt-6 mb-8 pb-6 border-b border-gray-200">
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

      {(formData.societySetupType === 'reregistering' || formData.societySetupType === 'ongoing') && (
         <div className="mt-6 mb-8 pb-6 border-b border-gray-200 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50 text-center">
            <p className="text-sm text-gray-600">Society Search Functionality (Coming Soon)</p>
             {/* <input type="text" disabled className="mt-2 w-full p-2 border border-gray-200 rounded-md bg-gray-100" placeholder="Search Society Register..." /> */}
          </div>
      )}

      {/* Other Step 1 Questions */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Do you currently have (or will you have) at least 10 members?"
          name="hasTenMembers"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.hasTenMembers}
          onChange={(value) => handleChange('hasTenMembers', value)}
        />
        <p className="mt-1 text-xs text-gray-500">Reference: Incorporated Societies Act 2022, Section 74(1)(a). Legal minimum for incorporation.</p>
        {formData.hasTenMembers === false && (
          <Alert type="warning" message="Your society must have at least 10 members to register or remain compliant under the 2022 Act." />
        )}
      </div>
      
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Are you dual-registered (or planning dual registration) as a charitable trust?"
          name="isDualRegisteredCharity"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.isDualRegisteredCharity}
          onChange={(value) => handleChange('isDualRegisteredCharity', value)}
        />
         <p className="mt-1 text-xs text-gray-500">Reference: Charitable Trusts Act 1957; Incorporated Societies Act 2022, Section 254. Determines dual compliance requirements.</p>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Are you or will you be a registered charity with Charities Services (with tax-exempt status)?"
          name="isRegisteredCharity"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.isRegisteredCharity}
          onChange={(value) => handleChange('isRegisteredCharity', value)}
        />
         <p className="mt-1 text-xs text-gray-500">Reference: Charities Act 2005, Section 13; Income Tax Act 2007, Section CW41. Determines additional charitable compliance obligations.</p>
      </div>
      
      <div>
        <RadioGroup
          label="Do you have outstanding filing or audit obligations currently?"
          name="hasOutstandingObligations"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.hasOutstandingObligations}
          onChange={(value) => handleChange('hasOutstandingObligations', value)}
        />
         <p className="mt-1 text-xs text-gray-500">Reference: Incorporated Societies Act 2022, Section 109 (Annual returns); Charities Act 2005, Section 41.</p>
      </div>
    </div>
  );
};

// --- Step 2: Assets, Licenses, and Regulatory Obligations ---
interface Step2Props {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}
const Step2AssetsLicensesRegulatory: React.FC<Step2Props> = ({ formData, updateFormData }) => {
 const handleChange = (name: keyof WizardFormData, value: any) => updateFormData({ [name]: value });

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Identify key operational aspects related to assets, licenses, and external regulations.
      </p>
      
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Do you currently manage any society assets (property, equipment, significant funds)?"
          name="managesAssets"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.managesAssets}
          onChange={(value) => handleChange('managesAssets', value)}
        />
        <p className="mt-1 text-xs text-gray-500">Reference: Incorporated Societies Act 2022, Sections 107–108 (Asset management requirements).</p>
      </div>
      
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Do you hold any licenses or permits essential for your society's operations?"
          name="holdsLicenses"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.holdsLicenses}
          onChange={(value) => handleChange('holdsLicenses', value)}
        />
        <p className="mt-1 text-xs text-gray-500">(e.g. gambling/raffle licenses, liquor licenses, venue permits)</p>
        <p className="mt-1 text-xs text-gray-500">Reference: Gambling Act 2003 (raffle and gaming licenses); Sale and Supply of Alcohol Act 2012 (club liquor licenses).</p>
      </div>
      
      <div>
        <RadioGroup
          label="Do you have a governing national or regional sports body with which you must comply?"
          name="hasGoverningBody"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.hasGoverningBody}
          onChange={(value) => handleChange('hasGoverningBody', value)}
        />
        <p className="mt-1 text-xs text-gray-500">Reference: Sport NZ guidance on governance, Health and Safety guidelines, and coach accreditation.</p>
      </div>
    </div>
  );
};

// --- Step 3: Employment, Privacy, and Funding ---
interface Step3Props {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}
const Step3EmploymentPrivacyFunding: React.FC<Step3Props> = ({ formData, updateFormData }) => {
 const handleChange = (name: keyof WizardFormData, value: any) => updateFormData({ [name]: value });

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Address compliance areas related to employment, data privacy, and funding sources.
      </p>
      
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Does your society have any employees?"
          name="hasEmployees"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.hasEmployees}
          onChange={(value) => handleChange('hasEmployees', value)}
        />
        <p className="mt-1 text-xs text-gray-500">Reference: Employment Relations Act 2000, Holidays Act 2003, ACC Levies obligations.</p>
      </div>
      
      <div className="mb-6 pb-6 border-b border-gray-200">
        <RadioGroup
          label="Do you collect, hold, or manage personal information (members, volunteers, donors)?"
          name="managesPersonalInfo"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.managesPersonalInfo}
          onChange={(value) => handleChange('managesPersonalInfo', value)}
        />
        <p className="mt-1 text-xs text-gray-500">Reference: Privacy Act 2020, Information Privacy Principles 1–13.</p>
      </div>
      
      <div>
        <RadioGroup
          label="Do you receive funding or grants from councils or other external sources that require specific accountability or reporting?"
          name="receivesExternalFunding"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.receivesExternalFunding}
          onChange={(value) => handleChange('receivesExternalFunding', value)}
        />
        <p className="mt-1 text-xs text-gray-500">Reference: Local Government Act 2002, Grant accountability standards (various local government authorities).</p>
      </div>
    </div>
  );
};

// --- Step 4: Existing Constitution ---
interface Step4Props {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}
const Step4ExistingConstitution: React.FC<Step4Props> = ({ formData, updateFormData }) => {
 const handleChange = (name: keyof WizardFormData, value: any) => updateFormData({ [name]: value });

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Clarify the status of your society's governing document.
      </p>
      
      <div>
        <RadioGroup
          label="Do you have an existing constitution you plan to reuse (fully or partially)?"
          name="hasExistingConstitution"
          options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
          value={formData.hasExistingConstitution}
          onChange={(value) => handleChange('hasExistingConstitution', value)}
        />
        <p className="mt-1 text-xs text-gray-500">Reference: Incorporated Societies Act 2022, Sections 26–29 (Mandatory Constitutional Clauses).</p>
         {formData.hasExistingConstitution === true && formData.societySetupType !== 'ongoing' && (
           <Alert type="info" message="Remember: Even if reusing, your constitution must be reviewed and potentially updated to meet all requirements of the 2022 Act before re-registration." />
         )}
         {formData.hasExistingConstitution === false && formData.societySetupType !== 'ongoing' && (
           <Alert type="warning" message="You will need to adopt a constitution compliant with the 2022 Act to proceed with incorporation or re-registration." />
         )}
      </div>
    </div>
  );
};

// --- Summary Component (Adaptation Needed) ---
// NOTE: This Summary component needs significant adaptation to reflect the new questions and generate relevant action items.
// This is a basic placeholder structure.
interface SummaryProps {
  formData: WizardFormData;
  handleDownloadPlan: () => void;
}
const Summary: React.FC<SummaryProps> = ({ formData, handleDownloadPlan }) => {
  // Placeholder: Logic to analyze formData and generate action items/summary based on NEW questions
  const generateActionItems = () => {
    let items = [];
    if (formData.societySetupType === 'new') items.push({ id: 'setup', text: 'Proceed with new society incorporation process.', priority: 'high', type: 'task' });
    if (formData.societySetupType === 'reregistering') items.push({ id: 'setup', text: 'Proceed with re-registration process under the 2022 Act.', priority: 'high', type: 'task' });
    if (formData.societySetupType === 'ongoing') items.push({ id: 'setup', text: 'Configure ongoing compliance management.', priority: 'medium', type: 'info' });

    if (formData.hasTenMembers === false) items.push({ id: 'members', text: 'Recruit members to meet the minimum requirement of 10.', priority: 'high', type: 'warning' });
    if (formData.isRegisteredCharity === true) items.push({ id: 'charity', text: 'Ensure compliance with both Incorporated Societies Act and Charities Act obligations.', priority: 'medium', type: 'info' });
    // ... Add more logic based on other formData answers ...
    if (!formData.hasExistingConstitution && formData.societySetupType !== 'ongoing') items.push({ id: 'constitution', text: 'Develop a new constitution compliant with the 2022 Act.', priority: 'high', type: 'task' });
     if (formData.hasExistingConstitution && formData.societySetupType !== 'ongoing') items.push({ id: 'constitution_review', text: 'Review and update existing constitution for 2022 Act compliance.', priority: 'high', type: 'task' });


    return items;
  };

  const actionItems = generateActionItems();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Wizard Summary & Next Steps</h2>
      <p className="text-gray-600 mb-6">
        Based on your answers, here's a summary of your situation and potential next steps. You can download this as a basic action plan.
      </p>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-900">Key Information Provided:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
           {/* Display summary points based on formData */}
          <li>Setup Type: {formData.societySetupType || 'Not specified'}</li>
          {formData.proposedName && <li>Proposed Name: {formData.proposedName}</li>}
          <li>Minimum Members: {formData.hasTenMembers === null ? 'Not specified' : formData.hasTenMembers ? 'Yes' : 'No'}</li>
          <li>Registered Charity: {formData.isRegisteredCharity === null ? 'Not specified' : formData.isRegisteredCharity ? 'Yes' : 'No'}</li>
           {/* ... Add more summary points ... */}
          <li>Existing Constitution: {formData.hasExistingConstitution === null ? 'Not specified' : formData.hasExistingConstitution ? 'Yes' : 'No'}</li>
        </ul>
      </div>

       <div className="mb-6">
         <h3 className="text-lg font-medium mb-3 text-gray-900">Generated Action Items:</h3>
         {actionItems.length > 0 ? (
           <ul className="space-y-2">
             {actionItems.map(item => (
               <li key={item.id} className={`p-3 rounded-md text-sm ${
                 item.priority === 'high' ? 'bg-red-50 border border-red-200 text-red-800' : 
                 item.priority === 'medium' ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' : 
                 'bg-blue-50 border border-blue-200 text-blue-800'
               }`}>
                 <span className="font-medium">{item.priority.toUpperCase()}: </span>{item.text}
               </li>
             ))}
           </ul>
         ) : (
           <p className="text-sm text-gray-500">No specific action items generated based on current input.</p>
         )}
       </div>

      <Button 
         onClick={handleDownloadPlan} 
         variant="secondary"
         leftIcon={<Download className="w-4 h-4" />}
       >
        Download Action Plan (Basic)
      </Button>
      <InfoBox 
        title="Next Steps"
        message="This wizard provides initial guidance. Use the generated action items to explore relevant sections of the application for detailed compliance management."
      />
    </div>
  );
};

// --- Main Wizard Component ---
export const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>({}); // Use new interface
  const navigate = useNavigate();

  // --- NEW Step Configuration ---
  const steps = [
    { number: 1, title: 'Organisation Status and Basic Information', icon: UserCheck, component: Step1OrganisationStatus },
    { number: 2, title: 'Assets, Licenses, and Regulatory Obligations', icon: Briefcase, component: Step2AssetsLicensesRegulatory },
    { number: 3, title: 'Employment, Privacy, and Funding', icon: Users, component: Step3EmploymentPrivacyFunding },
    { number: 4, title: 'Existing Constitution', icon: FileQuestion, component: Step4ExistingConstitution },
    { number: 5, title: 'Summary', icon: ClipboardList, component: Summary } // Keep Summary as step 5 conceptually
  ];

  const totalSteps = steps.length -1; // Exclude summary from progress count

  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (isStepComplete(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (!isStepComplete(currentStep)) {
      // Optional: Add user feedback if step is incomplete
      console.warn(`Step ${currentStep} is not complete.`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleDownloadPlan = () => {
    // Basic placeholder for download functionality
    console.log("Downloading action plan...", formData);
    alert("Download functionality is not fully implemented yet.");
    // In a real app, this would generate a PDF or text file
  };

  // --- isStepComplete Logic (Needs update for NEW structure) ---
  const isStepComplete = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        const step1Base = formData.societySetupType !== null && formData.societySetupType !== undefined &&
                          formData.hasTenMembers !== null && formData.hasTenMembers !== undefined &&
                          formData.isDualRegisteredCharity !== null && formData.isDualRegisteredCharity !== undefined &&
                          formData.isRegisteredCharity !== null && formData.isRegisteredCharity !== undefined &&
                          formData.hasOutstandingObligations !== null && formData.hasOutstandingObligations !== undefined;
        if (formData.societySetupType === 'new') {
            return step1Base && !!formData.proposedName;
        }
        // No specific check needed for search placeholder yet
        return step1Base; 
      case 2:
        return formData.managesAssets !== null && formData.managesAssets !== undefined &&
               formData.holdsLicenses !== null && formData.holdsLicenses !== undefined &&
               formData.hasGoverningBody !== null && formData.hasGoverningBody !== undefined;
      case 3:
         return formData.hasEmployees !== null && formData.hasEmployees !== undefined &&
                formData.managesPersonalInfo !== null && formData.managesPersonalInfo !== undefined &&
                formData.receivesExternalFunding !== null && formData.receivesExternalFunding !== undefined;
      case 4:
        return formData.hasExistingConstitution !== null && formData.hasExistingConstitution !== undefined;
      default:
        return false;
    }
  };

  // --- Render Logic ---
  const renderStepContent = () => {
    const StepComponent = steps.find(step => step.number === currentStep)?.component;
    
    if (StepComponent) {
      // Pass handleDownloadPlan only to Summary component
      const props = currentStep === steps.length 
        ? { formData, updateFormData, handleDownloadPlan } 
        : { formData, updateFormData };
      // @ts-ignore // Suppress TS error for mismatched props temporarily
      return <StepComponent {...props} />;
    }
    return <div>Step not found</div>;
  };
  
  const CurrentIcon = steps.find(step => step.number === currentStep)?.icon || HelpCircle;
  const currentTitle = steps.find(step => step.number === currentStep)?.title || 'Wizard Step';

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
        <div className="flex items-center">
          <CurrentIcon className="w-6 h-6 mr-3 text-brand-primary" />
          <h1 className="text-xl font-semibold text-gray-800">{currentTitle}</h1>
        </div>
         {currentStep <= totalSteps && (
           <span className="text-sm font-medium text-gray-500">
             Step {currentStep} of {totalSteps}
           </span>
         )}
      </div>

      {/* Progress Bar */}
       {currentStep <= totalSteps && (
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-2">
             <div 
              className="bg-brand-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
           <div className="flex justify-between text-xs text-gray-500 mt-1">
            {steps.slice(0, totalSteps).map(step => (
               <span key={step.number} className={`w-1/${totalSteps} text-center ${currentStep >= step.number ? 'font-semibold text-brand-primary' : ''}`}>
                 {/* Optionally show step titles below */}
                 {/* {step.title}  */}
               </span>
             ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="mb-8 min-h-[200px]"> 
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button 
          onClick={prevStep} 
          disabled={currentStep === 1}
          variant="outline"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Previous
        </Button>
        
        {currentStep < steps.length ? (
          <Button 
            onClick={nextStep} 
            disabled={!isStepComplete(currentStep)}
            variant="primary"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {currentStep === totalSteps ? 'View Summary' : 'Next'}
          </Button>
        ) : (
          // Optional: Add a button on the summary page to navigate away
           <Button 
             onClick={() => navigate('/dashboard')} // Or appropriate destination
             variant="success"
             rightIcon={<CheckCircle className="w-4 h-4" />}
           >
             Finish & Go to Dashboard
           </Button>
        )}
      </div>
    </div>
  );
};

// Removed old helper data and old step components
