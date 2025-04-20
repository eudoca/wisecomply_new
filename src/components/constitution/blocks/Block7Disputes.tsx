import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip } from "@/components/ui/tooltip";
import { RadioGroup } from '../../wizard/RadioGroup';
import { HelpCircle } from 'lucide-react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';
import { cn } from '../../../utils/cn';

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
interface Block7DisputesProps extends StepProps {
    blockNumber: number;
    onSaveProgress: (blockNumber: number) => void;
}

// Define Tooltips specific to Block 7
const TOOLTIPS = {
    block7_disputeProcedure: "How will disagreements between members, or between members and the society, be handled? Having a clear process is essential. Ref: Act s27(1)(l)",
    block7_externalOptions: "Consider external options like mediation or arbitration if internal processes fail.",
    block7_includeNoticesClause: "How are official notices (e.g., meeting notices, disciplinary actions) given to members? This ensures members are properly informed.",
    block7_includeIndemnityClause: "Should the society protect Committee members from personal liability for actions taken in good faith? This is common practice.",
    block7_committeeCanArrangeInsurance: "Should the Committee be authorised to purchase insurance (e.g., Directors & Officers liability) to cover potential liabilities?",
    block7_noticesClauseText: "This clause details how formal communications (notices) are sent to members (e.g., post, email) and when they are considered received.",
};

// Standard Texts
const standardInformalSteps = "Parties are encouraged to attempt to resolve the dispute informally between themselves first. If unresolved, they may approach a Committee member (not involved in the dispute) to facilitate discussion.";
const standardFormalSteps = "If informal resolution fails, a party may provide written notice of the dispute to the Committee. The Committee will appoint a sub-committee (or use the full Committee if appropriate) to hear from the parties involved and attempt to mediate a resolution. The Committee must act impartially and follow principles of natural justice.";
const standardNoticesText = "Notices may be given to members by post or email to the address recorded in the register of members. Any notice sent by post is deemed to have been received two working days after it was sent. Any notice sent by email is deemed to have been received when the email was sent.";
const standardIndemnityText = "The society shall indemnify every officer, committee member, and employee against any liability incurred by them in that capacity, provided they acted honestly and reasonably. This indemnity does not cover liability arising from willful misconduct or gross negligence.";

