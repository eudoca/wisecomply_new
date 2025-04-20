import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HelpCircle } from 'lucide-react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';
import { cn } from '../../../utils/cn';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Standard Tailwind classes
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
// const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"; // Removed unused
const htmlLabelClass = "block text-sm font-medium text-gray-700 mb-1";
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1";
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3";
const errorClass = "mt-1 text-xs text-red-600";
const helpIconClass = "ml-2 text-gray-500 hover:text-gray-700 inline-block align-middle h-4 w-4 cursor-help";
const requiredMarker = <span className="text-red-500">*</span>;

// Define the props for the component
interface Block9DissolutionProps extends StepProps {
    blockNumber: number;
    onSaveProgress: (blockNumber: number) => void;
}

// Define Tooltips specific to Block 9 - Using correct field names where possible
const TOOLTIPS = {
    block9_dissolutionTrigger: "What initiates the process to close down (dissolve) the society? (Ref: Act s210-233, s27(1)(q))",
    block9_dissolutionMemberRequest: "Specify the required number or percentage of members if members can trigger dissolution.",
    block9_dissolutionMeetingType: "Which type of general meeting is required to pass the resolution to dissolve the society?",
    block9_dissolutionVoteThreshold: "What voting majority is needed to pass the resolution for dissolution? Often higher than normal.",
    block9_dissolutionQuorumOverride: "Specify a specific quorum for the dissolution meeting, or leave blank to use the standard GM quorum.",
    block5_windingUpDistribution: "How will any remaining assets (money, property) be distributed after debts are paid? Must go to another not-for-profit organisation with similar purposes. (Ref: Act s27(1)(r))",
    block5_windingUpDistributionOther: "If specifying an alternative distribution method, detail it here.",
    block9_recordsCustody: "Who will be responsible for the society's records after dissolution, and for how long? The Act may specify minimum periods.",
};

// Standard Texts
// const standardDissolutionProcedure = "By resolution passed by the majority specified below at a General Meeting convened for that purpose."; // Removed unused
// const standardSurplusDistribution = "To another incorporated society or charitable organisation within New Zealand with similar purposes, as determined by the members at the final General Meeting."; // Removed unused

