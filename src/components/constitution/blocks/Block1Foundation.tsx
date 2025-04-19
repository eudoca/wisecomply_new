import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { AlertCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { ConstitutionFormData, StepProps } from '../ConstitutionWizard';

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

  // Handler specifically for radio buttons that represent string values
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof ConstitutionFormData, value);
     if (errors[name as keyof ConstitutionFormData]) {
        setErrors(prev => {
            const next = { ...prev };
            delete next[name as keyof ConstitutionFormData];
            return next;
        });
    }
  };

  // Handler specifically for radio buttons representing Yes/No -> true/false/null
  const handleBooleanRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const booleanValue = value === 'Yes' || value === 'true' ? true : value === 'No' || value === 'false' ? false : null;
    updateFormData(name as keyof ConstitutionFormData, booleanValue);
     if (errors[name as keyof ConstitutionFormData]) {
        setErrors(prev => {
            const next = { ...prev };
            delete next[name as keyof ConstitutionFormData];
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
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass = "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md";
  const textareaClass = inputClass + " min-h-[80px]"; // Add min-height
  const radioLabelClass = "ml-2 block text-sm text-gray-900";
  const errorClass = "text-sm text-red-600 mt-1";
  const helpIconClass = "ml-2 text-gray-500 hover:text-gray-700 inline-block align-middle"; // Class for help icon

  return (
    <div className="space-y-6">
      {/* Task 1.1: Society Name */}
      <div className="space-y-1">
        <label htmlFor="block1_societyName" className={labelClass}>1.1 What is the proposed name of the society?</label>
        <Input // Assuming Input component exists and works
          id="block1_societyName"
          name="block1_societyName"
          value={formData.block1_societyName || ''}
          onChange={handleInputChange}
          maxLength={100}
          className={inputClass} // Apply base class
          aria-invalid={!!errors.block1_societyName}
          aria-describedby={errors.block1_societyName ? "block1_societyName_error" : undefined}
        />
        {errors.block1_societyName && <p id="block1_societyName_error" className={errorClass}>{errors.block1_societyName}</p>}
      </div>

      {/* Task 1.2: Society Purpose */}
      <div className="space-y-1">
        {/* Use standard label */}
        <label htmlFor="block1_societyPurposes" className={labelClass}>1.2 What is the purpose of the society?</label>
        {/* Use standard textarea */}
        <textarea
          id="block1_societyPurposes" // Corrected ID
          name="block1_societyPurposes" // Corrected name
          value={formData.block1_societyPurposes || ''} // Corrected value access
          onChange={handleInputChange}
          rows={4}
          maxLength={500}
          className={textareaClass} // Use standard class
          aria-describedby={errors.block1_societyPurposes ? "societyPurposeError" : undefined}
        />
        <p className="text-sm text-gray-500">Describe the main aims and objectives (max 500 characters).</p>
        {/* Corrected error check */}
        {errors.block1_societyPurposes && <p id="societyPurposeError" className={errorClass}>{errors.block1_societyPurposes}</p>}
      </div>

      {/* Task 1.3: Charitable Status */}
      <div className="space-y-2">
          {/* Use standard label */}
          <label className={labelClass}>
              1.3 Is the society intended to be charitable?
              {/* Basic Tooltip Placeholder (no functionality) */}
              <span title="Charitable status may affect registration requirements and tax obligations.">
                  <HelpCircle size={16} className={helpIconClass} />
              </span>
          </label>
          {/* Use standard radio buttons */}
          <div role="radiogroup" aria-labelledby="charitableStatusLabel">
              <div className="flex items-center mb-1">
                  <input
                      type="radio"
                      id="charityYes"
                      name="block1_charitableStatus"
                      value="Yes"
                      checked={formData.block1_charitableStatus === 'Yes'}
                      onChange={handleRadioChange} // Use specific handler for string radios
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="charityYes" className={radioLabelClass}>Yes</label>
              </div>
              <div className="flex items-center">
                  <input
                      type="radio"
                      id="charityNo"
                      name="block1_charitableStatus"
                      value="No"
                      checked={formData.block1_charitableStatus === 'No'}
                      onChange={handleRadioChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="charityNo" className={radioLabelClass}>No</label>
              </div>
          </div>
          {errors.block1_charitableStatus && <p id="charitableStatusError" className={errorClass}>{errors.block1_charitableStatus}</p>}
          {formData.block1_charitableStatus === 'Yes' && (
             <div className="space-y-1 mt-2">
                  {/* Use standard label */}
                  <label htmlFor="block1_charitablePurposeDetails" className={labelClass}>Please provide details on the charitable purpose:</label>
                  {/* Use standard textarea */}
                  <textarea
                      id="block1_charitablePurposeDetails"
                      name="block1_charitablePurposeDetails"
                      value={formData.block1_charitablePurposeDetails || ''}
                      onChange={handleInputChange}
                      rows={3}
                      maxLength={300}
                      className={textareaClass} // Apply standard class
                  />
                  {errors.block1_charitablePurposeDetails && <p className={errorClass}>{errors.block1_charitablePurposeDetails}</p>}
              </div>
           )}
      </div>

      {/* Task 1.4: Location of Meetings */}
      <div className="space-y-2">
        {/* Use standard label */}
        <label className={labelClass}>
            1.4 How will the location of general meetings be determined?
            {/* Basic Tooltip Placeholder */}
            <span title="Choose how meeting locations will be decided (e.g., fixed location, rotating, decided by committee).">
               <HelpCircle size={16} className={helpIconClass} />
            </span>
        </label>
        {/* Use standard radio buttons */}
         <div role="radiogroup">
             <div className="flex items-center mb-1">
                 <input type="radio" id="locCommittee" name="block1_meetingLocation" value="committee_decision" checked={formData.block1_meetingLocation === 'committee_decision'} onChange={handleRadioChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                 <label htmlFor="locCommittee" className={radioLabelClass}>Determined by the committee before each meeting</label>
             </div>
             <div className="flex items-center mb-1">
                 <input type="radio" id="locSpecified" name="block1_meetingLocation" value="specified_address" checked={formData.block1_meetingLocation === 'specified_address'} onChange={handleRadioChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                 <label htmlFor="locSpecified" className={radioLabelClass}>Specified address (requires rule amendment to change)</label>
             </div>
             <div className="flex items-center">
                 <input type="radio" id="locRotating" name="block1_meetingLocation" value="rotating_locations" checked={formData.block1_meetingLocation === 'rotating_locations'} onChange={handleRadioChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                 <label htmlFor="locRotating" className={radioLabelClass}>Rotating between pre-agreed locations</label>
             </div>
        </div>
        {errors.block1_meetingLocation && <p id="meetingLocationError" className={errorClass}>{errors.block1_meetingLocation}</p>}
      </div>

      {/* Task 1.5: Registered Office */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
           {/* Use standard checkbox */}
           <input
             type="checkbox"
             id="specifyOfficeMethod"
             name="block1_specifyOfficeMethod" // Add name for potential form submission if needed
             checked={!!specifyOfficeMethod} // Use local state for checked status
             onChange={handleSpecifyOfficeMethodChange} // Use defined handler
             className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
             aria-describedby={errors.block1_specifyOfficeMethod ? "officeMethodError" : undefined}
           />
           {/* Use standard label */}
           <label htmlFor="specifyOfficeMethod" className="text-sm font-medium text-gray-700">
               1.5 Specify the method for determining the registered office location?
                {/* Basic Tooltip Placeholder */}
               <span title="If unchecked, the constitution won't specify how the office location is decided, allowing flexibility.">
                  <HelpCircle size={16} className={helpIconClass} />
               </span>
           </label>
        </div>
         {errors.block1_specifyOfficeMethod && <p id="officeMethodError" className={errorClass}>{errors.block1_specifyOfficeMethod}</p>}

        {specifyOfficeMethod && (
          <div className="pl-6 space-y-1">
            {/* Use standard label */}
            <label htmlFor="block1_officeMethodText" className={labelClass}>Method for determining registered office:</label>
            {/* Use standard textarea */}
            <textarea
              id="block1_officeMethodText"
              name="block1_officeMethodText"
              value={formData.block1_officeMethodText || standardOfficeMethodText} // Default to standard text?
              onChange={handleInputChange}
              rows={3}
              maxLength={300}
              className={textareaClass} // Apply standard class
              aria-describedby={errors.block1_officeMethodText ? "officeMethodTextError" : undefined}
            />
             <p className="text-sm text-gray-500">Describe how the registered office location will be decided (max 300 characters).</p>
            {errors.block1_officeMethodText && <p id="officeMethodTextError" className={errorClass}>{errors.block1_officeMethodText}</p>}
          </div>
        )}
      </div>

      {/* Save Buttons */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="secondary" onClick={handleSaveProgressClick}>Save Progress</Button>
          <Button onClick={handleSave}>Mark as Complete</Button>
      </div>

      {/* Use basic div for validation summary */}
      {Object.keys(errors).length > 0 && (
            <div className="p-4 border border-red-400 bg-red-50 rounded-md mt-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                         <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Validation Errors</h3>
                        <div className="mt-2 text-sm text-red-700">
                             <p>Please correct the highlighted fields before marking this section as complete.</p>
                             {/* Optionally list errors: */}
                             {/* <ul role="list" className="list-disc pl-5 space-y-1">
                                {Object.entries(errors).map(([key, msg]) => msg ? <li key={key}>{msg}</li> : null)}
                             </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
};

export default Block1Foundation; 