import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip } from '../../wizard/Tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HelpCircle } from 'lucide-react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';
import { cn } from '../../../utils/cn';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

    // Updated handler for RadioGroup changes
    const handleRadioValueChange = (field: keyof ConstitutionFormData, value: string) => {
      // Determine if this field should store a boolean
      const booleanFields: (keyof ConstitutionFormData)[] = [
        'block7_includeNoticesClause', // Assuming this should be boolean based on handleBooleanRadioChange
        'block7_includeIndemnityClause',
        'block7_committeeCanArrangeInsurance'
      ];
  
      let processedValue: string | number | boolean | null;
  
      if (booleanFields.includes(field)) {
        // Convert "true"/"false" string back to boolean
        processedValue = value === 'true' ? true : value === 'false' ? false : null;
      } else {
        // Keep as string for non-boolean fields
        processedValue = value;
      }

      // Clear conditional fields if 'No' is selected for includeNoticesClause
       if (field === 'block7_includeNoticesClause' && processedValue === false) {
          updateFormData('block7_noticesClauseText', '');
           if (localErrors.block7_noticesClauseText) {
              setLocalErrors(prev => { const next = {...prev}; delete next.block7_noticesClauseText; return next; });
          }
      }

      // Clear fields when dispute procedure changes
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
  
      updateFormData(field, processedValue);
      if (localErrors[field]) {
           setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
      }
    };

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
                            onChange={(e) => handleRadioValueChange(id, e.target.checked ? option : '')}
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
            <Textarea
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
                        name="block7_disputeProcedure"
                        value={formData.block7_disputeProcedure || 'standard'} // Default to standard
                        onValueChange={(value) => handleRadioValueChange('block7_disputeProcedure', value as string)}
                        className="space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="b7-disp-standard" />
                          <Label htmlFor="b7-disp-standard">Use Standard Procedure (Recommended - see below)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="b7-disp-custom" />
                          <Label htmlFor="b7-disp-custom">Define Custom Procedure (Editable below)</Label>
                      </div>
                    </RadioGroup>
                    {localErrors.block7_disputeProcedure && <p className={errorClass}>{localErrors.block7_disputeProcedure}</p>}

                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                        {formData.block7_disputeProcedure === 'custom' ? (
                            <Textarea 
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
                                onChange={(e) => handleRadioValueChange('block7_includeNoticesClause', e.target.checked ? 'true' : 'false')} 
                            />
                            Include a clause specifying how formal notices are given?
                        </label>
                    </div>
                    {formData.block7_includeNoticesClause === true && (
                        <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                            <Textarea 
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
                            name="block7_includeIndemnityClause"
                            value={formData.block7_includeIndemnityClause === true ? 'true' : formData.block7_includeIndemnityClause === false ? 'false' : ''}
                            onValueChange={(value) => handleRadioValueChange('block7_includeIndemnityClause', value)}
                            className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                             <RadioGroupItem value="true" id="b7-indem-yes" />
                             <Label htmlFor="b7-indem-yes">Yes (Recommended - Standard Text Below)</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                             <RadioGroupItem value="false" id="b7-indem-no" />
                             <Label htmlFor="b7-indem-no">No</Label>
                           </div>
                        </RadioGroup>
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
                            name="block7_committeeCanArrangeInsurance"
                            value={formData.block7_committeeCanArrangeInsurance === true ? 'true' : formData.block7_committeeCanArrangeInsurance === false ? 'false' : ''}
                            onValueChange={(value) => handleRadioValueChange('block7_committeeCanArrangeInsurance', value)}
                            className="flex space-x-4 mt-2"
                        >
                           <div className="flex items-center space-x-2">
                             <RadioGroupItem value="true" id="b7-insure-yes" />
                             <Label htmlFor="b7-insure-yes">Yes (Recommended)</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                             <RadioGroupItem value="false" id="b7-insure-no" />
                             <Label htmlFor="b7-insure-no">No</Label>
                           </div>
                        </RadioGroup>
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