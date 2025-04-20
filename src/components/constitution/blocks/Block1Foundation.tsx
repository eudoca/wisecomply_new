import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { AlertCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { ConstitutionFormData, StepProps } from '../ConstitutionWizard';
import { Tooltip } from '../../ui/Tooltip';
import { RadioGroup } from '../../wizard/RadioGroup';

const standardOfficeMethodText = "The Registered Office of the Society shall be at such place as the Committee determines from time to time, and notified to the Registrar of Incorporated Societies.";

interface Block1Errors extends Partial<Record<keyof ConstitutionFormData, string>> {
    // Specific keys can still be optionally listed for clarity if needed,
    // but Partial<Record<...>> covers all keys from ConstitutionFormData.
    // block1_societyName?: string;
    // block1_societyPurposes?: string; // Corrected typo
    // block1_charitableStatus?: string;
    // block1_meetingLocation?: string;
    // block1_officeMethodText?: string;
    // block1_specifyOfficeMethod?: string; // Added for validation
}

interface Block1Props extends StepProps {
  blockNumber: number;
  onSaveProgress: (blockNumber: number) => void;
}

export const Block1Foundation: React.FC<Block1Props> = ({ formData, updateFormData, onComplete, blockNumber, onSaveProgress }) => {
  const [errors, setErrors] = useState<Block1Errors>({}); // Use Block1Errors type
  // Ensure initial state respects formData or defaults to false/null
  const [specifyOfficeMethod, setSpecifyOfficeMethod] = useState<boolean | null>(
      typeof formData.block1_specifyOfficeMethod === 'boolean' ? formData.block1_specifyOfficeMethod : null
  );

  const validate = (): boolean => {
    const newErrors: Block1Errors = {}; // Use Block1Errors type
    let isValid = true;

    if (!formData.block1_societyName?.trim()) {
      newErrors.block1_societyName = 'Society name is required.';
      isValid = false;
    }
    // Corrected check: formData.block1_societyPurposes
    if (!formData.block1_societyPurposes?.trim()) {
      newErrors.block1_societyPurposes = 'Society purposes are required.'; // Corrected key
      isValid = false;
    }
    if (!formData.block1_charitableStatus) {
      newErrors.block1_charitableStatus = 'Please indicate charitable status.';
      isValid = false;
    } else if (formData.block1_charitableStatus === 'Yes' && !formData.block1_charitablePurposeDetails?.trim()) {
      newErrors.block1_charitablePurposeDetails = 'Details are required if the society has charitable purposes.';
      isValid = false;
    }

    // Validation for block1_specifyOfficeMethod and related fields
    const specifyMethod = formData.block1_specifyOfficeMethod;
    if (specifyMethod === null || specifyMethod === undefined) {
      newErrors.block1_specifyOfficeMethod = 'Please specify how the registered office is determined.';
      isValid = false;
    } else if (specifyMethod === true) {
      if (!formData.block1_officeMethodText?.trim()) {
        newErrors.block1_officeMethodText = 'Please describe the method for determining the office address.';
        isValid = false;
      }
      // If method is specified, meeting location might not be mandatory via this field
      // Depending on requirements, you might remove the check below or keep it.
    } else if (specifyMethod === false) {
       // If method is explicitly NOT specified (false), then meeting location IS mandatory
      if (!formData.block1_meetingLocation?.trim()) {
        newErrors.block1_meetingLocation = 'Meeting location is required when not specifying an office determination method in the rules.';
        isValid = false;
      }
    }

    // General check for meeting location - might be redundant if handled above, adjust based on requirements
    // If the rules *don't* specify the office method (specifyMethod is true), then meeting location is likely determined differently and maybe not mandatory *here*.
    // Let's assume meeting location is always required unless specifyMethod is explicitly TRUE.
    if (specifyMethod !== true && !formData.block1_meetingLocation?.trim()) {
        if (!newErrors.block1_meetingLocation) { // Avoid overwriting more specific error from specifyMethod === false block
            newErrors.block1_meetingLocation = 'Meeting location determination is required.';
            isValid = false;
        }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Combined handler for inputs and textareas
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof ConstitutionFormData, value);
    if (errors[name as keyof ConstitutionFormData]) {
        setErrors(prev => {
            const next = { ...prev };
            delete next[name as keyof ConstitutionFormData]; // Remove the specific error
            return next;
        });
    }
  };

  // Add type hint for value in RadioGroup onChange
  const handleRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
    updateFormData(field, value);
     if (errors[field]) {
        setErrors(prev => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }
  };
  
  // Handler specifically for radio buttons representing Yes/No -> true/false/null
  const handleBooleanRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
    const booleanValue = value === 'Yes' || value === true ? true : value === 'No' || value === false ? false : null;
    updateFormData(field, booleanValue);
     if (errors[field]) {
        setErrors(prev => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }
  };

  // Defined missing handler
  const handleSpecifyOfficeMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setSpecifyOfficeMethod(isChecked); // Update local state for UI control
      updateFormData('block1_specifyOfficeMethod', isChecked); // Update central form data
      if (errors.block1_specifyOfficeMethod) {
          setErrors(prev => {
              const next = { ...prev };
              delete next.block1_specifyOfficeMethod;
              return next;
          });
      }
      // Also clear potential related errors when the choice changes
      if (isChecked && errors.block1_meetingLocation) {
           setErrors(prev => { const next = { ...prev }; delete next.block1_meetingLocation; return next; });
      }
      if (!isChecked && errors.block1_officeMethodText) {
          setErrors(prev => { const next = { ...prev }; delete next.block1_officeMethodText; return next; });
      }
  };

  const handleSave = () => {
    if (validate()) {
      console.log('Block 1 Validated Data:', {
        block1_societyName: formData.block1_societyName,
        block1_societyPurposes: formData.block1_societyPurposes, // Corrected key
        block1_specifyOfficeMethod: formData.block1_specifyOfficeMethod,
        block1_officeMethodText: formData.block1_officeMethodText,
        block1_meetingLocation: formData.block1_meetingLocation,
        block1_charitableStatus: formData.block1_charitableStatus,
        block1_charitablePurposeDetails: formData.block1_charitablePurposeDetails,
      });
      onComplete(blockNumber); // Pass blockNumber
    } else {
      console.log("Block 1 Validation Failed", errors);
    }
  };

  const handleSaveProgressClick = () => {
    console.log('Saving progress for Block 1...');
    // Optional: add validation check before saving progress?
    // if (validate()) { ... } else { show partial errors? }
    onSaveProgress(blockNumber);
  };

  // Basic class names for styling standard HTML elements
  const htmlLabelClass = "block text-sm font-medium text-gray-700 mb-1"; // Renamed for clarity
  const inputClass = "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md";
  const textareaClass = inputClass + " min-h-[80px]"; // Add min-height
  const errorClass = "text-sm text-red-600 mt-1";
  const helpIconClass = "ml-2 text-gray-500 hover:text-gray-700 inline-block align-middle h-4 w-4 cursor-help"; // Adjusted class for help icon
  const taskTitleClass = "text-base font-semibold text-gray-800 mb-3";
  const descriptionClass = "text-sm text-gray-600 mb-4";

  const toggleAccordion = () => {
    // Implementation of toggleAccordion function
  };

  const charityStatusTooltip = "Choosing 'Yes' means the society aims to be registered under the Charities Act 2011. This adds specific requirements, like ensuring purposes are exclusively charitable and adding clauses for asset distribution upon dissolution.";
  const charitablePurposesHelpText = "For guidance on defining charitable purposes, refer to the Charity Commission's guidance (e.g., CC4). Examples: 'Advancement of education', 'Prevention or relief of poverty', 'Advancement of health or the saving of lives'. Purposes must align with categories recognised in the Charities Act.";
  const unincorporatedHelpText = "An unincorporated association is simpler to run but doesn't have separate legal identity. Members can be personally liable. A Charitable Incorporated Organisation (CIO) offers limited liability but has more formal reporting requirements.";

  return (
    <div className="space-y-6">
        {/* Removed H3 heading */}
        {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Foundation & Identity</h3> */}

        {/* Task 1.1: Society Name */}
        {/* Corrected title structure */}
        <div className="flex items-center gap-2 mb-3">
            <label className={taskTitleClass}>1.1 Society Name (Mandatory)</label>
            {/* No tooltip needed here */}
        </div>
        <div className="space-y-2">
            {/* Input needs its own accessible label if the title isn't directly linked */}
            <label htmlFor="block1_societyName" className="sr-only">Society Name</label> {/* Added screen-reader only label */}
            <Input 
              id="block1_societyName" 
              name="block1_societyName"
              value={formData.block1_societyName || ''} 
              onChange={handleInputChange} 
              className={inputClass + (errors.block1_societyName ? ' border-red-500' : '')}
              placeholder="Enter the full proposed name"
            />
            {errors.block1_societyName && <p className={errorClass}>{errors.block1_societyName}</p>}
        </div>

        <hr className="border-gray-200" />

        {/* Task 1.2: Society Purposes */}
        {/* Corrected title structure */}
        <div className="flex items-center gap-2 mb-3">
            <label className={taskTitleClass}>1.2 Society Purposes (Mandatory)</label>
            <Tooltip text="Clearly state the main aims and objectives of the society.">
                <HelpCircle className={helpIconClass} />
            </Tooltip>
        </div>
        <div className="space-y-2">
             <label htmlFor="block1_societyPurposes" className="sr-only">Society Purposes</label> {/* Added screen-reader only label */}
            <textarea 
              id="block1_societyPurposes" 
              name="block1_societyPurposes"
              rows={4} 
              value={formData.block1_societyPurposes || ''} 
              onChange={handleInputChange} 
              className={textareaClass + (errors.block1_societyPurposes ? ' border-red-500' : '')}
              placeholder="e.g., To promote amateur football in the region..."
            />
            {errors.block1_societyPurposes && <p className={errorClass}>{errors.block1_societyPurposes}</p>}
        </div>

        <hr className="border-gray-200" />

        {/* Task 1.3: Charitable Status */}
         {/* Corrected title structure */}
        <div className="flex items-center gap-2 mb-3">
            <label className={taskTitleClass}>1.3 Charitable Status (Mandatory)</label>
             <Tooltip text={charityStatusTooltip}>
                 <HelpCircle className={helpIconClass} />
             </Tooltip>
        </div>
        <div className="space-y-3">
             <RadioGroup 
                 label="Is the society intended to be charitable?"
                 name="block1_charitableStatus" 
                 options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]} 
                 value={formData.block1_charitableStatus} 
                 onChange={(value: string | number | boolean) => handleRadioChange('block1_charitableStatus', value as string)}
             />
            {/* Conditional input for charitable details */} 
            {formData.block1_charitableStatus === 'Yes' && (
                <div className="pl-6 space-y-2">
                    <label htmlFor="block1_charitablePurposeDetails" className={htmlLabelClass}> 
                        Specify Charitable Purpose Details <span className="text-red-500">*</span> 
                        <Tooltip text={charitablePurposesHelpText}> 
                            <HelpCircle className={helpIconClass} /> 
                        </Tooltip> 
                    </label> 
                     <textarea 
                         id="block1_charitablePurposeDetails" 
                         name="block1_charitablePurposeDetails" 
                         rows={3} 
                         value={formData.block1_charitablePurposeDetails || ''} 
                         onChange={handleInputChange} 
                         className={textareaClass + (errors.block1_charitablePurposeDetails ? ' border-red-500' : '')} 
                         placeholder="Describe how the purposes align with charitable aims..." 
                     /> 
                     {errors.block1_charitablePurposeDetails && <p className={errorClass}>{errors.block1_charitablePurposeDetails}</p>} 
                </div> 
            )}
            {/* Display general error for the RadioGroup separately */} 
            {errors.block1_charitableStatus && <p className={errorClass}>{errors.block1_charitableStatus}</p>} 

        </div>

        <hr className="border-gray-200" />

        {/* Task 1.4: Registered Office / Meeting Location */}
        {/* Corrected title structure */}
        <div className="flex items-center gap-2 mb-3">
            <label className={taskTitleClass}>1.4 Registered Office & Meetings (Mandatory)</label>
            <Tooltip text="Define how the society determines its official address and where meetings can occur.">
                 <HelpCircle className={helpIconClass} />
            </Tooltip>
        </div>
        <div className="space-y-3">
            <p className={descriptionClass}>The Act requires rules about the registered office (Act s27(1)(a)). You can either specify the exact method in the rules or state how meetings will generally occur if the office is determined by the Committee.</p>

            <RadioGroup 
                 label="Specify the method for determining the registered office in the rules?"
                 name="block1_specifyOfficeMethod" 
                 options={[
                     { value: true, label: 'Yes, specify the method in the rules (editable below)' }, 
                     { value: false, label: 'No, the Committee will determine it (use standard text)' } 
                 ]} 
                 value={formData.block1_specifyOfficeMethod}
                 onChange={(value: string | number | boolean) => handleBooleanRadioChange('block1_specifyOfficeMethod', value)}
             />
             {/* Display general error for the RadioGroup separately */} 
              {errors.block1_specifyOfficeMethod && <p className={errorClass}>{errors.block1_specifyOfficeMethod}</p>} 

            {/* Conditional sections based on the radio selection */} 
            {formData.block1_specifyOfficeMethod === true && (
                <div className="pl-6 space-y-2">
                    <label htmlFor="block1_officeMethodText" className={htmlLabelClass}> 
                        Describe Method for Office Address <span className="text-red-500">*</span> 
                    </label> 
                    <textarea 
                        id="block1_officeMethodText" 
                        name="block1_officeMethodText"
                        rows={2} 
                        value={formData.block1_officeMethodText || ''} 
                        onChange={handleInputChange} 
                        className={textareaClass + (errors.block1_officeMethodText ? ' border-red-500' : '')} 
                        placeholder="e.g., The Registered Office shall be at the Secretary's residence..."
                    />
                    {errors.block1_officeMethodText && <p className={errorClass}>{errors.block1_officeMethodText}</p>}
                </div>
            )}
            {formData.block1_specifyOfficeMethod === false && (
                <div className="pl-6 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                    <p>Standard Clause: &quot;{standardOfficeMethodText}&quot;</p>
                </div>
            )}

            {/* Meeting Location Input - Potentially always show or conditionally based on office method choice */} 
            <div className="pt-3 border-t border-gray-100 space-y-2">
                <label htmlFor="block1_meetingLocation" className={htmlLabelClass}> 
                    How is the place for General Meetings determined? {formData.block1_specifyOfficeMethod !== true && <span className="text-red-500">*</span>} 
                     <Tooltip text="Where will general meetings (like AGMs) typically be held? e.g., Specific venue, location decided by committee, online."> 
                         <HelpCircle className={helpIconClass} /> 
                     </Tooltip> 
                </label> 
                 <textarea 
                     id="block1_meetingLocation" 
                     name="block1_meetingLocation"
                     rows={2} 
                     value={formData.block1_meetingLocation || ''} 
                     onChange={handleInputChange} 
                     className={textareaClass + (errors.block1_meetingLocation ? ' border-red-500' : '')} 
                     placeholder="e.g., At the Society's clubrooms, or another place decided by the Committee..."
                 />
                 {errors.block1_meetingLocation && <p className={errorClass}>{errors.block1_meetingLocation}</p>}
            </div>

        </div>

        {/* Action Buttons - Positioning remains relative to this top-level div */}
        <div className="flex justify-end space-x-3 pt-6">
            <Button variant="secondary" onClick={handleSaveProgressClick}>Save Progress</Button>
            <Button onClick={handleSave}>Mark as Complete</Button>
        </div>
    </div>
  );
};

export default Block1Foundation; 