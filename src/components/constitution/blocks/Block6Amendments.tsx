import React, { useState, useCallback, useEffect } from 'react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';
import { InfoIcon, HelpCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

// Shadcn UI Imports (Standardized)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip } from '../../wizard/Tooltip';
import { Label } from '@/components/ui/label';
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroup } from '../../wizard/RadioGroup';

// Standard Tailwind classes
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";
const htmlLabelClass = "block text-sm font-medium text-gray-700 mb-1";
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1";
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3";
const errorClass = "mt-1 text-xs text-red-600";
const helpIconClass = "ml-2 text-gray-500 hover:text-gray-700 inline-block align-middle h-4 w-4 cursor-help";
const requiredMarker = <span className="text-red-500">*</span>;

// Define the props for the component
interface Block6AmendmentsProps extends StepProps {
    blockNumber: number;
    onSaveProgress: (blockNumber: number) => void;
}

// Define Tooltips specific to Block 6
const TOOLTIPS = {
    block6_amendmentProcedure: "How can the constitution be changed? Usually requires a high majority (e.g., two-thirds) at a General Meeting. Ref: Act s32-s34",
    block6_commonSealCustody: "If using a seal, who looks after it? Often the Secretary.",
    block6_commonSealUse: "If using a seal, how is its use authorised? Often by Committee resolution.",
    block6_committeeCanMakeBylaws: "Can the Committee create bylaws (rules for specific operational matters, not conflicting with the constitution)?",
    block6_bylawProcedure: "How are bylaws made, changed, or repealed? Specify the process.",
};

