import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip } from "@/components/ui/tooltip";
import { RadioGroup } from '../../wizard/RadioGroup';
import { HelpCircle, AlertCircle } from 'lucide-react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';
import { cn } from '@/utils/cn';

// Standard Tailwind classes (copy from other blocks or define)
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";
const htmlLabelClass = "block text-sm font-medium text-gray-700 mb-1";
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1";
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3";
const errorClass = "mt-1 text-xs text-red-600";
const helpIconClass = "ml-2 text-gray-500 hover:text-gray-700 inline-block align-middle h-4 w-4 cursor-help";
const requiredMarker = <span className="text-red-500">*</span>;

// Define the props for the component, inheriting from StepProps
interface Block4MeetingsProps {
    formData: ConstitutionFormData;
    updateFormData: (field: keyof ConstitutionFormData, value: any) => void;
    onComplete: (blockNumber: number) => void;
    onSaveProgress: (blockNumber: number) => void;
    blockNumber: number;
}

// Define Tooltips specific to Block 4
const TOOLTIPS = {
    block4_agmTiming: "The Act usually requires an AGM within a certain period (e.g., 6 months) of the financial year end.",
    block4_sgmRequisition: "Specify who can force a Special General Meeting (SGM) to be held, and the threshold (e.g., 10% of members). Act s81 requires this if members can call SGMs.",
    block4_noticePeriod: "Minimum notice period required before a meeting. The Act often specifies minimums (e.g., 10 working days). Ref: Act s82.",
    block4_noticeMethods: "How will members be notified? Ensure methods are reliable and accessible to all members. Ref: Act s82.",
    block4_meetingQuorum: "Minimum number or percentage of members required to be present for a valid meeting. Common is 10-20% or a fixed number. Ref: Act s85.",
    block4_quorumAdjournment: "What happens if quorum is not met? Usually, the meeting is adjourned and rescheduled. Ref: Act s85.",
    block4_chairperson: "Who runs the general meetings? Usually the President/Chairperson. Ref: Act s86.",
    block4_chairCastingVoteGm: "Does the meeting chair get a second (casting) vote in case of a tie? This can be crucial for breaking deadlocks.",
    block4_votingMethods: "How will votes be taken? Show of hands is common, but ballots/polls may be needed for contentious issues or elections. Ref: Act s84.",
    block4_postalElectronic: "Specify if voting by post or electronically is allowed, and the procedures. Consider security and verification.",
    block4_proxy: "Can members appoint someone else (a proxy) to vote on their behalf if they cannot attend? Detail the rules. Ref: Act s88.",
    block4_minutes: "The Act requires minutes to be kept. Specify what must be recorded and how members can access them. Ref: Act s103."
};

