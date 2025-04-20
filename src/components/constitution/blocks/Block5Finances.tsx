import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip } from "@/components/ui/tooltip";
import { RadioGroup } from '../../wizard/RadioGroup'; // Assuming RadioGroup is in wizard
import { HelpCircle } from 'lucide-react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';
import { cn } from '../../../utils/cn';

// Standard Tailwind classes (copy from other blocks or define)
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";
const htmlLabelClass = "block text-sm font-medium text-gray-700 mb-1";
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1";
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3";
const errorClass = "mt-1 text-xs text-red-600";
const helpIconClass = "ml-2 text-gray-500 hover:text-gray-700 inline-block align-middle h-4 w-4 cursor-help";
const requiredMarker = <span className="text-red-500">*</span>;

// Define the props for the component
interface Block5FinancesProps extends StepProps {
    blockNumber: number;
    onSaveProgress: (blockNumber: number) => void;
}

// Define Tooltips specific to Block 5
const TOOLTIPS = {
    block5_financialYearEnd: "The end date of the society's 12-month accounting period. Common choices are 31 March or 30 June. Ref: Act s27(1)(i)",
    block5_fundsSource: "How does the society plan to get money? Select all that apply.",
    block5_fundsManagement: "Specify who is responsible for managing the society's finances day-to-day. Ref: Act s27(1)(k)",
    block5_paymentAuthorisation: "How are payments approved? This ensures accountability.",
    block5_bankAccountRequired: "The Act requires societies to have a bank account. Ref: Act s100",
    block5_accountSignatories: "How many people must sign off on payments from the bank account? Usually two for checks and balances.",
    block5_auditorRequired: "Is an independent audit required? Small societies may not need one unless members demand it or funding requires it. Ref: Act s102",
    block5_auditorAppointmentMethod: "How is the auditor (if required) chosen? Usually by members at the AGM.",
    block5_surplusDistributionDissolution: "Crucial for non-profit status. Assets usually must go to a similar organisation upon winding up, not to members. Ref: Act s27(1)(m), s124",
    block5_commonSeal: "A common seal is an official stamp used to execute documents. Less common now, but some societies still use them. Ref: Act s27(1)(f)"
};

