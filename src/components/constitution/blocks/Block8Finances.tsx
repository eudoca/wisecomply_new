import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip } from '../../wizard/Tooltip';
import { RadioGroup } from '../../wizard/RadioGroup';
import { HelpCircle } from 'lucide-react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';
import { cn } from '../../../utils/cn';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Standard Tailwind classes (Consider moving to a shared constants file if reused extensively)
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";
const htmlLabelClass = "block text-sm font-medium text-gray-700 mb-1";
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1";
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3";
const errorClass = "mt-1 text-xs text-red-600";
const helpIconClass = "ml-2 text-gray-500 hover:text-gray-700 inline-block align-middle h-4 w-4 cursor-help";
const requiredMarker = <span className="text-red-500">*</span>;

// Define the props for the component
interface Block8FinancesProps extends StepProps {
    blockNumber: number;
    onSaveProgress: (blockNumber: number) => void;
}

// Define Tooltips specific to Block 8
const TOOLTIPS = {
    block8_financialYearEnd: "Define the society's financial year-end date. This is crucial for accounting and reporting. (Ref: Act s27(1)(f))",
    block8_bankAccountRequired: "Specify if the society must maintain a bank account. This is standard practice for financial transparency.",
    block8_whoSignsCheques: "Define who is authorised to sign cheques or make electronic payments on behalf of the society. Often requires multiple signatories for control.",
    block8_minSignatories: "Specify the minimum number of authorised signatories required for transactions.",
    block8_borrowingPowers: "Determine who has the authority to borrow money on behalf of the society – the committee, the general meeting, or no borrowing allowed. (Ref: Act s27(1)(i))",
    block8_borrowingLimit: "If borrowing is allowed, you can set a maximum limit without needing further specific approval (e.g., from a general meeting).",
    block8_propertyAndFundsUsage: "Outline how the society's money and property can be used. Must align with the society's purposes and not be for private gain of members. (Ref: Act s27(1)(h))",
    block8_fundsSource: "Where does the society expect to get its money from?", // Similar to Block5, potentially remove duplication
    block8_fundsManagement: "Who is responsible for managing the society's funds day-to-day?", // Similar to Block5
    block8_accountSignatories: "How many people need to approve a payment?", // Combined into minSignatories
    block8_auditorRequired: "Is an annual audit required?", // Potentially Block 5? Moved to finance block.
    block8_auditThreshold: "If an audit isn't always required, what financial threshold triggers it?", // Potentially Block 5?
    block8_auditorAppointmentMethod: "How is the auditor chosen?", // Potentially Block 5?
    block8_surplusDistributionDissolution: "What happens to leftover funds/assets if the society closes down? Must go to a similar not-for-profit organisation. (Ref: Act s27(1)(j))" // This is actually Block 9 (Dissolution)
};

// Standard Texts (Define any needed for Block 8)
// const standardFinancialControlsText = "..."