export const Block4Meetings: React.FC<Block4MeetingsProps> = ({
    formData,
    updateFormData,
    onComplete,
    onSaveProgress,
    blockNumber,
}) => {

    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    const validateBlock4 = useCallback((currentFormData: ConstitutionFormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};
        
        // Task 4.1: AGM Timing Validation
        if (!currentFormData.block4_agmTiming) {
            newErrors.block4_agmTiming = 'AGM timing method is required.';
        } else if (currentFormData.block4_agmTiming === 'Within X months of financial year end' && (!currentFormData.block4_agmTimingMonths || currentFormData.block4_agmTimingMonths <= 0)) {
            newErrors.block4_agmTimingMonths = 'Please specify a valid number of months (e.g., 1-12).';
        } else if (currentFormData.block4_agmTiming === 'In a specific month each year' && !currentFormData.block4_agmTimingSpecificMonth) {
            newErrors.block4_agmTimingSpecificMonth = 'Please select the specific month.';
        } else if (currentFormData.block4_agmTiming === 'Other (specify)' && !currentFormData.block4_agmTimingOther?.trim()) {
            newErrors.block4_agmTimingOther = 'Please specify the other AGM timing.';
        }

        // Task 4.2: SGM Requisition Validation
        if (!currentFormData.block4_sgmRequisitionAuthority?.length) {
             newErrors.block4_sgmRequisitionAuthority = 'Please select who can require an SGM.';
        }
        if (currentFormData.block4_sgmRequisitionAuthority?.includes('A group of members')) {
            if (!currentFormData.block4_sgmRequisitionNumberType) {
                 newErrors.block4_sgmRequisitionNumberType = 'Please specify the threshold type (percentage or fixed number).';
            }
            const reqValue = currentFormData.block4_sgmRequisitionNumberValue;
            if (reqValue === undefined || reqValue <= 0) {
                 newErrors.block4_sgmRequisitionNumberValue = 'Please specify a valid threshold number/percentage.';
            } else if (currentFormData.block4_sgmRequisitionNumberType === 'percentage' && reqValue > 100) {
                 newErrors.block4_sgmRequisitionNumberValue = 'Percentage cannot exceed 100.';
            }
             // Consider adding check: fixed number shouldn't exceed total members (if known)
        }

        // Task 4.3: Notice Validation
        if (!currentFormData.block4_agmNoticePeriod || currentFormData.block4_agmNoticePeriod <= 0) {
            newErrors.block4_agmNoticePeriod = 'Please specify a valid AGM notice period (working days).';
        } else if (currentFormData.block4_agmNoticePeriod < 5) { // Example minimum, adjust based on Act/Regs
             newErrors.block4_agmNoticePeriod = 'Notice period seems short, ensure it meets minimum requirements (e.g., 5-10 working days).';
        }
        if (!currentFormData.block4_sgmNoticePeriod || currentFormData.block4_sgmNoticePeriod <= 0) {
            newErrors.block4_sgmNoticePeriod = 'Please specify a valid SGM notice period (working days).';
        } else if (currentFormData.block4_sgmNoticePeriod < 5) { // Example minimum
             newErrors.block4_sgmNoticePeriod = 'Notice period seems short, ensure it meets minimum requirements.';
        }
        if (!currentFormData.block4_noticeMethods?.length) {
             newErrors.block4_noticeMethods = 'Please select at least one method for sending notices.';
        }
        if (currentFormData.block4_noticeMethods?.includes('Other (specify)') && !currentFormData.block4_noticeMethodsOther?.trim()) {
             newErrors.block4_noticeMethodsOther = 'Please specify the other notice method.';
        }

        // Task 4.4: Quorum at General Meetings
        if (!currentFormData.block4_meetingQuorumType) {
            newErrors.block4_meetingQuorumType = 'Please specify the quorum basis (percentage or fixed number).';
        }
        const quorumValue = currentFormData.block4_meetingQuorumValue;
        if (quorumValue === undefined || quorumValue <= 0) {
            newErrors.block4_meetingQuorumValue = 'Please specify a valid quorum number/percentage.';
        } else if (currentFormData.block4_meetingQuorumType === 'percentage' && quorumValue > 100) {
            newErrors.block4_meetingQuorumValue = 'Quorum percentage cannot exceed 100.';
        }
        if (!currentFormData.block4_quorumAdjournmentProcedure?.trim()) {
            newErrors.block4_quorumAdjournmentProcedure = 'Procedure for lack of quorum is required.';
        }

        // Task 4.5: Meeting Procedure
        if (!currentFormData.block4_chairperson) {
            newErrors.block4_chairperson = 'Please specify who chairs general meetings.';
        }
        if (currentFormData.block4_chairperson === 'Other (specify)' && !currentFormData.block4_chairpersonOther?.trim()) {
            newErrors.block4_chairpersonOther = 'Please specify the other chair arrangement.';
        }
        if (currentFormData.block4_chairCastingVoteGm === undefined || currentFormData.block4_chairCastingVoteGm === null) {
            newErrors.block4_chairCastingVoteGm = 'Please specify if the Chair has a casting vote.';
        }

        // Task 4.6: Voting at General Meetings
        if (!currentFormData.block4_votingMethods?.length) {
            newErrors.block4_votingMethods = 'Please select at least one voting method.';
        }
        if (currentFormData.block4_postalVotingAllowed === true && !currentFormData.block4_postalVotingProcedure?.trim()) {
             newErrors.block4_postalVotingProcedure = 'Please describe the postal voting procedure if allowed.';
        }
        if (currentFormData.block4_electronicVotingAllowed === true && !currentFormData.block4_electronicVotingProcedure?.trim()) {
             newErrors.block4_electronicVotingProcedure = 'Please describe the electronic voting procedure if allowed.';
        }

        // Task 4.7: Proxies
        if (currentFormData.block4_proxyAllowed === undefined || currentFormData.block4_proxyAllowed === null) {
            newErrors.block4_proxyAllowed = 'Please specify if proxies are allowed.';
        }
        if (currentFormData.block4_proxyAllowed === true) {
            if (currentFormData.block4_proxyFormRequired === undefined || currentFormData.block4_proxyFormRequired === null) {
                newErrors.block4_proxyFormRequired = 'Please specify if a specific proxy form is required.';
            }
            if (!currentFormData.block4_proxyWhoCanBe) {
                newErrors.block4_proxyWhoCanBe = 'Please specify who can be appointed as a proxy.';
            }
            if (currentFormData.block4_proxyWhoCanBe === 'Other (specify)' && !currentFormData.block4_proxyWhoCanBeOther?.trim()) {
                 newErrors.block4_proxyWhoCanBeOther = 'Please specify who else can be a proxy.';
            }
             // Max number is optional, no strict validation needed unless a value is entered which is <= 0
             if (currentFormData.block4_proxyMaxNumber !== undefined && currentFormData.block4_proxyMaxNumber <= 0) {
                 newErrors.block4_proxyMaxNumber = 'Max proxies must be a positive number if specified.';
             }
            if ((currentFormData.block4_proxyFormRequired ?? false) && !currentFormData.block4_proxyLodgementDeadline) {
                 newErrors.block4_proxyLodgementDeadline = 'Please specify the proxy form lodgement deadline.';
            }
            if (currentFormData.block4_proxyLodgementDeadline === 'Other (specify)' && !currentFormData.block4_proxyLodgementDeadlineOther?.trim()) {
                 newErrors.block4_proxyLodgementDeadlineOther = 'Please specify the other deadline.';
            }
        }

        // Task 4.8: Minutes
        if (currentFormData.block4_minutesRecorded === undefined || currentFormData.block4_minutesRecorded === null || currentFormData.block4_minutesRecorded !== true) {
            newErrors.block4_minutesRecorded = 'Confirmation that minutes will be recorded is required.';
        }
        if (currentFormData.block4_minutesRecorded === true) {
            if (!currentFormData.block4_minuteRequirements?.length) {
                 newErrors.block4_minuteRequirements = 'Please select the minimum requirements for minutes.';
            }
            if (!currentFormData.block4_minuteAccess) {
                 newErrors.block4_minuteAccess = 'Please specify how members can access minutes.';
            }
            if (currentFormData.block4_minuteAccess === 'Other (specify)' && !currentFormData.block4_minuteAccessOther?.trim()) {
                 newErrors.block4_minuteAccessOther = 'Please specify the other access method.';
            }
        }
        
        return newErrors;
    }, []);

    useEffect(() => {
        const validationErrors = validateBlock4(formData);
        setLocalErrors(validationErrors);
    }, [formData, validateBlock4]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: any = value;
        if (type === 'number') {
            processedValue = value === '' ? undefined : Number(value);
        }
        updateFormData(name as keyof ConstitutionFormData, processedValue);

        // Clear error on change
        if (localErrors[name as keyof ConstitutionFormData]) {
            setLocalErrors(prev => { const next = {...prev}; delete next[name as keyof ConstitutionFormData]; return next; });
        }
    };

    const handleRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
        updateFormData(field, value);
        // Clear error on change
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
        const currentValues = (formData[field] as string[] | undefined) || [];
        let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
        updateFormData(field, newValues);
        // Clear error on change
         if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleBooleanRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
        const booleanValue = value === 'Yes' || value === true ? true : value === 'No' || value === false ? false : null;
        updateFormData(field, booleanValue);
        // Clear error on change
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
      };

    const handleSave = () => {
        const validationErrors = validateBlock4(formData);
        setLocalErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            console.log('Block 4 Validation Passed');
            onComplete(blockNumber);
        } else {
            console.log('Block 4 Validation Failed', validationErrors);
        }
    };

    const renderInput = (id: keyof ConstitutionFormData, labelText: string, type: string = 'text', required: boolean = true, tooltipText?: string, placeholder?: string, className?: string, min?: number, step?: number) => (
        <div className="mb-4">
            <label htmlFor={id} className={htmlLabelClass}>
                {labelText} {required && localErrors[id] && requiredMarker}
                {required && requiredMarker}
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
    
    const renderRadioGroup = (
        id: keyof ConstitutionFormData, 
        labelText: string,
        options: { value: string | number | boolean; label: string }[], 
        required: boolean = true, 
        tooltipText?: string
    ) => (
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
                    if (options.every(opt => typeof opt.value === 'boolean')) {
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
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Block 4: General Meetings</h3>

            {/* Task 4.1: Annual General Meeting (AGM) - Refined */}
            <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>4.1 Annual General Meeting (AGM)
                     <Tooltip text={TOOLTIPS.block4_agmTiming}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Define when the AGM must be held. (Ref: Act s80, s27(1)(j))</p>
                 
                 {renderSelect('block4_agmTiming', 'AGM Timing Method', [
                     'Within X months of financial year end', 
                     'In a specific month each year', 
                     'Other (specify)'
                 ], true, undefined, 'Select AGM Timing')}
                 
                 {formData.block4_agmTiming === 'Within X months of financial year end' &&
                    renderInput('block4_agmTimingMonths', 'Months after year end', 'number', true, undefined, 'e.g., 6', 'w-24', 1, 12) // Added max 12 implicitly
                 }
                 {formData.block4_agmTiming === 'In a specific month each year' &&
                     renderSelect('block4_agmTimingSpecificMonth', 'Specific Month', [
                         'January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'
                     ], true, undefined, 'Select Month')
                 }
                 {formData.block4_agmTiming === 'Other (specify)' &&
                    renderInput('block4_agmTimingOther', 'Specify other timing', 'text', true, undefined, 'Describe timing...')
                 }
                 {localErrors.block4_agmTiming && <p className={errorClass}>{localErrors.block4_agmTiming}</p>}
                 {localErrors.block4_agmTimingMonths && <p className={errorClass}>{localErrors.block4_agmTimingMonths}</p>}
                 {localErrors.block4_agmTimingSpecificMonth && <p className={errorClass}>{localErrors.block4_agmTimingSpecificMonth}</p>}
                 {localErrors.block4_agmTimingOther && <p className={errorClass}>{localErrors.block4_agmTimingOther}</p>}
                
                 <div className="pt-3">
                     <label htmlFor="block4_agmStandardBusiness" className={htmlLabelClass}>Standard Business at AGM (Optional):</label>
                     <textarea 
                        id="block4_agmStandardBusiness"
                        name="block4_agmStandardBusiness"
                        rows={4}
                        value={formData.block4_agmStandardBusiness || 'Standard business typically includes: Confirmation of minutes, Receiving reports (Chair, Treasurer), Receiving financial statements, Election of Committee/Officers, Appointment of Auditor (if any), General business.'}
                        onChange={handleInputChange}
                        className={baseInputClasses}
                     />
                 </div>
            </div>

            {/* Task 4.2: Special General Meetings (SGM) - Refined */}
            <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>4.2 Special General Meetings (SGM)
                      <Tooltip text={TOOLTIPS.block4_sgmRequisition}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Define how SGMs can be called. (Ref: Act s81, s27(1)(j))</p>
                 
                 {renderMultiSelect('block4_sgmRequisitionAuthority', 'Who can require an SGM to be called?', [
                     'The Committee',
                     'A group of members'
                 ], true)}
                 {localErrors.block4_sgmRequisitionAuthority && <p className={errorClass}>{localErrors.block4_sgmRequisitionAuthority}</p>}

                 {formData.block4_sgmRequisitionAuthority?.includes('A group of members') &&
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-gray-200 ml-1">
                        {renderRadioGroup('block4_sgmRequisitionNumberType', 'Member Requisition Threshold Type', [
                            { value: 'percentage', label: 'Percentage of members'},
                            { value: 'fixed', label: 'Fixed number of members'}
                        ], true)}
                        {localErrors.block4_sgmRequisitionNumberType && <p className={errorClass}>{localErrors.block4_sgmRequisitionNumberType}</p>}
                        
                        {formData.block4_sgmRequisitionNumberType &&
                            renderInput('block4_sgmRequisitionNumberValue', 
                                `Required ${formData.block4_sgmRequisitionNumberType === 'percentage' ? 'Percentage' : 'Number'}`,
                                'number', 
                                true, 
                                undefined, 
                                formData.block4_sgmRequisitionNumberType === 'percentage' ? 'e.g., 10 (%)' : 'e.g., 20',
                                'w-32',
                                1,
                                formData.block4_sgmRequisitionNumberType === 'percentage' ? 1 : undefined
                            )
                        }
                         {localErrors.block4_sgmRequisitionNumberValue && <p className={errorClass}>{localErrors.block4_sgmRequisitionNumberValue}</p>}
                    </div>
                 }
             </div>

            {/* Task 4.3: Notice of Meetings - Refined */}
             <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>4.3 Notice of Meetings
                     <Tooltip text={TOOLTIPS.block4_noticePeriod}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Specify notice periods and methods. The Act sets minimums (check current regulations). (Ref: Act s82, s27(1)(j))</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {renderInput('block4_agmNoticePeriod', 'AGM Notice Period (working days)', 'number', true, undefined, 'e.g., 10', 'w-40', 5)} 
                     {renderInput('block4_sgmNoticePeriod', 'SGM Notice Period (working days)', 'number', true, undefined, 'e.g., 10', 'w-40', 5)} 
                 </div>
                 {/* Display errors below inputs */} 
                 {localErrors.block4_agmNoticePeriod && <p className={errorClass}>{localErrors.block4_agmNoticePeriod}</p>}
                 {localErrors.block4_sgmNoticePeriod && <p className={errorClass}>{localErrors.block4_sgmNoticePeriod}</p>}
                 
                 <div className="pt-3 border-t border-gray-100">
                     {renderMultiSelect('block4_noticeMethods', 'How will meeting notices be sent?', [
                         'Email to members',
                         'Post to members',
                         'Notice on Society website',
                         'Notice in local newspaper',
                         'Other (specify)'
                     ], true, TOOLTIPS.block4_noticeMethods)}
                     {localErrors.block4_noticeMethods && <p className={errorClass}>{localErrors.block4_noticeMethods}</p>}
                     
                     {formData.block4_noticeMethods?.includes('Other (specify)') &&
                         renderInput('block4_noticeMethodsOther', 'Specify other notice method', 'text', true)
                     }
                      {localErrors.block4_noticeMethodsOther && <p className={errorClass}>{localErrors.block4_noticeMethodsOther}</p>}
                 </div>
             </div>

             {/* Task 4.4: Quorum at General Meetings */}
             <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>4.4 Quorum at General Meetings
                     <Tooltip text={TOOLTIPS.block4_meetingQuorum}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Minimum attendance for valid decisions. (Ref: Act s27(1)(j), s85)</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {renderRadioGroup('block4_meetingQuorumType', 'Quorum Basis', [
                         { value: 'percentage', label: 'Percentage of eligible members' },
                         { value: 'fixed', label: 'Fixed number of eligible members' }
                     ], true)}
                      {localErrors.block4_meetingQuorumType && <p className={errorClass}>{localErrors.block4_meetingQuorumType}</p>}

                     {formData.block4_meetingQuorumType &&
                         renderInput('block4_meetingQuorumValue',
                             `Required ${formData.block4_meetingQuorumType === 'percentage' ? 'Percentage' : 'Number'}`,
                             'number',
                             true,
                             undefined,
                             formData.block4_meetingQuorumType === 'percentage' ? 'e.g., 10 (%)' : 'e.g., 20',
                             'w-32',
                             1,
                             formData.block4_meetingQuorumType === 'percentage' ? 1 : undefined
                         )
                     }
                      {localErrors.block4_meetingQuorumValue && <p className={errorClass}>{localErrors.block4_meetingQuorumValue}</p>}
                 </div>

                 <div className="pt-3 border-t border-gray-100">
                     <label htmlFor="block4_quorumAdjournmentProcedure" className={htmlLabelClass}>Procedure if Quorum Not Met: {requiredMarker}
                         <Tooltip text={TOOLTIPS.block4_quorumAdjournment}><HelpCircle className={helpIconClass} /></Tooltip>
                     </label>
                     <textarea
                         id="block4_quorumAdjournmentProcedure"
                         name="block4_quorumAdjournmentProcedure"
                         rows={3}
                         value={formData.block4_quorumAdjournmentProcedure || 'If a quorum is not present within 30 minutes of the scheduled start time, the meeting shall be adjourned. The adjourned meeting shall be reconvened at the same time and place in the following week, and those members present at the reconvened meeting shall constitute a quorum.'}
                         onChange={handleInputChange}
                         className={cn(baseInputClasses, localErrors.block4_quorumAdjournmentProcedure ? 'border-red-500' : 'border-gray-300')}
                         placeholder='Describe adjournment procedure...'
                     />
                     {localErrors.block4_quorumAdjournmentProcedure && <p className={errorClass}>{localErrors.block4_quorumAdjournmentProcedure}</p>}
                 </div>
             </div>

             {/* Task 4.5: Meeting Procedure */}
             <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>4.5 Meeting Procedure
                     <Tooltip text={TOOLTIPS.block4_chairperson}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Who chairs meetings and do they get a casting vote? (Ref: Act s27(1)(j), s86)</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {renderSelect('block4_chairperson', 'Who Chairs General Meetings?', [
                         'President/Chairperson (or VP if absent)',
                         'Person elected by members present',
                         'Other (specify)'
                     ], true, undefined, 'Select Chairperson')}
                      {localErrors.block4_chairperson && <p className={errorClass}>{localErrors.block4_chairperson}</p>}

                     {formData.block4_chairperson === 'Other (specify)' &&
                         renderInput('block4_chairpersonOther', 'Specify other chair arrangement', 'text', true)
                     }
                      {localErrors.block4_chairpersonOther && <p className={errorClass}>{localErrors.block4_chairpersonOther}</p>}
                 </div>
                 <div className="pt-3 border-t border-gray-100">
                     {renderRadioGroup('block4_chairCastingVoteGm', 'Does the meeting Chairperson have a casting vote (in addition to their regular vote)?', [
                         { value: true, label: 'Yes' },
                         { value: false, label: 'No' }
                     ], true, TOOLTIPS.block4_chairCastingVoteGm)}
                 </div>
                  {localErrors.block4_chairCastingVoteGm && <p className={errorClass}>{localErrors.block4_chairCastingVoteGm}</p>}
             </div>

             {/* Task 4.6: Voting at General Meetings */}
             <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>4.6 Voting at General Meetings
                     <Tooltip text={TOOLTIPS.block4_votingMethods}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>How are decisions made? (Ref: Act s84, s27(1)(j))</p>
                 
                 {renderMultiSelect('block4_votingMethods', 'Allowed Voting Methods:', [
                     'Show of hands',
                     'Voice vote ("Aye"/"No")',
                     'Secret Ballot (for elections/sensitive issues)',
                     'Poll (formal count requested by members/chair)',
                     'Postal Vote (if allowed below)',
                     'Electronic Vote (if allowed below)'
                 ], true)}
                  {localErrors.block4_votingMethods && <p className={errorClass}>{localErrors.block4_votingMethods}</p>}
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                     <div>
                         {renderRadioGroup('block4_postalVotingAllowed', 'Allow Postal Voting?', [
                             { value: true, label: 'Yes' },
                             { value: false, label: 'No' }
                         ], false, TOOLTIPS.block4_postalElectronic)}
                          {localErrors.block4_postalVotingAllowed && <p className={errorClass}>{localErrors.block4_postalVotingAllowed}</p>}

                         {formData.block4_postalVotingAllowed === true &&
                            <div className="mt-2">
                                <label htmlFor="block4_postalVotingProcedure" className={`${htmlLabelClass} text-xs`}>Procedure: {requiredMarker}</label>
                                <textarea 
                                    id="block4_postalVotingProcedure"
                                    name="block4_postalVotingProcedure"
                                    rows={2}
                                    value={formData.block4_postalVotingProcedure || ''}
                                    onChange={handleInputChange}
                                    className={cn(baseInputClasses, localErrors.block4_postalVotingProcedure ? 'border-red-500' : 'border-gray-300', 'text-sm')}
                                    placeholder='Describe postal voting procedure...'
                                />
                                {localErrors.block4_postalVotingProcedure && <p className={errorClass}>{localErrors.block4_postalVotingProcedure}</p>}
                            </div>
                         }
                     </div>
                     <div>
                         {renderRadioGroup('block4_electronicVotingAllowed', 'Allow Electronic Voting?', [
                             { value: true, label: 'Yes' },
                             { value: false, label: 'No' }
                         ], false, TOOLTIPS.block4_postalElectronic)}
                          {localErrors.block4_electronicVotingAllowed && <p className={errorClass}>{localErrors.block4_electronicVotingAllowed}</p>}

                         {formData.block4_electronicVotingAllowed === true &&
                             <div className="mt-2">
                                <label htmlFor="block4_electronicVotingProcedure" className={`${htmlLabelClass} text-xs`}>Procedure: {requiredMarker}</label>
                                <textarea 
                                    id="block4_electronicVotingProcedure"
                                    name="block4_electronicVotingProcedure"
                                    rows={2}
                                    value={formData.block4_electronicVotingProcedure || ''}
                                    onChange={handleInputChange}
                                    className={cn(baseInputClasses, localErrors.block4_electronicVotingProcedure ? 'border-red-500' : 'border-gray-300', 'text-sm')}
                                    placeholder='Describe electronic voting procedure...'
                                />
                                {localErrors.block4_electronicVotingProcedure && <p className={errorClass}>{localErrors.block4_electronicVotingProcedure}</p>}
                            </div>
                         }
                     </div>
                 </div>
             </div>

             {/* Task 4.7: Proxies */}
            <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                <label className={taskTitleClass}>4.7 Proxies
                    <Tooltip text={TOOLTIPS.block4_proxy}><HelpCircle className={helpIconClass} /></Tooltip>
                </label>
                <p className={descriptionClass}>Can members appoint someone to vote for them? (Ref: Act s88, s27(1)(j))</p>
                
                {renderRadioGroup('block4_proxyAllowed', 'Allow members to appoint proxies?', [
                     { value: true, label: 'Yes' },
                     { value: false, label: 'No' }
                ], true)}
                 {localErrors.block4_proxyAllowed && <p className={errorClass}>{localErrors.block4_proxyAllowed}</p>}

                {formData.block4_proxyAllowed === true &&
                    <div className="space-y-4 pl-4 pt-4 border-t border-gray-100">
                        {renderRadioGroup('block4_proxyFormRequired', 'Is a specific proxy form required?', [
                            { value: true, label: 'Yes (form must be lodged)' },
                            { value: false, label: 'No (written authority sufficient)' }
                        ], true)}
                         {localErrors.block4_proxyFormRequired && <p className={errorClass}>{localErrors.block4_proxyFormRequired}</p>}
                        
                        {renderSelect('block4_proxyWhoCanBe', 'Who can be appointed as a proxy?', [
                            'Any other member eligible to vote',
                            'Only the Chairperson of the meeting',
                            'Other (specify)'
                        ], true, undefined, 'Select who can be a proxy')}
                         {localErrors.block4_proxyWhoCanBe && <p className={errorClass}>{localErrors.block4_proxyWhoCanBe}</p>}
                        {formData.block4_proxyWhoCanBe === 'Other (specify)' &&
                            renderInput('block4_proxyWhoCanBeOther', 'Specify who else can be proxy', 'text', true)
                        }
                         {localErrors.block4_proxyWhoCanBeOther && <p className={errorClass}>{localErrors.block4_proxyWhoCanBeOther}</p>}
                        
                        {renderInput('block4_proxyMaxNumber', 'Maximum proxies one person can hold (optional)', 'number', false, undefined, 'Leave blank for no limit', 'w-40', 0)}
                         {localErrors.block4_proxyMaxNumber && <p className={errorClass}>{localErrors.block4_proxyMaxNumber}</p>}
                        
                         {/* Conditionally require deadline only if form is required */} 
                         {renderSelect('block4_proxyLodgementDeadline', 'Proxy form lodgement deadline?', [
                             'At least 24 hours before the meeting start',
                             'At least 48 hours before the meeting start',
                             'Before the start of the meeting',
                             'Other (specify)'
                         ], formData.block4_proxyFormRequired === true, undefined, 'Select deadline')}
                         {localErrors.block4_proxyLodgementDeadline && <p className={errorClass}>{localErrors.block4_proxyLodgementDeadline}</p>}
                         {formData.block4_proxyLodgementDeadline === 'Other (specify)' &&
                             renderInput('block4_proxyLodgementDeadlineOther', 'Specify other deadline', 'text', formData.block4_proxyFormRequired === true)
                         }
                         {localErrors.block4_proxyLodgementDeadlineOther && <p className={errorClass}>{localErrors.block4_proxyLodgementDeadlineOther}</p>}
                    </div>
                }
            </div>

             {/* Task 4.8: Minutes */}
             <div className="border border-gray-200 rounded p-4 mb-4 bg-slate-50 space-y-4">
                 <label className={taskTitleClass}>4.8 Minutes of General Meetings
                      <Tooltip text={TOOLTIPS.block4_minutes}><HelpCircle className={helpIconClass} /></Tooltip>
                 </label>
                 <p className={descriptionClass}>Minutes are mandatory. Specify what they record and how members access them. (Ref: Act s103, s27(1)(j))</p>
                 
                 {renderRadioGroup('block4_minutesRecorded', 'Confirm minutes will be recorded for all general meetings?', [
                    { value: true, label: 'Yes, minutes will be kept as required by the Act.' },
                 ], true)}
                  {localErrors.block4_minutesRecorded && <p className={errorClass}>{localErrors.block4_minutesRecorded}</p>}
                 
                 {formData.block4_minutesRecorded === true &&
                    <div className="space-y-4 pl-4 pt-4 border-t border-gray-100">
                         {renderMultiSelect('block4_minuteRequirements', 'What should minutes record (minimum)?', [
                             'Date, time, and location of the meeting',
                             'Names of members present (attendees)',
                             'Apologies received from absent members',
                             'Name of the person chairing the meeting',
                             'All resolutions proposed and whether passed or failed',
                             'Voting results (counts if poll requested/held)',
                         ], true)}
                         {localErrors.block4_minuteRequirements && <p className={errorClass}>{localErrors.block4_minuteRequirements}</p>}
                         
                         {renderSelect('block4_minuteAccess', 'How can members access minutes?', [
                             'Available for inspection on request to the Secretary',
                             'Circulated to members (e.g., via email) after approval',
                             'Published on the Society website',
                             'Other (specify)'
                         ], true, undefined, 'Select access method')}
                         {localErrors.block4_minuteAccess && <p className={errorClass}>{localErrors.block4_minuteAccess}</p>}
                         {formData.block4_minuteAccess === 'Other (specify)' &&
                             renderInput('block4_minuteAccessOther', 'Specify other access method', 'text', true)
                         }
                          {localErrors.block4_minuteAccessOther && <p className={errorClass}>{localErrors.block4_minuteAccessOther}</p>}
                     </div>
                 }
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
                    Mark Block 4 as Complete
                </Button>
            </div>
        </div>
    );
};

export default Block4Meetings; 