export const Block6Amendments: React.FC<Block6AmendmentsProps> = ({
    formData,
    updateFormData,
    onComplete,
    blockNumber,
    onSaveProgress,
}) => {

    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    // Updated Validation function for Block 6
    const validateBlock6 = useCallback((currentFormData: ConstitutionFormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};
        
        // Task 6.1 Validation
        if (!currentFormData.block6_amendmentProcedure) {
            newErrors.block6_amendmentProcedure = 'Amendment procedure is required.';
        } else if (currentFormData.block6_amendmentProcedure === 'Other (specify)' && !currentFormData.block6_amendmentProcedureOther?.trim()) {
             newErrors.block6_amendmentProcedureOther = 'Please specify the other amendment procedure.';
        }

        // Task 6.2 Validation
        // Common Seal details are only required if the society has a common seal (from Block 5)
        if (currentFormData.block5_commonSeal === true) {
            if (!currentFormData.block6_commonSealCustody?.trim()) {
                newErrors.block6_commonSealCustody = 'Please specify who has custody of the common seal.';
            }
            if (!currentFormData.block6_commonSealUse?.trim()) {
                newErrors.block6_commonSealUse = 'Please specify how the common seal is used.';
            }
        }
        // Appeal process is only required if the user opts to include appeal rights
        if (currentFormData.block6_appealRights === true && !currentFormData.block6_appealProcess?.trim()) {
             newErrors.block6_appealProcess = 'Please describe the appeal process or specify the appeal body.';
        }

        // Task 6.3 Validation
        // Bylaw procedure is only required if committee CAN make bylaws
        if (currentFormData.block6_committeeCanMakeBylaws === true && !currentFormData.block6_bylawProcedure?.trim()) {
             newErrors.block6_bylawProcedure = 'Please describe the procedure for making/changing bylaws.';
        }
        // Note: block6_committeeCanMakeBylaws itself doesn't need validation as it's optional (null is ok)

        return newErrors;
    }, []);

    useEffect(() => {
        const validationErrors = validateBlock6(formData);
        setLocalErrors(validationErrors);
    }, [formData, validateBlock6]);

    // Handlers (copy or adapt)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: any = value;
        if (type === 'number') {
            processedValue = value === '' ? undefined : Number(value);
        }
        // Clear conditional 'Other' text field if the select/radio changes
        if (name === 'block6_amendmentProcedure' && value !== 'Other (specify)') {
             updateFormData('block6_amendmentProcedureOther', '');
             if (localErrors.block6_amendmentProcedureOther) {
                setLocalErrors(prev => { const next = {...prev}; delete next.block6_amendmentProcedureOther; return next; });
            }
        }
        // Add similar logic here for other conditional fields as they are implemented

        updateFormData(name as keyof ConstitutionFormData, processedValue);
        if (localErrors[name as keyof ConstitutionFormData]) {
            setLocalErrors(prev => { const next = {...prev}; delete next[name as keyof ConstitutionFormData]; return next; });
        }
    };

    const handleRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean | null) => {
        updateFormData(field, value);
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleBooleanRadioChange = (field: keyof ConstitutionFormData, value: boolean | null) => {
        const booleanValue = value;

        // Clear conditional fields based on the boolean choice
        if (field === 'block6_appealRights' && booleanValue === false) {
             updateFormData('block6_appealProcess', '');
             if (localErrors.block6_appealProcess) {
                setLocalErrors(prev => { const next = {...prev}; delete next.block6_appealProcess; return next; });
            }
        }
        if (field === 'block6_committeeCanMakeBylaws' && booleanValue === false) {
             updateFormData('block6_bylawProcedure', '');
             if (localErrors.block6_bylawProcedure) {
                setLocalErrors(prev => { const next = {...prev}; delete next.block6_bylawProcedure; return next; });
            }
        }

        updateFormData(field, booleanValue);
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
      };

    const handleSave = () => {
        const validationErrors = validateBlock6(formData);
        setLocalErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Block 6 Validation Passed');
            onComplete(blockNumber);
        } else {
            console.log('Block 6 Validation Failed', validationErrors);
        }
    };

    // Render Helpers (copy or adapt)
    const renderInput = (id: keyof ConstitutionFormData, labelText: string, type: string = 'text', required: boolean = true, tooltipText?: string, placeholder?: string, className?: string, min?: number, step?: number) => (
        <div className="mb-4">
            <Label htmlFor={id} className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}>
                        <HelpCircle className={helpIconClass} />
                    </Tooltip>
                )}
            </Label>
            <Input
                id={id}
                name={id}
                type={type}
                value={(formData[id] as string | number) ?? ''}
                onChange={handleInputChange}
                className={cn(baseInputClasses, localErrors[id] ? 'border-red-500' : 'border-gray-300', className)}
                placeholder={placeholder}
                min={min}
                step={step}
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    const renderRadioGroup = (id: keyof ConstitutionFormData, labelText: string, options: { value: string | number | boolean | null; label: string }[], required: boolean = true, tooltipText?: string) => (
        <div className="mb-4">
            <Label className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}>
                        <HelpCircle className={helpIconClass} />
                    </Tooltip>
                )}
            </Label>
            <ShadcnRadioGroup
                name={id as string}
                value={String(formData[id] ?? '')}
                onValueChange={(value) => {
                    // Determine if the value should be boolean or string/number
                    const option = options.find(opt => String(opt.value) === value);
                    let processedValue: string | number | boolean | null = value;
                    if (option) {
                         if (typeof option.value === 'boolean') {
                            processedValue = value === 'true';
                         } else if (typeof option.value === 'number') {
                             processedValue = Number(value);
                         } else if (option.value === null) {
                             processedValue = null;
                         }
                    }
                    const isBooleanOrNull = options.every(opt => typeof opt.value === 'boolean' || opt.value === null);
                    if (isBooleanOrNull) {
                        handleBooleanRadioChange(id, processedValue as boolean | null);
                    } else {
                        handleRadioChange(id, processedValue as string | number);
                    }
                }}
                className={cn("mt-2", localErrors[id] ? 'border border-red-500 rounded-md p-2' : '')}
            >
                {options.map((option) => (
                    <div key={String(option.value)} className="flex items-center space-x-2">
                        <RadioGroupItem value={String(option.value)} id={`${id}-${String(option.value)}`} />
                        <Label htmlFor={`${id}-${String(option.value)}`} className="font-normal">{option.label}</Label>
                    </div>
                ))}
            </ShadcnRadioGroup>
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    const renderSelect = (id: keyof ConstitutionFormData, labelText: string, options: string[], required: boolean = true, tooltipText?: string, placeholder: string = 'Select an option') => {
        // TODO: Replace with Shadcn Select component if desired
        return (
         <div className="mb-4">
             <label htmlFor={id} className={htmlLabelClass}>
                 {labelText} {required && requiredMarker}
                 {tooltipText && (
                    <Tooltip text={tooltipText}>
                        <HelpCircle className={helpIconClass} />
                    </Tooltip>
                 )}
             </label>
             <select
                 id={id}
                 name={id}
                 value={(formData[id] as string) ?? ''}
                 onChange={handleInputChange}
                 className={cn(baseInputClasses, localErrors[id] ? 'border-red-500' : 'border-gray-300')}
             >
                 <option value="" disabled>{placeholder}</option>
                 {options.map((option) => (
                     <option key={option} value={option}>{option}</option>
                 ))}
             </select>
             {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
         </div>
        );
    };

     const renderTextArea = (id: keyof ConstitutionFormData, labelText: string, required: boolean = true, tooltipText?: string, placeholder?: string, rows: number = 3) => (
        <div className="mb-4">
            <Label htmlFor={id} className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}>
                        <HelpCircle className={helpIconClass} />
                    </Tooltip>
                )}
            </Label>
            <Textarea
                id={id}
                name={id}
                value={(formData[id] as string) ?? ''}
                onChange={handleInputChange}
                className={cn('mt-1', baseInputClasses, localErrors[id] ? 'border-red-500' : 'border-gray-300')}
                placeholder={placeholder}
                rows={rows}
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Removed H3 heading */}
            {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Amendments & Bylaws</h3> */}

            {/* Task 6.1: Amendment Procedure */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>6.1 Amending the Constitution (Mandatory)</label>
                    <Tooltip text="How can the rules themselves be changed? Requires a specific process. (Ref: Act s32-36, s27(1)(p))">
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="block6_amendmentProcedure" className={htmlLabelClass}>Procedure for amending the constitution:</label>
                        <select 
                            id="block6_amendmentProcedure"
                            name="block6_amendmentProcedure"
                            value={formData.block6_amendmentProcedure || ''}
                            onChange={handleInputChange}
                            className={`${baseInputClasses} ${localErrors.block6_amendmentProcedure ? 'border-red-500' : ''}`}
                        >
                            <option value="" disabled>Select procedure...</option>
                            <option value="sgm_two_thirds">Resolution passed by a two-thirds (2/3) majority at an SGM or AGM</option>
                            <option value="sgm_three_quarters">Resolution passed by a three-quarters (3/4) majority at an SGM or AGM</option>
                            <option value="Other">Other (Specify)</option>
                        </select>
                         {formData.block6_amendmentProcedure === 'Other' && (
                            <Input 
                                type="text" 
                                className={`mt-1 block w-full ${localErrors.block6_amendmentProcedureOther ? 'border-red-500' : ''}`}
                                value={formData.block6_amendmentProcedureOther || ''} 
                                onChange={handleInputChange} 
                                name="block6_amendmentProcedureOther"
                                placeholder="Specify other procedure (e.g., specific notice period, multiple meetings)"
                            />
                         )}
                        {localErrors.block6_amendmentProcedure && <p className={errorClass}>{localErrors.block6_amendmentProcedure}</p>}
                        {localErrors.block6_amendmentProcedureOther && <p className={errorClass}>{localErrors.block6_amendmentProcedureOther}</p>}
                        <p className="text-xs text-gray-500 mt-1">Note: Amendments must be registered with the Registrar of Incorporated Societies to take effect (Act s35).</p>
                    </div>
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Task 6.2: Appeal Rights */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>6.2 Appeal Rights (Optional)</label>
                    <Tooltip text="Does a member have the right to appeal decisions made under the rules (e.g., disciplinary action)? (Ref: Act s27(1)(d))">
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className={htmlLabelClass}>Include a process for members to appeal decisions?</label>
                        <RadioGroup
                            label=""
                            name="block6_appealRights"
                            options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                            value={formData.block6_appealRights}
                            onChange={(value) => handleRadioChange('block6_appealRights', value as boolean)}
                        />
                        {localErrors.block6_appealRights && <p className={errorClass}>{localErrors.block6_appealRights}</p>}
                    </div>
                    {formData.block6_appealRights === true && (
                        <div>
                            <label htmlFor="block6_appealProcess" className={htmlLabelClass}>Describe the appeal process:</label>
                            <textarea 
                                id="block6_appealProcess" 
                                name="block6_appealProcess"
                                rows={4} 
                                value={formData.block6_appealProcess || ''} 
                                onChange={handleInputChange} 
                                className={`${baseInputClasses} ${localErrors.block6_appealProcess ? 'border-red-500' : ''}`} 
                                placeholder="e.g., Member must appeal in writing to the Secretary within 14 days. An independent panel (appointed by the Committee/AGM) reviews the appeal. Panel's decision is final."
                            />
                            {localErrors.block6_appealProcess && <p className={errorClass}>{localErrors.block6_appealProcess}</p>}
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Task 6.3: Bylaws */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>6.3 Bylaws / Regulations (Optional)</label>
                    <Tooltip text="Can the Committee make additional rules (bylaws/regulations) for day-to-day operations, separate from the main Constitution?">
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className={htmlLabelClass}>Allow the Committee to make bylaws or regulations?</label>
                        <RadioGroup
                            label=""
                            name="block6_committeeCanMakeBylaws"
                            options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                            value={formData.block6_committeeCanMakeBylaws}
                            onChange={(value) => handleRadioChange('block6_committeeCanMakeBylaws', value as boolean)}
                        />
                        {localErrors.block6_committeeCanMakeBylaws && <p className={errorClass}>{localErrors.block6_committeeCanMakeBylaws}</p>}
                    </div>
                    {formData.block6_committeeCanMakeBylaws === true && (
                        <div>
                            <label htmlFor="block6_bylawProcedure" className={htmlLabelClass}>Procedure for making/changing bylaws:</label>
                            <select 
                                id="block6_bylawProcedure"
                                name="block6_bylawProcedure"
                                value={formData.block6_bylawProcedure || ''}
                                onChange={handleInputChange}
                                className={`${baseInputClasses} ${localErrors.block6_bylawProcedure ? 'border-red-500' : ''}`}
                            >
                                <option value="" disabled>Select procedure...</option>
                                <option value="committee_majority">By majority vote of the Committee</option>
                                <option value="committee_two_thirds">By two-thirds (2/3) majority vote of the Committee</option>
                                <option value="agm_ratify">Made by Committee, ratified at next AGM</option>
                                <option value="Other">Other (Specify)</option>
                            </select>
                            {formData.block6_bylawProcedure === 'Other' && (
                                <Input 
                                    type="text" 
                                    className={`mt-1 block w-full ${localErrors.block6_bylawProcedureOther ? 'border-red-500' : ''}`}
                                    value={formData.block6_bylawProcedureOther || ''} 
                                    onChange={handleInputChange} 
                                    name="block6_bylawProcedureOther"
                                    placeholder="Specify other procedure..."
                                />
                            )}
                            {localErrors.block6_bylawProcedure && <p className={errorClass}>{localErrors.block6_bylawProcedure}</p>}
                            {localErrors.block6_bylawProcedureOther && <p className={errorClass}>{localErrors.block6_bylawProcedureOther}</p>}
                            <p className="text-xs text-gray-500 mt-1">Bylaws must be consistent with the Constitution and the Act.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button variant="secondary" onClick={() => onSaveProgress(blockNumber)}>Save Progress</Button>
                <Button onClick={handleSave}>Mark as Complete</Button>
            </div>
        </div>
    );
};

export default Block6Amendments; 