export const Block8Finances: React.FC<Block8FinancesProps> = ({
    formData,
    updateFormData,
    onComplete,
    blockNumber,
    onSaveProgress,
}) => {

    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    // Updated Validation function for Block 8
    const validateBlock8 = useCallback((currentFormData: ConstitutionFormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};

        // --- Task 8.1: Financial Year End ---
        if (!currentFormData.block8_financialYearEndDay || currentFormData.block8_financialYearEndDay < 1 || currentFormData.block8_financialYearEndDay > 31) {
             newErrors.block8_financialYearEndDay = 'Please enter a valid day (1-31).';
        }
        if (!currentFormData.block8_financialYearEndMonth || currentFormData.block8_financialYearEndMonth < 1 || currentFormData.block8_financialYearEndMonth > 12) {
            newErrors.block8_financialYearEndMonth = 'Please enter a valid month (1-12).';
        }

        // --- Task 8.2: Banking & Payments ---
        if (currentFormData.block8_bankAccountRequired === null) {
             newErrors.block8_bankAccountRequired = 'Please specify if a bank account is required.';
        }
        if (!currentFormData.block8_whoSignsCheques?.length) {
            newErrors.block8_whoSignsCheques = 'Please select who is authorised to make payments.';
        }
        if (!currentFormData.block8_minSignatories || currentFormData.block8_minSignatories < 1) {
            newErrors.block8_minSignatories = 'Please specify a minimum number of signatories (at least 1).';
        }
        if (currentFormData.block8_whoSignsCheques && typeof currentFormData.block8_minSignatories === 'number' && currentFormData.block8_minSignatories > currentFormData.block8_whoSignsCheques.length) {
            newErrors.block8_minSignatories = `Minimum signatories (${currentFormData.block8_minSignatories}) cannot exceed the number of authorised roles (${currentFormData.block8_whoSignsCheques.length}).`;
        }

        // --- Task 8.3: Borrowing Powers ---
        if (!currentFormData.block8_borrowingPowers) {
            newErrors.block8_borrowingPowers = 'Please specify the society\'s borrowing powers.';
        }
        if (currentFormData.block8_borrowingPowers !== 'none' && (currentFormData.block8_borrowingLimit === undefined || currentFormData.block8_borrowingLimit === null)){
             // Assuming limit is required if borrowing is allowed
            newErrors.block8_borrowingLimit = 'Please specify a borrowing limit (enter 0 for no limit).'; 
        }

        // --- Task 8.4: Use of Funds & Property ---
        if (!currentFormData.block8_propertyAndFundsUsage?.trim()) {
            newErrors.block8_propertyAndFundsUsage = 'Please describe how the society\'s property and funds will be used.';
        }

        return newErrors;
    }, []);

    useEffect(() => {
        const validationErrors = validateBlock8(formData);
        setLocalErrors(validationErrors);
    }, [formData, validateBlock8]);

    // Handlers (Adapt as needed)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: any = value;

        if (type === 'number') {
            processedValue = value === '' ? null : Number(value); // Use null for empty number fields
             // Prevent negative numbers where applicable
            if ((name === 'block8_minSignatories' || name === 'block8_borrowingLimit') && processedValue !== null && processedValue < 0) {
                processedValue = 0; // Or keep null, or show error immediately? Setting to 0 for now.
            }
        } else if (type === 'checkbox') {
            // This function doesn't handle checkboxes directly, see handleCheckboxGroupChange
            return;
        }

        updateFormData(name as keyof ConstitutionFormData, processedValue);

        // Basic real-time validation clearing
        if (localErrors[name as keyof ConstitutionFormData]) {
            setLocalErrors(prev => { const next = {...prev}; delete next[name as keyof ConstitutionFormData]; return next; });
        }
    };

    // Restore original boolean radio handler
    const handleBooleanRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
        // The custom component might pass boolean directly, or string "true"/"false", or "Yes"/"No". Adjust as needed.
        // Assuming it passes string "true"/"false" based on previous errors
        const booleanValue = value === 'true' ? true : value === 'false' ? false : null;

         // Clear conditional fields if 'No' is selected
         if (field === 'block8_bankAccountRequired' && booleanValue === false) {
            updateFormData('block8_whoSignsCheques', []);
            updateFormData('block8_minSignatories', null);
             setLocalErrors(prev => {
                 const next = {...prev};
                 delete next.block8_whoSignsCheques;
                 delete next.block8_minSignatories;
                 return next;
             });
        }

        updateFormData(field, booleanValue);
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
      };

    // Restore original string/number radio handler
    const handleRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
         // Clear borrowing limit if borrowing power is 'none'
         if (field === 'block8_borrowingPowers' && value === 'none') {
            updateFormData('block8_borrowingLimit', null);
            setLocalErrors(prev => { const next = {...prev}; delete next.block8_borrowingLimit; return next; });
        }

         updateFormData(field, value);
         if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
        const currentValues = (formData[field] as string[] | undefined) || [];
        let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);

        // Specific logic for 'block8_whoSignsCheques' if needed (e.g., 'Other' field)
        // if (field === 'block8_whoSignsCheques' && value === 'Other' && !checked) {
        //     updateFormData('block8_whoSignsChequesOther', ''); // Assuming an 'Other' text field exists
        // }

        updateFormData(field, newValues);
         if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleSave = () => {
        const validationErrors = validateBlock8(formData);
        setLocalErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Block 8 Validation Passed');
            onComplete(blockNumber);
        } else {
            console.log('Block 8 Validation Failed', validationErrors);
        }
    };

    // --- Render Helpers (Adapted) ---

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
                // Explicitly pass required attribute, though might be handled by styling/validation logic instead
                // required={required} 
            />
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
            <div className="space-y-2 mt-1 grid grid-cols-2 gap-x-4 gap-y-2"> {/* Simple grid layout */}
                {options.map((option) => (
                    <div key={option} className="flex items-start">
                        <input
                            id={`${id}-${option.replace(/\s+/g, '-').toLowerCase()}`}
                            name={option} // Name can be option itself or group name id
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
             {/* Add 'Other' input if needed */}
             {/* {options.includes('Other') && formData[id]?.includes('Other') && renderInput(`${id}Other` as keyof ConstitutionFormData, 'Specify Other', 'text', true)} */}
        </div>
    );

     const renderTextArea = (id: keyof ConstitutionFormData, labelText: string, required: boolean = true, tooltipText?: string, placeholder?: string, rows: number = 4) => (
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
                placeholder={placeholder ?? 'Provide details here...'}
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

     const renderMonthDaySelector = (dayId: keyof ConstitutionFormData, monthId: keyof ConstitutionFormData, labelText: string, required: boolean, tooltipText?: string) => {
        const months = [
            { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
            { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
            { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
            { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }
        ];
        const days = Array.from({ length: 31 }, (_, i) => i + 1);

        const handleDateChange = (field: keyof ConstitutionFormData, value: string) => {
             const numValue = value === '' ? null : Number(value);
             updateFormData(field, numValue);
             // Combine day/month into block8_financialYearEnd string? Or keep separate?
             // Let's keep separate for now, combine when generating text.
             const day = field === dayId ? numValue : formData[dayId];
             const month = field === monthId ? numValue : formData[monthId];

             if (day && month) {
                 const monthName = months.find(m => m.value === month)?.label;
                 if (monthName) {
                     updateFormData('block8_financialYearEnd', `${day} ${monthName}`);
                 }
             } else {
                 updateFormData('block8_financialYearEnd', ''); // Clear combined string if incomplete
             }

             if (localErrors[field]) {
                 setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
             }
             if (localErrors.block8_financialYearEnd) {
                 setLocalErrors(prev => { const next = {...prev}; delete next.block8_financialYearEnd; return next; });
             }
         };

        return (
            <div className="mb-4">
                <label className={htmlLabelClass}>
                    {labelText} {required && requiredMarker}
                    {tooltipText && <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>}
                </label>
                <div className="flex space-x-2">
                    <div className="w-1/2">
                         <label htmlFor={dayId as string} className="sr-only">Day</label>
                        <select
                            id={dayId as string}
                            name={dayId as string}
                            value={String(formData[dayId] ?? '')}
                            onChange={(e) => handleDateChange(dayId, e.target.value)}
                            className={cn(baseInputClasses, (localErrors[dayId] || localErrors.block8_financialYearEnd) ? 'border-red-500' : 'border-gray-300')}
                        >
                            <option value="" disabled>Day</option>
                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="w-1/2">
                         <label htmlFor={monthId as string} className="sr-only">Month</label>
                        <select
                            id={monthId as string}
                            name={monthId as string}
                            value={String(formData[monthId] ?? '')}
                            onChange={(e) => handleDateChange(monthId, e.target.value)}
                            className={cn(baseInputClasses, (localErrors[monthId] || localErrors.block8_financialYearEnd) ? 'border-red-500' : 'border-gray-300')}
                        >
                            <option value="" disabled>Month</option>
                            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                    </div>
                </div>
                 {/* Show combined error or individual errors */}
                 {localErrors.block8_financialYearEnd && <p className={errorClass}>{localErrors.block8_financialYearEnd}</p>}
                 {/* {(localErrors[dayId] || localErrors[monthId]) && <p className={errorClass}>Please select both day and month.</p>} */}
            </div>
        );
    };

    // Renamed helper for string/number based radio groups (like block8_borrowingPowers)
    const renderStringRadioGroup = (id: keyof ConstitutionFormData, labelText: string, options: { value: string | number; label: string }[], required: boolean = true, tooltipText?: string) => (
        <div className="mb-4">
            <label className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            {/* Using custom RadioGroup from ../../wizard/RadioGroup */}
            <RadioGroup 
                label={labelText} // Pass label prop
                name={id as string}
                options={options} // Pass options prop
                // Explicitly cast value to expected type
                value={formData[id] as string | number | undefined ?? ''} 
                onChange={(value) => handleRadioChange(id, value)} // Use original handler
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );
    
    // New helper for boolean (Yes/No) radio groups (like block8_bankAccountRequired)
    const renderBooleanRadioGroup = (id: keyof ConstitutionFormData, labelText: string, required: boolean = true, tooltipText?: string) => (
        <div className="mb-4">
            <label className={htmlLabelClass}>
                {labelText} {required && requiredMarker}
                {tooltipText && (
                    <Tooltip text={tooltipText}><HelpCircle className={helpIconClass} /></Tooltip>
                )}
            </label>
            {/* Using custom RadioGroup from ../../wizard/RadioGroup */}
            <RadioGroup 
                label={labelText} 
                name={id as string}
                options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]} // Pass boolean options
                // Pass boolean value directly, explicitly cast
                value={formData[id] as boolean | undefined}
                onChange={(value) => handleBooleanRadioChange(id, value)} // Use boolean handler
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    // --- Main Component Return ---
    return (
        <div className="space-y-6">
            {/* Removed H3 heading */}
            {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Financial Management</h3> */}

            {/* Task 8.1: Financial Year */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>8.1 Financial Year (Mandatory)</label>
                    <Tooltip text={TOOLTIPS.block8_financialYearEnd}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <div className="space-y-4">
                    {renderMonthDaySelector('block8_financialYearEndDay', 'block8_financialYearEndMonth', 'Financial Year End', true, TOOLTIPS.block8_financialYearEnd)}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Task 8.2: Banking & Payments */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>8.2 Banking & Payments (Mandatory)</label>
                    <Tooltip text={TOOLTIPS.block8_bankAccountRequired}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <div className="space-y-4">
                    {renderBooleanRadioGroup('block8_bankAccountRequired', 'Is the society required to maintain a bank account?', true, TOOLTIPS.block8_bankAccountRequired)}

                    {formData.block8_bankAccountRequired === true && (
                        <div className="pl-4 border-l-2 border-gray-200 space-y-4">
                            {renderMultiSelect('block8_whoSignsCheques', 'Who can sign cheques / authorise payments?',
                                ['President', 'Secretary', 'Treasurer', 'Any Committee Member', 'Specific Appointed Person(s)'], // Example options
                                true, TOOLTIPS.block8_whoSignsCheques
                            )}
                            {renderInput('block8_minSignatories', 'Minimum number of signatories required per transaction', 'number', true, TOOLTIPS.block8_minSignatories, 'e.g., 2', undefined, 1)}
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Task 8.3: Borrowing Powers */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>8.3 Borrowing Powers (Mandatory)</label>
                    <Tooltip text={TOOLTIPS.block8_borrowingPowers}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <div className="space-y-4">
                    {renderStringRadioGroup('block8_borrowingPowers', 'Who can authorise the society to borrow money?', [
                        { value: 'committee', label: 'The Committee' },
                        { value: 'general_meeting', label: 'A General Meeting' },
                        { value: 'none', label: 'Borrowing is not permitted' },
                    ], true, TOOLTIPS.block8_borrowingPowers)}

                    {formData.block8_borrowingPowers && formData.block8_borrowingPowers !== 'none' && (
                        <div className="pl-4 border-l-2 border-gray-200">
                            {renderInput('block8_borrowingLimit', 'Borrowing Limit ($)', 'number', false, TOOLTIPS.block8_borrowingLimit, 'Enter amount or leave blank for no limit', 'w-1/2', 0)}
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Task 8.4: Use of Funds & Property */}
            <div>
                <div className="flex items-center gap-2">
                    <label className={taskTitleClass}>8.4 Use of Funds & Property</label>
                    <Tooltip text={TOOLTIPS.block8_propertyAndFundsUsage}>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                    </Tooltip>
                </div>
                <p className={descriptionClass}>Specify how the society's money and assets must be used, ensuring alignment with its purposes and non-profit status.</p>
                {renderTextArea('block8_propertyAndFundsUsage', 'Description of how funds and property will be used', true, TOOLTIPS.block8_propertyAndFundsUsage, 'e.g., Funds must be used solely for the society\'s stated purposes. No member shall derive private financial gain.', 5)}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button variant="secondary" onClick={() => onSaveProgress(blockNumber)}>Save Progress</Button>
                <Button onClick={handleSave}>Mark as Complete</Button>
            </div>
        </div>
    );
};

export default Block8Finances; 