export const Block5Finances: React.FC<Block5FinancesProps> = ({
    formData,
    updateFormData,
    onComplete,
    blockNumber,
    onSaveProgress,
}) => {

    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    // Updated Validation function for Block 5
    const validateBlock5 = useCallback((currentFormData: ConstitutionFormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};
        
        // --- Task 5.1 Validation --- (Keep existing)
        if (!currentFormData.block5_financialYearEnd) {
            newErrors.block5_financialYearEnd = 'Financial year end date is required.';
        } else if (currentFormData.block5_financialYearEnd === 'Other (specify)' && !currentFormData.block5_financialYearEndOther?.trim()) {
            newErrors.block5_financialYearEndOther = 'Please specify the other financial year end date.';
        }

        // --- Task 5.2 Validation --- (Keep existing)
        if (!currentFormData.block5_fundsSource?.length) {
            newErrors.block5_fundsSource = 'Please select at least one source of funds.';
        }
        if (currentFormData.block5_fundsSource?.includes('Other (specify)') && !currentFormData.block5_fundsSourceOther?.trim()) {
            newErrors.block5_fundsSourceOther = 'Please specify the other source of funds.';
        }
        if (!currentFormData.block5_fundsManagement) {
             newErrors.block5_fundsManagement = 'Please specify who manages the funds.';
        }
         if (!currentFormData.block5_paymentAuthorisation) {
             newErrors.block5_paymentAuthorisation = 'Please specify how payments are authorised.';
        }
        if (currentFormData.block5_bankAccountRequired !== true) {
            newErrors.block5_bankAccountRequired = 'Confirmation that a bank account will be used is required.';
        }
        if (!currentFormData.block5_accountSignatories) {
            newErrors.block5_accountSignatories = 'Please specify the bank account signatory requirements.';
        }

        // --- Task 5.3 Validation --- 
         if (currentFormData.block5_auditorRequired === undefined || currentFormData.block5_auditorRequired === null) {
             newErrors.block5_auditorRequired = 'Please specify if an auditor is required.';
         }
         if (currentFormData.block5_auditorRequired === true) {
             if (!currentFormData.block5_auditorAppointmentMethod) {
                 newErrors.block5_auditorAppointmentMethod = 'Please specify how the auditor is appointed.';
             }
             // Threshold is optional, but validate if entered
             if (currentFormData.block5_auditThreshold !== undefined && currentFormData.block5_auditThreshold <= 0) {
                  newErrors.block5_auditThreshold = 'Audit threshold must be a positive number if specified.';
             }
         }

        // --- Task 5.4 Validation ---
        if (!currentFormData.block5_surplusDistributionDissolution) {
            newErrors.block5_surplusDistributionDissolution = 'Please specify how surplus assets will be distributed on dissolution.';
        } else if (currentFormData.block5_surplusDistributionDissolution === 'Other (specify)' && !currentFormData.block5_windingUpDistributionOther?.trim()) {
            // Note: Using block5_windingUpDistributionOther key from original interface for the 'Other' text field value
            newErrors.block5_windingUpDistributionOther = 'Please specify the other distribution method.';
        }
        
        // --- Task 5.5 Validation ---
        if (currentFormData.block5_commonSeal === undefined || currentFormData.block5_commonSeal === null) {
            newErrors.block5_commonSeal = 'Please specify if the society will have a common seal.';
        }

        return newErrors;
    }, []);

    useEffect(() => {
        const validationErrors = validateBlock5(formData);
        setLocalErrors(validationErrors);
    }, [formData, validateBlock5]);

    // Handlers (copy or adapt from Block 4)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: any = value;
        if (type === 'number') {
            processedValue = value === '' ? undefined : Number(value);
        }
        // Clear conditional 'Other' field if select changes away from 'Other'
        if (name === 'block5_surplusDistributionDissolution' && value !== 'Other (specify)') {
            updateFormData('block5_windingUpDistributionOther', '');
            if (localErrors.block5_windingUpDistributionOther) {
                 setLocalErrors(prev => { const next = {...prev}; delete next.block5_windingUpDistributionOther; return next; });
            }
        }
        updateFormData(name as keyof ConstitutionFormData, processedValue);
        // Clear error on change
        if (localErrors[name as keyof ConstitutionFormData]) {
            setLocalErrors(prev => { const next = {...prev}; delete next[name as keyof ConstitutionFormData]; return next; });
        }
    };

    const handleRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
        updateFormData(field, value);
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
        const currentValues = (formData[field] as string[] | undefined) || [];
        let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
        // Clear conditional 'Other' field if 'Other' checkbox is unchecked
        if (field === 'block5_fundsSource' && value === 'Other (specify)' && !checked) {
            updateFormData('block5_fundsSourceOther', ''); 
            if (localErrors.block5_fundsSourceOther) {
                setLocalErrors(prev => { const next = {...prev}; delete next.block5_fundsSourceOther; return next; });
            }
        }
        updateFormData(field, newValues);
         if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleBooleanRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
        const booleanValue = value === 'Yes' || value === true ? true : value === 'No' || value === false ? false : null;
        // Clear conditional fields if parent radio changes
        if (field === 'block5_auditorRequired' && booleanValue === false) {
            updateFormData('block5_auditThreshold', undefined);
            updateFormData('block5_auditorAppointmentMethod', '');
            if (localErrors.block5_auditThreshold) setLocalErrors(prev => { const next = {...prev}; delete next.block5_auditThreshold; return next; });
            if (localErrors.block5_auditorAppointmentMethod) setLocalErrors(prev => { const next = {...prev}; delete next.block5_auditorAppointmentMethod; return next; });
        }
        updateFormData(field, booleanValue);
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
      };

    const handleSave = () => {
        const validationErrors = validateBlock5(formData);
        setLocalErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Block 5 Validation Passed');
            onComplete(blockNumber);
        } else {
            console.log('Block 5 Validation Failed', validationErrors);
        }
    };

    // Render Helpers (copy or adapt from Block 4)
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
                value={formData[id]}
                onChange={(value) => {
                    // Determine if the value should be treated as boolean
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

    return (
        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Block 5: Finances</h3>

            {/* Task 5.1: Financial Year End */}
            <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                <label className={taskTitleClass}>5.1 Financial Year End
                    <Tooltip text={TOOLTIPS.block5_financialYearEnd}><HelpCircle className={helpIconClass} /></Tooltip>
                </label>
                <p className={descriptionClass}>Define the society&apos;s annual accounting period. (Ref: Act s27(1)(i))</p>
                
                {renderSelect('block5_financialYearEnd', 'Financial Year End Date', [
                    '31 March', 
                    '30 June', 
                    '31 December',
                    'Other (specify)'
                ], true, undefined, 'Select Financial Year End')}
                 {localErrors.block5_financialYearEnd && <p className={errorClass}>{localErrors.block5_financialYearEnd}</p>}

                 {formData.block5_financialYearEnd === 'Other (specify)' &&
                    renderInput('block5_financialYearEndOther', 'Specify other date', 'text', true, undefined, 'e.g., 30 September')
                 }
                 {localErrors.block5_financialYearEndOther && <p className={errorClass}>{localErrors.block5_financialYearEndOther}</p>}
             </div>

            {/* Task 5.2: Fund Sources & Management */}
            <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>5.2 Fund Sources & Management
                     <Tooltip text={TOOLTIPS.block5_fundsManagement}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Define how the society will receive and manage its money, including bank accounts and payment authorisation. (Ref: Act s27(1)(k), s100)</p>

                 {renderMultiSelect('block5_fundsSource', 'Sources of Funds', [
                    'Membership fees', 
                    'Grants from funding bodies', 
                    'Public donations', 
                    'Fundraising activities', 
                    'Sales of goods/services', 
                    'Interest earned',
                    'Other (specify)'
                 ], true, TOOLTIPS.block5_fundsSource)}
                 {localErrors.block5_fundsSource && <p className={errorClass}>{localErrors.block5_fundsSource}</p>}

                 {formData.block5_fundsSource?.includes('Other (specify)') &&
                    renderInput('block5_fundsSourceOther', 'Specify other source(s)', 'text', true)
                 }
                 {localErrors.block5_fundsSourceOther && <p className={errorClass}>{localErrors.block5_fundsSourceOther}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    {renderSelect('block5_fundsManagement', 'Who Manages the Funds?', [
                        'The Treasurer',
                        'The Committee as a whole',
                        'Designated finance sub-committee',
                        'Other (specify in rules)'
                    ], true)}
                    {localErrors.block5_fundsManagement && <p className={errorClass}>{localErrors.block5_fundsManagement}</p>}

                    {renderSelect('block5_paymentAuthorisation', 'Payment Authorisation Method', [
                        'Two authorised signatories (e.g., Treasurer + one other)',
                        'Treasurer, subject to Committee budget/approval',
                        'Resolution of the Committee for all payments',
                        'Other (specify in rules)'
                    ], true, TOOLTIPS.block5_paymentAuthorisation)}
                    {localErrors.block5_paymentAuthorisation && <p className={errorClass}>{localErrors.block5_paymentAuthorisation}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    {renderRadioGroup('block5_bankAccountRequired', 'Confirm Society will operate bank account(s) in its name?', [
                         { value: true, label: 'Yes (Required by Act s100)' },
                     ], true, TOOLTIPS.block5_bankAccountRequired)}
                      {localErrors.block5_bankAccountRequired && <p className={errorClass}>{localErrors.block5_bankAccountRequired}</p>}

                    {renderSelect('block5_accountSignatories', 'Bank Account Signatories', [
                        'At least two authorised Committee members',
                        'The Treasurer and at least one other Committee member',
                        'Any three authorised Committee members',
                        'Other (specify in rules)'
                    ], true, TOOLTIPS.block5_accountSignatories)}
                     {localErrors.block5_accountSignatories && <p className={errorClass}>{localErrors.block5_accountSignatories}</p>}
                </div>
            </div>

            {/* Task 5.3: Auditor Requirements */}
             <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>5.3 Auditor Requirements
                     <Tooltip text={TOOLTIPS.block5_auditorRequired}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Define if and when an independent audit or review of the society&apos;s accounts is required. (Ref: Act s102)</p>

                {renderRadioGroup('block5_auditorRequired', 'Is an annual audit or review required?', [
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No (unless required by Act thresholds or member demand)' }
                 ], true)}
                 {localErrors.block5_auditorRequired && <p className={errorClass}>{localErrors.block5_auditorRequired}</p>}

                 {formData.block5_auditorRequired === true && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                         {/* Optional Threshold Input */} 
                         {renderInput('block5_auditThreshold', 
                            'Audit required only if annual income exceeds (Optional)',
                            'number', 
                            false, // Not required itself
                            'Leave blank if audit is always required when Yes is selected above.', 
                            'e.g., 50000', 
                            'w-40', 
                            1
                         )}
                         {localErrors.block5_auditThreshold && <p className={errorClass}>{localErrors.block5_auditThreshold}</p>}

                         {/* Required Appointment Method if Auditor is Required */} 
                         {renderSelect('block5_auditorAppointmentMethod', 'Auditor Appointment Method', [
                             'Appointed by members at the AGM',
                             'Appointed by the Committee',
                             'Other (specify in rules)'
                         ], true, TOOLTIPS.block5_auditorAppointmentMethod, 'Select appointment method')}
                         {localErrors.block5_auditorAppointmentMethod && <p className={errorClass}>{localErrors.block5_auditorAppointmentMethod}</p>}
                    </div>
                 )}
             </div>

            {/* Task 5.4: Surplus Distribution on Dissolution */}
             <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                <label className={taskTitleClass}>5.4 Surplus Distribution on Dissolution
                     <Tooltip text={TOOLTIPS.block5_surplusDistributionDissolution}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Specify what happens to any remaining assets if the society winds up. Assets usually cannot be distributed to members. (Ref: Act s27(1)(m), s124)</p>

                 {renderSelect('block5_surplusDistributionDissolution', 'How will surplus assets be distributed?', [
                     'To another incorporated society with similar purposes',
                     'To a registered charitable organisation with similar purposes',
                     'As determined by members at the final General Meeting',
                     'Other (specify)'
                 ], true, undefined, 'Select distribution method')}
                 {localErrors.block5_surplusDistributionDissolution && <p className={errorClass}>{localErrors.block5_surplusDistributionDissolution}</p>}

                {formData.block5_surplusDistributionDissolution === 'Other (specify)' &&
                    renderInput('block5_windingUpDistributionOther', 'Specify other distribution method', 'text', true)
                 }
                 {/* Note: Using block5_windingUpDistributionOther key from original interface for the value, error is mapped in validation */} 
                 {localErrors.block5_windingUpDistributionOther && <p className={errorClass}>{localErrors.block5_windingUpDistributionOther}</p>}
             </div>

            {/* Task 5.5: Common Seal */}
             <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>5.5 Common Seal
                     <Tooltip text={TOOLTIPS.block5_commonSeal}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Does the society need or want to use a common seal for executing official documents? This is less common now. (Ref: Act s27(1)(f))</p>

                 {renderRadioGroup('block5_commonSeal', 'Will the Society have a Common Seal?', [
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' }
                 ], true)}
                 {localErrors.block5_commonSeal && <p className={errorClass}>{localErrors.block5_commonSeal}</p>}

                 {/* Optionally, add fields for custody and use of the seal if 'Yes' is selected */} 
             </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end space-x-3">
                 <Button
                     variant="outline"
                     onClick={() => onSaveProgress(blockNumber)}
                     type="button"
                 >
                     Save Progress
                 </Button>
                <Button
                    onClick={handleSave}
                    disabled={Object.keys(localErrors).length > 0}
                    type="button"
                     className={cn(
                        Object.keys(localErrors).length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-primary hover:bg-brand-primary-dark',
                        'text-white font-bold py-2 px-4 rounded'
                    )}
                >
                    Mark Block 5 as Complete
                </Button>
            </div>
        </div>
    );
};

export default Block5Finances; 