export const Block9Dissolution: React.FC<Block9DissolutionProps> = ({
    formData,
    updateFormData,
    onComplete,
    blockNumber,
    onSaveProgress,
}) => {
    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    // Updated Validation function for Block 9 using correct field names
    const validateBlock9 = useCallback((data: ConstitutionFormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};

        // Task 9.1 Validation (Procedure)
        if (!data.block9_dissolutionTrigger) {
            newErrors.block9_dissolutionTrigger = 'Please specify how dissolution can be triggered.';
        }
        if (data.block9_dissolutionTrigger === 'member_request') {
            const percent = data.block9_dissolutionMemberRequestPercent;
            const number = data.block9_dissolutionMemberRequestNumber;
            if ((percent === null || percent === undefined || percent <= 0) && (number === null || number === undefined || number <= 0)) {
                 newErrors.block9_dissolutionMemberRequestPercent = 'Please specify a valid percentage or number of members.';
                 newErrors.block9_dissolutionMemberRequestNumber = 'Please specify a valid percentage or number of members.'; // Show error on both fields
            } else if (percent !== null && percent !== undefined && (percent <= 0 || percent > 100)) {
                 newErrors.block9_dissolutionMemberRequestPercent = 'Percentage must be between 1 and 100.';
            } else if (number !== null && number !== undefined && number <= 0) {
                 newErrors.block9_dissolutionMemberRequestNumber = 'Number must be greater than 0.';
            }
        }
        if (!data.block9_dissolutionMeetingType) {
            newErrors.block9_dissolutionMeetingType = 'Please specify the meeting type for the dissolution vote.';
        }
        if (!data.block9_dissolutionVoteThreshold) {
            newErrors.block9_dissolutionVoteThreshold = 'Please specify the voting threshold required for dissolution.';
        }
         // Validate quorum override only if type is selected
        if (data.block9_dissolutionQuorumType) {
            const quorumValue = data.block9_dissolutionQuorumValue;
             if (quorumValue === null || quorumValue === undefined || quorumValue <= 0) {
                 newErrors.block9_dissolutionQuorumValue = 'Please specify a valid quorum value.';
             } else if (data.block9_dissolutionQuorumType === 'percentage' && quorumValue > 100) {
                 newErrors.block9_dissolutionQuorumValue = 'Quorum percentage cannot exceed 100.';
             }
         }

        // Task 9.2 Validation (Surplus Distribution - uses block 5 keys)
        if (!data.block5_windingUpDistribution) {
             newErrors.block5_windingUpDistribution = 'Please specify how surplus assets will be distributed.';
        } else if (data.block5_windingUpDistribution === 'Other (specify)' && !data.block5_windingUpDistributionOther?.trim()) {
            newErrors.block5_windingUpDistributionOther = 'Please specify the other distribution method.';
        }

        // Task 9.3 Validation (Records Custody)
        if (!data.block9_recordsCustody?.trim()) {
            newErrors.block9_recordsCustody = 'Please specify who will manage the records after dissolution.';
        }

        return newErrors;
    }, []);

    useEffect(() => {
        const validationErrors = validateBlock9(formData);
        setLocalErrors(validationErrors);
    }, [formData, validateBlock9]);

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: any = value;
        if (type === 'number') {
            processedValue = value === '' ? null : Number(value);
            // Basic range checks are handled in validation now
            if (processedValue !== null && processedValue < 0) processedValue = 0; // Prevent negatives
        }
        updateFormData(name as keyof ConstitutionFormData, processedValue);
        if (localErrors[name as keyof ConstitutionFormData]) {
            setLocalErrors(prev => { const next = {...prev}; delete next[name as keyof ConstitutionFormData]; return next; });
        }
        // Clear related errors if changing trigger type
        if (name === 'block9_dissolutionTrigger') {
            setLocalErrors(prev => {
                const next = {...prev};
                delete next.block9_dissolutionMemberRequestPercent;
                delete next.block9_dissolutionMemberRequestNumber;
                return next;
            });
        }
         // Clear quorum value error if type changes
        if (name === 'block9_dissolutionQuorumType') {
             setLocalErrors(prev => { const next = {...prev}; delete next.block9_dissolutionQuorumValue; return next; });
         }
         // Clear 'Other' text field if the main select changes
        if (name === 'block5_windingUpDistribution' && value !== 'Other (specify)') {
            updateFormData('block5_windingUpDistributionOther', '');
            if (localErrors.block5_windingUpDistributionOther) {
               setLocalErrors(prev => { const next = {...prev}; delete next.block5_windingUpDistributionOther; return next; });
           }
       }
    };

    // Updated handler for RadioGroup value changes
    const handleRadioValueChange = (field: keyof ConstitutionFormData, value: string) => {
      // Currently, no boolean fields in Block 9 RadioGroups, only strings
      // If boolean fields are added later, adapt logic like in Block 4/7
      let processedValue: string | number | boolean | null = value;

      // Clear conditional member request fields if trigger changes
      if (field === 'block9_dissolutionTrigger' && value !== 'member_request') {
          updateFormData('block9_dissolutionMemberRequestPercent', null);
          updateFormData('block9_dissolutionMemberRequestNumber', null);
           setLocalErrors(prev => {
               const next = {...prev};
               delete next.block9_dissolutionMemberRequestPercent;
               delete next.block9_dissolutionMemberRequestNumber;
               return next;
           });
      }
       // Clear quorum value if type is deselected (set to null/empty string)
       if (field === 'block9_dissolutionQuorumType' && !value) {
           updateFormData('block9_dissolutionQuorumValue', null);
           setLocalErrors(prev => { const next = {...prev}; delete next.block9_dissolutionQuorumValue; return next; });
       }

      updateFormData(field, processedValue);

      if (localErrors[field]) {
           setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
      }
    };

    const handleSave = () => {
        const validationErrors = validateBlock9(formData);
        setLocalErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Block 9 Validation Passed');
            onComplete(blockNumber);
        } else {
            console.log('Block 9 Validation Failed', validationErrors);
        }
    };

    // --- Render Helpers (Adapted) ---

    const renderInput = (id: keyof ConstitutionFormData, labelText: string, type: string = 'text', required: boolean = true, tooltipText?: string, placeholder?: string, className?: string, min?: number, max?: number, step?: number) => (
        <div className={cn("mb-4", className)}>
            <label htmlFor={id as string} className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            <Input
                id={id as string}
                name={id as string}
                type={type}
                value={(formData[id] as string | number) ?? ''}
                onChange={handleInputChange}
                className={cn(baseInputClasses, localErrors[id] ? 'border-red-500' : 'border-gray-300')}
                placeholder={placeholder}
                min={min}
                max={max} // Added max attribute for percentage inputs
                step={step}
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    const renderRadioGroup = (id: keyof ConstitutionFormData, labelText: string, options: { value: string | number | boolean; label: string }[], required: boolean = true, tooltipText?: string) => (
        <div className="mb-4">
            <label className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            <RadioGroup
                name={id as string}
                value={formData[id] as string | undefined ?? ''}
                onValueChange={(value) => handleRadioValueChange(id, value)}
                className="space-y-2 mt-2"
            >
                {options.map(option => (
                    <div key={option.value.toString()} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value.toString()} id={`${id}-${option.value.toString()}`} />
                        <Label htmlFor={`${id}-${option.value.toString()}`}>{option.label}</Label>
                    </div>
                ))}
            </RadioGroup>
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    const renderSelect = (id: keyof ConstitutionFormData, labelText: string, options: { value: string; label: string }[], required: boolean = true, tooltipText?: string, placeholder: string = 'Select an option') => (
        <div className="mb-4">
            <label htmlFor={id as string} className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            <select
                id={id as string}
                name={id as string}
                value={(formData[id] as string) ?? ''}
                onChange={handleInputChange} // Use standard input handler
                className={cn(baseInputClasses, localErrors[id] ? 'border-red-500' : 'border-gray-300')}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    const renderTextArea = (id: keyof ConstitutionFormData, labelText: string, required: boolean = true, tooltipText?: string, placeholder?: string, rows: number = 4) => (
        <div className="mb-4">
            <label htmlFor={id as string} className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            <textarea
                id={id as string}
                name={id as string}
                rows={rows}
                value={(formData[id] as string) ?? ''}
                onChange={handleInputChange}
                className={cn(baseInputClasses, localErrors[id] ? 'border-red-500' : 'border-gray-300')}
                placeholder={placeholder ?? 'Provide details here...'}
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    // --- Main Component Return (Flattened Structure) ---
    return (
        <div className="space-y-6"> {/* Main container - No extra wrappers */}
            {/* Removed H3 heading */}
            {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Dissolution (Winding Up)</h3> */}

            {/* Task 9.1: Dissolution Procedure */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>9.1 Dissolution Procedure (Mandatory)</label>
                    <Tooltip text={TOOLTIPS.block9_dissolutionTrigger}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                 <p className={descriptionClass}>Define the process for formally closing down the society.</p>
                <div className="space-y-4">
                    {renderRadioGroup('block9_dissolutionTrigger', 'How is the process to dissolve the society started?', [
                        { value: 'committee_recommendation', label: 'Recommendation by the Committee (to be approved at GM)' },
                        { value: 'member_request', label: 'Request by Members (Specify number/percentage below)' },
                        // { value: 'specific_event', label: 'Occurrence of a Specific Event (Describe)' } // Add if needed
                    ], true, TOOLTIPS.block9_dissolutionTrigger)}

                    {/* Conditional inputs for member request */}
                    {formData.block9_dissolutionTrigger === 'member_request' && (
                         <div className="pl-4 border-l-2 border-gray-200 space-y-2 pt-2">
                            <label className={htmlLabelClass}>Member Request Threshold
                                <Tooltip text={TOOLTIPS.block9_dissolutionMemberRequest}><HelpCircle className={helpIconClass} /></Tooltip>
                            </label>
                            <div className="flex space-x-4 items-start">
                                {renderInput('block9_dissolutionMemberRequestPercent', 'Required Percentage (%)', 'number', false, undefined, 'e.g., 10', 'w-1/2', 1, 100)}
                                <span className="pt-2">OR</span>
                                {renderInput('block9_dissolutionMemberRequestNumber', 'Required Number', 'number', false, undefined, 'e.g., 20', 'w-1/2', 1)}
                             </div>
                             {/* Show combined error message */}
                             {(localErrors.block9_dissolutionMemberRequestPercent || localErrors.block9_dissolutionMemberRequestNumber) && !formData.block9_dissolutionMemberRequestPercent && !formData.block9_dissolutionMemberRequestNumber &&
                                 <p className={errorClass}>Please enter either a percentage or a fixed number of members.</p>
                             }
                         </div>
                    )}

                    {renderSelect('block9_dissolutionMeetingType', 'Which meeting type votes on dissolution?', [
                        { value: 'SGM', label: 'Special General Meeting (SGM)' },
                        { value: 'AGM', label: 'Annual General Meeting (AGM)' }
                    ], true, TOOLTIPS.block9_dissolutionMeetingType)}

                    {renderSelect('block9_dissolutionVoteThreshold', 'What voting majority is required?', [
                         { value: 'simple_majority', label: 'Simple Majority (>50%)' },
                         { value: 'two_thirds', label: 'Two-Thirds Majority (>=66.7%)' },
                         { value: 'three_quarters', label: 'Three-Quarters Majority (>=75%)' },
                         { value: 'unanimous', label: 'Unanimous Consent (100%)' }
                     ], true, TOOLTIPS.block9_dissolutionVoteThreshold)}

                    {/* Optional Quorum Override */}
                     <div className="pt-4 border-t border-gray-100">
                        <label className={htmlLabelClass}>Dissolution Meeting Quorum (Optional Override)
                            <Tooltip text={TOOLTIPS.block9_dissolutionQuorumOverride}><HelpCircle className={helpIconClass} /></Tooltip>
                        </label>
                        <p className="text-xs text-gray-500 mb-2">Leave blank to use the standard General Meeting quorum defined in Block 4.</p>
                        <div className="flex space-x-4 items-end">
                             {renderSelect('block9_dissolutionQuorumType', 'Quorum Basis', [
                                 { value: '', label: 'Use Standard GM Quorum' },
                                 { value: 'percentage', label: 'Percentage of Members' },
                                 { value: 'number', label: 'Fixed Number of Members' }
                             ], false, undefined, 'Use Standard GM Quorum')}

                             {formData.block9_dissolutionQuorumType && (
                                 renderInput('block9_dissolutionQuorumValue', 'Quorum Value', 'number', true, undefined,
                                     formData.block9_dissolutionQuorumType === 'percentage' ? 'e.g., 50' : 'e.g., 15',
                                     'w-1/2', 1, formData.block9_dissolutionQuorumType === 'percentage' ? 100 : undefined)
                             )}
                         </div>
                         {localErrors.block9_dissolutionQuorumValue && <p className={errorClass}>{localErrors.block9_dissolutionQuorumValue}</p>}
                     </div>
                </div>
            </div>

            <hr className="border-gray-200" /> {/* Separator */}

            {/* Task 9.2: Distribution of Surplus Assets */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>9.2 Distribution of Surplus Assets (Mandatory)</label>
                    <Tooltip text={TOOLTIPS.block5_windingUpDistribution}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <p className={descriptionClass}>Specify where any remaining assets go after the society is dissolved and debts are paid. Assets cannot be distributed to members.</p>
                <div className="space-y-4">
                     {renderSelect('block5_windingUpDistribution', 'How should surplus assets be distributed?', [
                        { value: 'similar_purposes_org', label: 'To another incorporated society or charitable organisation with similar purposes' },
                        { value: 'specified_org', label: 'To a specifically named organisation (Specify below)' },
                        { value: 'Other (specify)', label: 'Other (Specify details below)' }
                    ], true, TOOLTIPS.block5_windingUpDistribution)}

                    {(formData.block5_windingUpDistribution === 'specified_org' || formData.block5_windingUpDistribution === 'Other (specify)') && (
                        renderTextArea('block5_windingUpDistributionOther',
                             formData.block5_windingUpDistribution === 'specified_org' ? 'Specify Organisation Name(s)' : 'Specify Other Distribution Method/Recipient',
                             true,
                             TOOLTIPS.block5_windingUpDistributionOther,
                             formData.block5_windingUpDistribution === 'specified_org' ? 'Enter name(s)...' : 'Describe recipient/method...', 3)
                    )}
                     {localErrors.block5_windingUpDistribution && <p className={errorClass}>{localErrors.block5_windingUpDistribution}</p>}
                     {localErrors.block5_windingUpDistributionOther && <p className={errorClass}>{localErrors.block5_windingUpDistributionOther}</p>}
                </div>
            </div>

            <hr className="border-gray-200" /> {/* Separator */}

            {/* Task 9.3: Custody of Records */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>9.3 Custody of Records (Mandatory)</label>
                    <Tooltip text={TOOLTIPS.block9_recordsCustody}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                 <p className={descriptionClass}>Specify who will hold the society's records after it closes and for how long (refer to the Act for requirements).</p>
                <div className="space-y-4">
                    {renderTextArea(
                        'block9_recordsCustody', // Use the newly added field name
                        'Arrangements for Records After Dissolution',
                        true,
                        TOOLTIPS.block9_recordsCustody,
                        'e.g., The final Secretary shall retain the records for 7 years, then arrange for their secure destruction or transfer to an archive.',
                        3
                    )}
                </div>
            </div>

            {/* Action Buttons - remain at the end */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button variant="secondary" onClick={() => onSaveProgress(blockNumber)}>Save Progress</Button>
                <Button onClick={handleSave}>Mark as Complete</Button>
            </div>
        </div>
    );
};

export default Block9Dissolution; 