export const Block7Disputes: React.FC<Block7DisputesProps> = ({
    formData,
    updateFormData,
    onComplete,
    blockNumber,
    onSaveProgress,
}) => {

    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    // Updated Validation function for Block 7
    const validateBlock7 = useCallback((currentFormData: ConstitutionFormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};
        
        // Task 7.1 Validation
        const procedure = currentFormData.block7_disputeProcedure;
        if (!procedure) {
            newErrors.block7_disputeProcedure = 'Please select or define a dispute resolution procedure.';
        } else {
            if (procedure === 'informal_then_formal' || procedure === 'informal_only') {
                if (!currentFormData.block7_informalSteps?.trim()) {
                    newErrors.block7_informalSteps = 'Please describe the informal dispute resolution steps.';
                }
            }
            if (procedure === 'informal_then_formal' || procedure === 'formal_only') {
                if (!currentFormData.block7_formalSteps?.trim()) {
                    newErrors.block7_formalSteps = 'Please describe the custom dispute resolution procedure.';
                }
            }
            if (procedure === 'external_focus') {
                if (!currentFormData.block7_externalOptions?.length) {
                    newErrors.block7_externalOptions = 'Please select at least one external resolution option.';
                }
                if (currentFormData.block7_externalOptions?.includes('Other (specify)') && !currentFormData.block7_externalOptionsOther?.trim()) {
                    newErrors.block7_externalOptionsOther = 'Please specify the other external resolution option.';
                }
            }
        }

        // Task 7.2 Validation
        if (currentFormData.block7_includeNoticesClause === true && !currentFormData.block7_noticesClauseText?.trim()) {
            newErrors.block7_noticesClauseText = 'Please provide the text for the notices clause.';
        }

        // Task 7.3 Validation
        // These are optional Yes/No, null is acceptable. No specific validation needed here unless requirements change.

        return newErrors;
    }, []);

    useEffect(() => {
        const validationErrors = validateBlock7(formData);
        setLocalErrors(validationErrors);
    }, [formData, validateBlock7]);

    // Handlers (copy or adapt)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: any = value;
        if (type === 'number') {
            processedValue = value === '' ? undefined : Number(value);
        }
        if (name === 'block7_externalOptionsOther' && !(formData.block7_externalOptions?.includes('Other (specify)'))) {
            return; 
        }
        updateFormData(name as keyof ConstitutionFormData, processedValue);
        if (localErrors[name as keyof ConstitutionFormData]) {
            setLocalErrors(prev => { const next = {...prev}; delete next[name as keyof ConstitutionFormData]; return next; });
        }
    };

    const handleRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
        if (field === 'block7_disputeProcedure') {
            const clearFields: (keyof ConstitutionFormData)[] = [
                'block7_informalSteps', 
                'block7_formalSteps', 
                'block7_externalOptions', 
                'block7_externalOptionsOther'
            ];
            clearFields.forEach(f => updateFormData(f, ''));
            setLocalErrors(prev => {
                const next = {...prev};
                clearFields.forEach(f => delete next[f]);
                return next;
            });
        }
        updateFormData(field, value);
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };
    
    const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
        const currentValues = (formData[field] as string[] | undefined) || [];
        let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
        
        if (field === 'block7_externalOptions' && value === 'Other (specify)' && !checked) {
            updateFormData('block7_externalOptionsOther', ''); 
            if (localErrors.block7_externalOptionsOther) {
                setLocalErrors(prev => { const next = {...prev}; delete next.block7_externalOptionsOther; return next; });
            }
        }
        updateFormData(field, newValues);
         if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleBooleanRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
        const booleanValue = value === 'Yes' || value === true ? true : value === 'No' || value === false ? false : null;
        
        if (field === 'block7_includeNoticesClause' && booleanValue === false) {
            updateFormData('block7_noticesClauseText', '');
             if (localErrors.block7_noticesClauseText) {
                setLocalErrors(prev => { const next = {...prev}; delete next.block7_noticesClauseText; return next; });
            }
        }
        // No conditional fields for Indemnity/Insurance in this simple version

        updateFormData(field, booleanValue);
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
      };

    const handleSave = () => {
        const validationErrors = validateBlock7(formData);
        setLocalErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Block 7 Validation Passed');
            onComplete(blockNumber);
        } else {
            console.log('Block 7 Validation Failed', validationErrors);
        }
    };

    // Render Helpers (copy or adapt)
    const renderInput = (id: keyof ConstitutionFormData, labelText: string, type: string = 'text', required: boolean = true, tooltipText?: string, placeholder?: string, className?: string, min?: number, step?: number) => (
        <div className="mb-4">
            <label htmlFor={id} className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
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

    const renderRadioGroup = (id: keyof ConstitutionFormData, labelText: string, options: { value: string | number | boolean; label: string }[], required: boolean = true, tooltipText?: string) => (
        <div className="mb-4">
            <label className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            <RadioGroup
                label={labelText}
                name={id as string}
                options={options}
                value={typeof formData[id] === 'string' || typeof formData[id] === 'number' || typeof formData[id] === 'boolean' || formData[id] === null || formData[id] === undefined ? formData[id] : undefined}
                onChange={(value) => {
                    const isBoolean = options.every(opt => typeof opt.value === 'boolean');
                    if (isBoolean) {
                        handleBooleanRadioChange(id, value);
                    } else {
                        handleRadioChange(id, value);
                    }
                }}
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    const renderSelect = (id: keyof ConstitutionFormData, labelText: string, options: string[], required: boolean = true, tooltipText?: string, placeholder: string = 'Select an option') => (
        <div className="mb-4">
            <label htmlFor={id} className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
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
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

     const renderMultiSelect = (id: keyof ConstitutionFormData, labelText: string, options: string[], required: boolean = true, tooltipText?: string) => (
        <div className="mb-4">
             <label className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            <div className="space-y-2 mt-1">
                {options.map((option) => (
                    <div key={option} className="flex items-start">
                        <input
                            id={`${id}-${option.replace(/\s+/g, '-').toLowerCase()}`}
                            name={option}
                            type="checkbox"
                            checked={(formData[id] as string[])?.includes(option) ?? false}
                            onChange={(e) => handleCheckboxGroupChange(id, option, e.target.checked)}
                            className={checkboxClasses}
                        />
                        <label htmlFor={`${id}-${option.replace(/\s+/g, '-').toLowerCase()}`} className="ml-2 block text-sm text-gray-900">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
             {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );
    
     const renderTextArea = (id: keyof ConstitutionFormData, labelText: string, required: boolean = true, tooltipText?: string, placeholder?: string, rows: number = 3) => (
        <div className="mb-4">
            <label htmlFor={id} className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            <textarea
                id={id}
                name={id}
                rows={rows}
                value={(formData[id] as string) ?? ''}
                onChange={handleInputChange}
                className={cn(baseInputClasses, localErrors[id] ? 'border-red-500' : 'border-gray-300')}
                placeholder={placeholder}
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );


    return (
        <div className="space-y-6">
            {/* Removed H3 heading */}
            {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Dispute Resolution & Notices</h3> */}

            {/* Task 7.1: Dispute Resolution */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>7.1 Dispute Resolution Procedure (Mandatory)</label>
                    <Tooltip text={TOOLTIPS.block7_disputeProcedure}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <div className="space-y-4">
                    <RadioGroup
                        label="Select or define the dispute resolution procedure:"
                        name="block7_disputeProcedure"
                        options={[
                            { value: 'standard', label: 'Use Standard Procedure (Recommended - see below)' },
                            { value: 'custom', label: 'Define Custom Procedure (Editable below)' }
                        ]}
                        value={formData.block7_disputeProcedure || 'standard'} // Default to standard
                        onChange={(value) => handleRadioChange('block7_disputeProcedure', value as string)}
                    />
                    {localErrors.block7_disputeProcedure && <p className={errorClass}>{localErrors.block7_disputeProcedure}</p>}

                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                        {formData.block7_disputeProcedure === 'custom' ? (
                            <textarea 
                                id="block7_formalSteps" 
                                name="block7_formalSteps" 
                                rows={5} 
                                value={formData.block7_formalSteps || ''} 
                                onChange={handleInputChange} 
                                className={`${baseInputClasses} text-xs ${localErrors.block7_formalSteps ? 'border-red-500' : ''}`} 
                                placeholder="Describe the custom steps for handling disputes..."
                            />
                        ) : (
                            <p className="whitespace-pre-line">{standardInformalSteps}</p>
                        )}
                    </div>
                    {formData.block7_disputeProcedure === 'custom' && localErrors.block7_formalSteps && <p className={errorClass}>{localErrors.block7_formalSteps}</p>}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Task 7.2: Notices */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>7.2 Notices (Recommended)</label>
                    <Tooltip text={TOOLTIPS.block7_includeNoticesClause}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input 
                                type="checkbox" 
                                className={checkboxClasses} 
                                checked={formData.block7_includeNoticesClause || false} 
                                onChange={(e) => handleBooleanRadioChange('block7_includeNoticesClause', e.target.checked)} 
                            />
                            Include a clause specifying how formal notices are given?
                        </label>
                    </div>
                    {formData.block7_includeNoticesClause === true && (
                        <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                            <textarea 
                                id="block7_noticesClauseText" 
                                name="block7_noticesClauseText" 
                                rows={4} 
                                value={formData.block7_noticesClauseText || standardNoticesText} // Default to standard if checked
                                onChange={handleInputChange} 
                                className={`${baseInputClasses} text-xs ${localErrors.block7_noticesClauseText ? 'border-red-500' : ''}`} 
                            />
                            {localErrors.block7_noticesClauseText && <p className={errorClass}>{localErrors.block7_noticesClauseText}</p>}
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Task 7.3: Indemnity & Insurance */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>7.3 Indemnity & Insurance (Recommended)</label>
                </div>
                <div className="space-y-4">
                    {/* Indemnity Clause */} 
                    <div>
                        <label className={htmlLabelClass}>Include Clause: Indemnity for Committee & Officers?
                            <Tooltip text={TOOLTIPS.block7_includeIndemnityClause}><HelpCircle className={helpIconClass} /></Tooltip>
                        </label>
                        <RadioGroup
                            label=""
                            name="block7_includeIndemnityClause"
                            options={[{ value: true, label: 'Yes (Recommended - Standard Text Below)' }, { value: false, label: 'No' }]}
                            value={formData.block7_includeIndemnityClause}
                            onChange={(value) => handleRadioChange('block7_includeIndemnityClause', value as boolean)}
                        />
                        {localErrors.block7_includeIndemnityClause && <p className={errorClass}>{localErrors.block7_includeIndemnityClause}</p>}
                        {formData.block7_includeIndemnityClause === true && (
                            <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                                <p>Standard Clause: &quot;{standardIndemnityText}&quot;</p>
                            </div>
                        )}
                    </div>
                    {/* Insurance Clause */} 
                    <div className="pt-4 border-t border-gray-100">
                        <label className={htmlLabelClass}>Include Clause: Power for Committee to Arrange Insurance?
                            <Tooltip text={TOOLTIPS.block7_committeeCanArrangeInsurance}><HelpCircle className={helpIconClass} /></Tooltip>
                        </label>
                        <RadioGroup
                            label=""
                            name="block7_committeeCanArrangeInsurance"
                            options={[{ value: true, label: 'Yes (Recommended)' }, { value: false, label: 'No' }]}
                            value={formData.block7_committeeCanArrangeInsurance}
                            onChange={(value) => handleRadioChange('block7_committeeCanArrangeInsurance', value as boolean)}
                        />
                        {localErrors.block7_committeeCanArrangeInsurance && <p className={errorClass}>{localErrors.block7_committeeCanArrangeInsurance}</p>}
                    </div>
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

export default Block7Disputes;