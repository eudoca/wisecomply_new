import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip } from '../../wizard/Tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HelpCircle, AlertCircle } from 'lucide-react';
import type { StepProps, ConstitutionFormData } from '../ConstitutionWizard';
import { cn } from '../../../utils/cn';
import { Label } from '@/components/ui/label';

// Tailwind classes (assuming these are defined similar to other blocks)
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1"; 
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3";
const errorClass = "mt-1 text-xs text-red-600";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

interface Block4GeneralMeetingsProps extends StepProps {
  // Props are inherited from StepProps
}

// Validation logic for Block 4
const validateBlock4 = (data: ConstitutionFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Task 4.1 AGM Timing
  if (!data.block4_agmTiming) {
    errors.block4_agmTiming = 'Please specify the AGM timing rule.';
  }
  if (data.block4_agmTiming === 'within_x_months' && (!data.block4_agmTimingMonths || data.block4_agmTimingMonths <= 0)) {
      errors.block4_agmTimingMonths = 'Please specify a valid number of months.';
  }
  if (data.block4_agmTiming === 'specific_month' && !data.block4_agmTimingSpecificMonth) {
      errors.block4_agmTimingSpecificMonth = 'Please specify the month.';
  }
  if (data.block4_agmTiming === 'Other' && !data.block4_agmTimingOther?.trim()) {
      errors.block4_agmTimingOther = 'Please specify the other timing rule.';
  }
  if (!data.block4_agmNoticePeriod || data.block4_agmNoticePeriod <= 0) {
    errors.block4_agmNoticePeriod = 'A valid AGM notice period is required.';
  }
  if (!data.block4_agmStandardBusiness?.trim()) {
    errors.block4_agmStandardBusiness = 'Please list the standard business conducted at the AGM.';
  }

  // Task 4.2 SGM Requisition
   if (!data.block4_sgmRequisitionAuthority?.length) {
       errors.block4_sgmRequisitionAuthority = 'Please specify who can requisition an SGM.';
   }
   if (data.block4_sgmRequisitionAuthority?.includes('members') && !data.block4_sgmRequisitionNumberType) {
       errors.block4_sgmRequisitionNumberValue = 'Please specify the number or percentage of members required.'; // Use value field for error msg
   }
   if (data.block4_sgmRequisitionAuthority?.includes('members')) {
        if (data.block4_sgmRequisitionNumberType === 'fixed' && (!data.block4_sgmRequisitionNumberValue || data.block4_sgmRequisitionNumberValue <= 0)) {
            errors.block4_sgmRequisitionNumberValue = 'Please enter a valid fixed number of members.';
        } else if (data.block4_sgmRequisitionNumberType === 'percentage' && (!data.block4_sgmRequisitionNumberValue || data.block4_sgmRequisitionNumberValue <= 0 || data.block4_sgmRequisitionNumberValue > 100)) {
            errors.block4_sgmRequisitionNumberValue = 'Please enter a valid percentage (1-100).';
        }
   }
   if (!data.block4_sgmNoticePeriod || data.block4_sgmNoticePeriod <= 0) {
    errors.block4_sgmNoticePeriod = 'A valid SGM notice period is required.';
  }

  // Task 4.3 Meeting Procedures
  if (!data.block4_noticeMethods?.length) {
      errors.block4_noticeMethods = 'Please select at least one method for giving notice.';
  }
  if (data.block4_noticeMethods?.includes('other') && !data.block4_noticeMethodsOther?.trim()) {
      errors.block4_noticeMethodsOther = 'Please specify the other notice method.';
  }
  if (!data.block4_meetingQuorumType) {
       errors.block4_meetingQuorumValue = 'Please specify the quorum requirement (type).';
  }
  if (!data.block4_meetingQuorumValue || data.block4_meetingQuorumValue <= 0) {
       errors.block4_meetingQuorumValue = 'Please specify a valid quorum number or percentage.';
  } else if (data.block4_meetingQuorumType === 'percentage' && data.block4_meetingQuorumValue > 100) {
      errors.block4_meetingQuorumValue = 'Quorum percentage cannot exceed 100.';
  }
  if (!data.block4_quorumAdjournmentProcedure?.trim()){
        errors.block4_quorumAdjournmentProcedure = 'Please describe the procedure if quorum is not met.';
  }
  
  // Task 4.4 Chairperson
  if (!data.block4_chairperson) {
      errors.block4_chairperson = 'Please specify who chairs general meetings.';
  }
  if (data.block4_chairperson === 'Other' && !data.block4_chairpersonOther?.trim()) {
      errors.block4_chairpersonOther = 'Please specify the other chair arrangement.';
  }
  if (data.block4_chairCastingVoteGm === null || data.block4_chairCastingVoteGm === undefined) {
      errors.block4_chairCastingVoteGm = 'Please specify if the chair has a casting vote.';
  }

  // Task 4.5 Voting
  if (!data.block4_votingMethods?.length) {
      errors.block4_votingMethods = 'Please select at least one voting method.';
  }
  if (data.block4_postalVotingAllowed === true && !data.block4_postalVotingProcedure?.trim()){
        errors.block4_postalVotingProcedure = 'Please describe the postal voting procedure.';
  }
  if (data.block4_electronicVotingAllowed === true && !data.block4_electronicVotingProcedure?.trim()){
        errors.block4_electronicVotingProcedure = 'Please describe the electronic voting procedure.';
  }
  if (data.block4_votingMethods?.includes('postal') && (data.block4_postalVotingAllowed === null || data.block4_postalVotingAllowed === undefined)) {
      errors.block4_postalVotingAllowed = 'Please specify if postal voting is allowed.';
  }
  if (data.block4_votingMethods?.includes('electronic') && (data.block4_electronicVotingAllowed === null || data.block4_electronicVotingAllowed === undefined)) {
      errors.block4_electronicVotingAllowed = 'Please specify if electronic voting is allowed.';
  }

  // Task 4.6 Proxies
  if (data.block4_proxyAllowed === null || data.block4_proxyAllowed === undefined) {
      errors.block4_proxyAllowed = 'Please specify if proxies are allowed.';
  }
  if (data.block4_proxyAllowed === true) {
      if (data.block4_proxyFormRequired === null || data.block4_proxyFormRequired === undefined) {
          errors.block4_proxyFormRequired = 'Please specify if a specific proxy form is required.';
      }
      if (!data.block4_proxyWhoCanBe) {
           errors.block4_proxyWhoCanBe = 'Please specify who can be appointed as a proxy.';
      }
      if (data.block4_proxyWhoCanBe === 'Other' && !data.block4_proxyWhoCanBeOther?.trim()) {
          errors.block4_proxyWhoCanBeOther = 'Please specify who else can be a proxy.';
      }
      if (!data.block4_proxyLodgementDeadlineOther?.trim()) { // Assuming this is always a text field for simplicity now
          errors.block4_proxyLodgementDeadlineOther = 'Please specify the proxy form lodgement deadline.';
      }
  }

  // Task 4.7 Minutes
  if (data.block4_minutesRecorded === null || data.block4_minutesRecorded === undefined) {
      errors.block4_minutesRecorded = 'Please confirm minutes will be recorded.';
  }
  if (!data.block4_minuteRequirements?.length) {
      errors.block4_minuteRequirements = 'Please select minimum requirements for minutes.';
  }
  if (!data.block4_minuteAccess) {
       errors.block4_minuteAccess = 'Please specify how members can access minutes.';
  }
   if (data.block4_minuteAccess === 'Other' && !data.block4_minuteAccessOther?.trim()) {
       errors.block4_minuteAccessOther = 'Please specify the other access method.';
   }

  return errors;
};

const Block4GeneralMeetings: React.FC<Block4GeneralMeetingsProps> = ({ 
    formData, 
    updateFormData, 
    onComplete,
    onSaveProgress,
    blockNumber
}) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumberInput = type === 'number';
    const val = isNumberInput ? (e.target as HTMLInputElement).valueAsNumber || null : value; // Handle empty number input as null
    updateFormData(name as keyof ConstitutionFormData, val);
    setLocalErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
    const currentValues = (formData[field] as string[] | undefined) || [];
    let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
    updateFormData(field, newValues);
    setLocalErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleRadioValueChange = (field: keyof ConstitutionFormData, value: string) => {
    // Determine if this field should store a boolean
    const booleanFields: (keyof ConstitutionFormData)[] = [
      'block4_chairCastingVoteGm',
      'block4_postalVotingAllowed',
      'block4_electronicVotingAllowed',
      'block4_proxyAllowed',
      'block4_proxyFormRequired',
      'block4_minutesRecorded'
    ];

    let processedValue: string | number | boolean | null;

    if (booleanFields.includes(field)) {
      // Convert "true"/"false" string back to boolean
      processedValue = value === 'true' ? true : value === 'false' ? false : null;
    } else {
      // Keep as string for non-boolean fields (like block4_agmTiming, block4_chairperson, etc.)
      processedValue = value;
    }

    updateFormData(field, processedValue);
    setLocalErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSave = () => {
    const errors = validateBlock4(formData);
    setLocalErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Block 4 Validation Passed');
      onComplete(blockNumber);
    } else {
      console.log('Block 4 Validation Failed', errors);
      // Maybe scroll to first error
    }
  };

  return (
    <div className="space-y-6"> 
      {/* Removed H3 Heading */}
      {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">General Meetings (AGM/SGM)</h3> */}

      {/* Task 4.1: AGM Timing & Business */} 
      <div> 
        <div className="flex items-center gap-2">
          <label className={taskTitleClass}>4.1 Annual General Meeting (AGM) Timing & Business (Mandatory)</label>
          <Tooltip text="Define when the AGM must be held and what business is covered. (Ref: Act s27(1)(j))">
            <HelpCircle className="h-4 w-4 text-gray-500" />
          </Tooltip>
        </div>
        <div className="space-y-4">
           <div>
             <label htmlFor="block4_agmTiming" className={labelClass}>When must the AGM be held?</label>
             <select id="block4_agmTiming" name="block4_agmTiming" value={formData.block4_agmTiming || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_agmTiming ? 'border-red-500' : ''}`}>
                <option value="" disabled>Select timing rule...</option>
                <option value="within_x_months">Within X months of the financial year end</option>
                <option value="specific_month">In a specific month each year</option>
                <option value="Other">Other (Specify)</option>
             </select>
             {formData.block4_agmTiming === 'within_x_months' && (
                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor="block4_agmTimingMonths" className="text-sm">Months:</label>
                  <Input id="block4_agmTimingMonths" name="block4_agmTimingMonths" type="number" min="1" value={formData.block4_agmTimingMonths || ''} onChange={handleInputChange} className={`w-20 ${localErrors.block4_agmTimingMonths ? 'border-red-500' : ''}`} />
                  {localErrors.block4_agmTimingMonths && <p className={errorClass}>{localErrors.block4_agmTimingMonths}</p>}
                </div>
             )}
             {formData.block4_agmTiming === 'specific_month' && (
                <div className="mt-2">
                  <label htmlFor="block4_agmTimingSpecificMonth" className="text-sm">Month:</label>
                  <Input id="block4_agmTimingSpecificMonth" name="block4_agmTimingSpecificMonth" type="text" value={formData.block4_agmTimingSpecificMonth || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_agmTimingSpecificMonth ? 'border-red-500' : ''}`} placeholder="e.g., October" />
                   {localErrors.block4_agmTimingSpecificMonth && <p className={errorClass}>{localErrors.block4_agmTimingSpecificMonth}</p>}
                </div>
             )}
             {formData.block4_agmTiming === 'Other' && (
                <textarea id="block4_agmTimingOther" name="block4_agmTimingOther" rows={2} value={formData.block4_agmTimingOther || ''} onChange={handleInputChange} className={`${baseInputClasses} mt-2 ${localErrors.block4_agmTimingOther ? 'border-red-500' : ''}`} placeholder="Specify other timing rule..." />
             )}
             {localErrors.block4_agmTiming && <p className={errorClass}>{localErrors.block4_agmTiming}</p>}
             {localErrors.block4_agmTimingOther && <p className={errorClass}>{localErrors.block4_agmTimingOther}</p>}
          </div>
           <div>
              <label htmlFor="block4_agmNoticePeriod" className={labelClass}>Minimum Notice Period for AGM (days):</label>
              <Input id="block4_agmNoticePeriod" name="block4_agmNoticePeriod" type="number" min="1" value={formData.block4_agmNoticePeriod || ''} onChange={handleInputChange} className={`${baseInputClasses} w-24 ${localErrors.block4_agmNoticePeriod ? 'border-red-500' : ''}`} />
              {localErrors.block4_agmNoticePeriod && <p className={errorClass}>{localErrors.block4_agmNoticePeriod}</p>}
           </div>
           <div>
              <label htmlFor="block4_agmStandardBusiness" className={labelClass}>Standard Business at AGM:</label>
              <textarea id="block4_agmStandardBusiness" name="block4_agmStandardBusiness" rows={4} value={formData.block4_agmStandardBusiness || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_agmStandardBusiness ? 'border-red-500' : ''}`} placeholder="e.g., Receive reports (Chair, Treasurer), Approve accounts, Elect Committee, Appoint Auditor (if any), General business..." />
              {localErrors.block4_agmStandardBusiness && <p className={errorClass}>{localErrors.block4_agmStandardBusiness}</p>}
           </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task 4.2: SGM Requisition */} 
      <div> 
         <div className="flex items-center gap-2">
           <label className={taskTitleClass}>4.2 Special General Meeting (SGM) Requisition (Mandatory)</label>
           <Tooltip text="How can an SGM be called? (Ref: Act s27(1)(k))">
             <HelpCircle className="h-4 w-4 text-gray-500" />
           </Tooltip>
         </div>
         <div className="space-y-4">
            <div>
               <label className={labelClass}>Who can requisition (call for) an SGM?</label>
               <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                       <input type="checkbox" className={checkboxClasses} checked={formData.block4_sgmRequisitionAuthority?.includes('committee') || false} onChange={(e) => handleCheckboxGroupChange('block4_sgmRequisitionAuthority', 'committee', e.target.checked)} />
                       The Committee
                    </label>
                     <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className={checkboxClasses} checked={formData.block4_sgmRequisitionAuthority?.includes('members') || false} onChange={(e) => handleCheckboxGroupChange('block4_sgmRequisitionAuthority', 'members', e.target.checked)} />
                        A group of Members
                    </label>
                </div>
                {localErrors.block4_sgmRequisitionAuthority && <p className={errorClass}>{localErrors.block4_sgmRequisitionAuthority}</p>}

                {formData.block4_sgmRequisitionAuthority?.includes('members') && (
                  <div className="mt-2 pl-6 space-y-2 border-l-2 border-gray-200">
                     <label className={labelClass}>Number/Percentage of members needed to requisition an SGM?</label>
                     <div className="flex items-center gap-2">
                        <Input id="block4_sgmRequisitionNumberValue" name="block4_sgmRequisitionNumberValue" type="number" min="1" className={`w-24 ${localErrors.block4_sgmRequisitionNumberValue ? 'border-red-500' : ''}`} value={formData.block4_sgmRequisitionNumberValue || ''} onChange={handleInputChange} placeholder="Number" />
                        <select name="block4_sgmRequisitionNumberType" value={formData.block4_sgmRequisitionNumberType || ''} onChange={handleInputChange} className={baseInputClasses + " flex-1 py-1 text-sm"}>
                           <option value="" disabled>Select type...</option>
                           <option value="fixed">members</option>
                           <option value="percentage">percent (%) of members</option>
                       </select>
                     </div>
                     {localErrors.block4_sgmRequisitionNumberValue && <p className={errorClass}>{localErrors.block4_sgmRequisitionNumberValue}</p>}
                  </div>
                )}
            </div>
             <div>
                <label htmlFor="block4_sgmNoticePeriod" className={labelClass}>Minimum Notice Period for SGM (days):</label>
                <Input id="block4_sgmNoticePeriod" name="block4_sgmNoticePeriod" type="number" min="1" value={formData.block4_sgmNoticePeriod || ''} onChange={handleInputChange} className={`${baseInputClasses} w-24 ${localErrors.block4_sgmNoticePeriod ? 'border-red-500' : ''}`} />
                {localErrors.block4_sgmNoticePeriod && <p className={errorClass}>{localErrors.block4_sgmNoticePeriod}</p>}
            </div>
         </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task 4.3: General Meeting Procedures */}
      <div>
         <div className="flex items-center gap-2">
           <label className={taskTitleClass}>4.3 General Meeting Procedures (Mandatory)</label>
           <Tooltip text="Rules applying to both AGMs and SGMs: Notice, Quorum. (Ref: Act s27(1)(l))">
             <HelpCircle className="h-4 w-4 text-gray-500" />
           </Tooltip>
         </div>
         <div className="space-y-4">
            <div>
               <label className={labelClass}>How is notice of General Meetings given?</label>
               <div className="space-y-2">
                   <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" className={checkboxClasses} checked={formData.block4_noticeMethods?.includes('email') || false} onChange={(e) => handleCheckboxGroupChange('block4_noticeMethods', 'email', e.target.checked)} />
                      Email
                   </label>
                   <label className="flex items-center gap-2 text-sm text-gray-700">
                       <input type="checkbox" className={checkboxClasses} checked={formData.block4_noticeMethods?.includes('post') || false} onChange={(e) => handleCheckboxGroupChange('block4_noticeMethods', 'post', e.target.checked)} />
                       Post
                   </label>
                   <label className="flex items-center gap-2 text-sm text-gray-700">
                       <input type="checkbox" className={checkboxClasses} checked={formData.block4_noticeMethods?.includes('website') || false} onChange={(e) => handleCheckboxGroupChange('block4_noticeMethods', 'website', e.target.checked)} />
                       Society Website / Newsletter
                   </label>
                   <div className="flex items-start gap-2">
                       <label className="flex items-center gap-2 text-sm text-gray-700 pt-1">
                         <input type="checkbox" className={checkboxClasses} checked={formData.block4_noticeMethods?.includes('other') || false} onChange={(e) => handleCheckboxGroupChange('block4_noticeMethods', 'other', e.target.checked)} />
                         Other:
                       </label>
                       {formData.block4_noticeMethods?.includes('other') && (
                           <textarea rows={2} className={`flex-1 ${baseInputClasses} ${localErrors.block4_noticeMethodsOther ? 'border-red-500' : ''}`} value={formData.block4_noticeMethodsOther || ''} onChange={handleInputChange} name="block4_noticeMethodsOther" placeholder="Describe other method..."/>
                       )}
                   </div>
               </div>
               {localErrors.block4_noticeMethods && <p className={errorClass}>{localErrors.block4_noticeMethods}</p>}
               {localErrors.block4_noticeMethodsOther && <p className={errorClass}>{localErrors.block4_noticeMethodsOther}</p>}
            </div>
            <div>
               <label htmlFor="block4_meetingQuorumValue" className={labelClass}>Quorum for General Meetings?</label>
                <div className="flex items-center gap-2">
                  <Input id="block4_meetingQuorumValue" name="block4_meetingQuorumValue" type="number" min="1" className={`w-24 ${localErrors.block4_meetingQuorumValue ? 'border-red-500' : ''}`} value={formData.block4_meetingQuorumValue || ''} onChange={handleInputChange} placeholder="Number"/>
                   <select name="block4_meetingQuorumType" value={formData.block4_meetingQuorumType || ''} onChange={handleInputChange} className={baseInputClasses + " flex-1 py-1 text-sm"}>
                      <option value="" disabled>Select type...</option>
                      <option value="fixed">members</option>
                      <option value="percentage">percent (%) of eligible members</option>
                  </select>
                </div>
                {localErrors.block4_meetingQuorumValue && <p className={errorClass}>{localErrors.block4_meetingQuorumValue}</p>}
            </div>
            <div>
               <label htmlFor="block4_quorumAdjournmentProcedure" className={labelClass}>Procedure if quorum is not met within (e.g.) 30 minutes?</label>
               <textarea id="block4_quorumAdjournmentProcedure" name="block4_quorumAdjournmentProcedure" rows={3} value={formData.block4_quorumAdjournmentProcedure || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_quorumAdjournmentProcedure ? 'border-red-500' : ''}`} placeholder="e.g., Meeting is adjourned for one week to the same time and place. If quorum is still not met, those present constitute quorum." />
               {localErrors.block4_quorumAdjournmentProcedure && <p className={errorClass}>{localErrors.block4_quorumAdjournmentProcedure}</p>}
            </div>
         </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task 4.4: Chairperson of General Meetings */} 
      <div> 
         <div className="flex items-center gap-2">
           <label className={taskTitleClass}>4.4 Chairperson of General Meetings (Mandatory)</label>
           <Tooltip text="Who presides over AGMs/SGMs? (Ref: Act s27(1)(m))">
             <HelpCircle className="h-4 w-4 text-gray-500" />
           </Tooltip>
         </div>
         <div className="space-y-4">
            <div>
              <label htmlFor="block4_chairperson" className={labelClass}>Who chairs General Meetings?</label>
              <select id="block4_chairperson" name="block4_chairperson" value={formData.block4_chairperson || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_chairperson ? 'border-red-500' : ''}`}>
                 <option value="" disabled>Select...</option>
                 <option value="President">President/Chairperson; if absent, Vice-President; if absent, Committee Member; if none present, members elect chair.</option>
                 <option value="Elected_for_meeting">Members present elect a Chairperson for the meeting.</option>
                 <option value="Other">Other (Specify)</option>
              </select>
              {formData.block4_chairperson === 'Other' && (
                 <Input type="text" className={`mt-1 block w-full ${localErrors.block4_chairpersonOther ? 'border-red-500' : ''}`} value={formData.block4_chairpersonOther || ''} onChange={handleInputChange} name="block4_chairpersonOther" placeholder="Specify other chair arrangement..."/>
              )}
              {localErrors.block4_chairperson && <p className={errorClass}>{localErrors.block4_chairperson}</p>}
              {localErrors.block4_chairpersonOther && <p className={errorClass}>{localErrors.block4_chairpersonOther}</p>}
            </div>
            <div>
               <label className={labelClass}>Does the meeting Chairperson have a casting vote (in case of a tie)?</label>
               <RadioGroup
                 name="block4_chairCastingVoteGm"
                 value={formData.block4_chairCastingVoteGm === true ? 'true' : formData.block4_chairCastingVoteGm === false ? 'false' : ''}
                 onValueChange={(value) => handleRadioValueChange('block4_chairCastingVoteGm', value)}
                 className="flex space-x-4 mt-2"
               >
                 <div className="flex items-center space-x-2">
                   <RadioGroupItem value="true" id="b4-cast-yes" />
                   <Label htmlFor="b4-cast-yes">Yes</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="b4-cast-no" />
                    <Label htmlFor="b4-cast-no">No</Label>
                 </div>
               </RadioGroup>
               {localErrors.block4_chairCastingVoteGm && <p className={errorClass}>{localErrors.block4_chairCastingVoteGm}</p>}
            </div>
         </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task 4.5: Voting */}
      <div> 
        <div className="flex items-center gap-2">
          <label className={taskTitleClass}>4.5 Voting (Mandatory)</label>
          <Tooltip text="Define voting methods and rights at General Meetings. (Ref: Act s27(1)(n))">
            <HelpCircle className="h-4 w-4 text-gray-500" />
          </Tooltip>
        </div>
        <div className="space-y-4">
           <div>
              <label className={labelClass}>Voting Methods Allowed:</label>
               <div className="space-y-2">
                   {/* Map options for voting methods */}
                   {[ 'show_hands', 'voice', 'ballot', 'poll', 'postal', 'electronic'].map(method => (
                       <label key={method} className="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" className={checkboxClasses} checked={formData.block4_votingMethods?.includes(method) || false} onChange={(e) => handleCheckboxGroupChange('block4_votingMethods', method, e.target.checked)} />
                           {method.replace('_', ' ').replace( /\b\w/g, l => l.toUpperCase())} {/* Simple formatting */}
                       </label>
                   ))}
               </div>
               {localErrors.block4_votingMethods && <p className={errorClass}>{localErrors.block4_votingMethods}</p>}
            </div>
             {/* Conditional Postal Voting */} 
            {formData.block4_votingMethods?.includes('postal') && (
                <div className="pt-2 pl-6 border-l-2 border-gray-200 space-y-2">
                   <label className={labelClass}>Postal Voting Procedure:</label>
                    <textarea name="block4_postalVotingProcedure" rows={3} value={formData.block4_postalVotingProcedure || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_postalVotingProcedure ? 'border-red-500' : ''}`} placeholder="Describe how postal votes are managed (e.g., forms sent, return deadline, verification)." />
                    {localErrors.block4_postalVotingProcedure && <p className={errorClass}>{localErrors.block4_postalVotingProcedure}</p>}
                    <RadioGroup
                       name="block4_postalVotingAllowed"
                       value={formData.block4_postalVotingAllowed === true ? 'true' : formData.block4_postalVotingAllowed === false ? 'false' : ''}
                       onValueChange={(value) => handleRadioValueChange('block4_postalVotingAllowed', value)}
                       className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                         <RadioGroupItem value="true" id="b4-postal-yes" />
                         <Label htmlFor="b4-postal-yes">Yes</Label>
                       </div>
                       <div className="flex items-center space-x-2">
                         <RadioGroupItem value="false" id="b4-postal-no" />
                         <Label htmlFor="b4-postal-no">No</Label>
                       </div>
                    </RadioGroup>
                    {localErrors.block4_postalVotingAllowed && <p className={errorClass}>{localErrors.block4_postalVotingAllowed}</p>} 
                 </div>
            )}
            {/* Conditional Electronic Voting */} 
            {formData.block4_votingMethods?.includes('electronic') && (
                <div className="pt-2 pl-6 border-l-2 border-gray-200 space-y-2">
                   <label className={labelClass}>Electronic Voting Procedure:</label>
                    <textarea name="block4_electronicVotingProcedure" rows={3} value={formData.block4_electronicVotingProcedure || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_electronicVotingProcedure ? 'border-red-500' : ''}`} placeholder="Describe how electronic votes are managed (e.g., platform used, security, verification)." />
                    {localErrors.block4_electronicVotingProcedure && <p className={errorClass}>{localErrors.block4_electronicVotingProcedure}</p>}
                    <RadioGroup
                       name="block4_electronicVotingAllowed"
                       value={formData.block4_electronicVotingAllowed === true ? 'true' : formData.block4_electronicVotingAllowed === false ? 'false' : ''}
                       onValueChange={(value) => handleRadioValueChange('block4_electronicVotingAllowed', value)}
                       className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                         <RadioGroupItem value="true" id="b4-elec-yes" />
                         <Label htmlFor="b4-elec-yes">Yes</Label>
                       </div>
                       <div className="flex items-center space-x-2">
                         <RadioGroupItem value="false" id="b4-elec-no" />
                         <Label htmlFor="b4-elec-no">No</Label>
                       </div>
                    </RadioGroup>
                     {localErrors.block4_electronicVotingAllowed && <p className={errorClass}>{localErrors.block4_electronicVotingAllowed}</p>} 
                 </div>
            )}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task 4.6: Proxies */} 
      <div> 
         <div className="flex items-center gap-2">
           <label className={taskTitleClass}>4.6 Proxies (Optional / Good Practice)</label>
           <Tooltip text="Rules for appointing someone else to vote on a member's behalf.">
             <HelpCircle className="h-4 w-4 text-gray-500" />
           </Tooltip>
         </div>
         <div className="space-y-4">
            <div>
              <label className={labelClass}>Are proxy votes allowed at General Meetings?</label>
              <RadioGroup
                name="block4_proxyAllowed"
                value={formData.block4_proxyAllowed === true ? 'true' : formData.block4_proxyAllowed === false ? 'false' : ''}
                onValueChange={(value) => handleRadioValueChange('block4_proxyAllowed', value)}
                className="flex space-x-4 mt-2"
              >
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="b4-proxy-yes" />
                    <Label htmlFor="b4-proxy-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="b4-proxy-no" />
                    <Label htmlFor="b4-proxy-no">No</Label>
                  </div>
              </RadioGroup>
              {localErrors.block4_proxyAllowed && <p className={errorClass}>{localErrors.block4_proxyAllowed}</p>}
            </div>
            {formData.block4_proxyAllowed === true && (
              <div className="pt-4 pl-6 border-l-2 border-gray-200 space-y-4">
                <div>
                  <label className={labelClass}>Is a specific proxy form required?</label>
                  <RadioGroup
                    name="block4_proxyFormRequired"
                    value={formData.block4_proxyFormRequired === true ? 'true' : formData.block4_proxyFormRequired === false ? 'false' : ''}
                    onValueChange={(value) => handleRadioValueChange('block4_proxyFormRequired', value)}
                    className="flex space-x-4 mt-2"
                  >
                     <div className="flex items-center space-x-2">
                       <RadioGroupItem value="true" id="b4-proxyform-yes" />
                       <Label htmlFor="b4-proxyform-yes">Yes</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                       <RadioGroupItem value="false" id="b4-proxyform-no" />
                       <Label htmlFor="b4-proxyform-no">No</Label>
                     </div>
                  </RadioGroup>
                  {localErrors.block4_proxyFormRequired && <p className={errorClass}>{localErrors.block4_proxyFormRequired}</p>}
                </div>
                <div>
                   <label htmlFor="block4_proxyWhoCanBe" className={labelClass}>Who can be appointed as a proxy?</label>
                   <select id="block4_proxyWhoCanBe" name="block4_proxyWhoCanBe" value={formData.block4_proxyWhoCanBe || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_proxyWhoCanBe ? 'border-red-500' : ''}`}>
                      <option value="" disabled>Select...</option>
                      <option value="any_member">Any other member eligible to vote</option>
                      <option value="chair_only">Only the Chairperson of the meeting</option>
                      <option value="Other">Other (Specify)</option>
                   </select>
                   {formData.block4_proxyWhoCanBe === 'Other' && (
                      <Input type="text" className={`mt-1 block w-full ${localErrors.block4_proxyWhoCanBeOther ? 'border-red-500' : ''}`} value={formData.block4_proxyWhoCanBeOther || ''} onChange={handleInputChange} name="block4_proxyWhoCanBeOther" placeholder="Specify other proxy eligibility..."/>
                   )}
                   {localErrors.block4_proxyWhoCanBe && <p className={errorClass}>{localErrors.block4_proxyWhoCanBe}</p>}
                   {localErrors.block4_proxyWhoCanBeOther && <p className={errorClass}>{localErrors.block4_proxyWhoCanBeOther}</p>}
                </div>
                 <div>
                    <label htmlFor="block4_proxyMaxNumber" className={labelClass}>Maximum number of proxies one person can hold (Optional):</label>
                    <Input id="block4_proxyMaxNumber" name="block4_proxyMaxNumber" type="number" min="1" value={formData.block4_proxyMaxNumber || ''} onChange={handleInputChange} className={`${baseInputClasses} w-24`} />
                 </div>
                 <div>
                    <label htmlFor="block4_proxyLodgementDeadlineOther" className={labelClass}>Proxy form lodgement deadline:</label>
                    <Input id="block4_proxyLodgementDeadlineOther" name="block4_proxyLodgementDeadlineOther" type="text" value={formData.block4_proxyLodgementDeadlineOther || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_proxyLodgementDeadlineOther ? 'border-red-500' : ''}`} placeholder="e.g., 48 hours before the meeting starts" />
                    {localErrors.block4_proxyLodgementDeadlineOther && <p className={errorClass}>{localErrors.block4_proxyLodgementDeadlineOther}</p>}
                 </div>
              </div>
            )}
         </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task 4.7: Minutes */} 
      <div> 
         <div className="flex items-center gap-2">
           <label className={taskTitleClass}>4.7 Minutes (Mandatory)</label>
           <Tooltip text="Rules for recording and accessing minutes of General Meetings. (Ref: Act s109, s27(1)(o))">
             <HelpCircle className="h-4 w-4 text-gray-500" />
           </Tooltip>
         </div>
         <div className="space-y-4">
            <div>
               <label className={labelClass}>Confirm minutes will be recorded for all General Meetings?</label>
                <RadioGroup
                 name="block4_minutesRecorded"
                 value={formData.block4_minutesRecorded === true ? 'true' : formData.block4_minutesRecorded === false ? 'false' : ''}
                 onValueChange={(value) => handleRadioValueChange('block4_minutesRecorded', value)}
                 className="flex space-x-4 mt-2"
               >
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="b4-minutes-yes" />
                    <Label htmlFor="b4-minutes-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="b4-minutes-no" />
                    <Label htmlFor="b4-minutes-no">No (Not Recommended)</Label>
                  </div>
               </RadioGroup>
               {localErrors.block4_minutesRecorded && <p className={errorClass}>{localErrors.block4_minutesRecorded}</p>}
            </div>
             <div>
                <label className={labelClass}>Minimum information to be recorded in minutes:</label>
                <div className="space-y-2">
                    {[ { value: 'date_time_location', label: 'Date, time, and location' }, 
                       { value: 'attendees', label: 'Names of attendees (or number for large meetings)' }, 
                       { value: 'apologies', label: 'Apologies received' }, 
                       { value: 'resolutions', label: 'All resolutions proposed and whether passed or failed' }, 
                       { value: 'voting_results', label: 'Voting results (if a poll was taken)' } 
                    ].map(item => (
                        <label key={item.value} className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block4_minuteRequirements?.includes(item.value) || false} onChange={(e) => handleCheckboxGroupChange('block4_minuteRequirements', item.value, e.target.checked)} />
                             {item.label}
                         </label>
                     ))}
                 </div>
                 {localErrors.block4_minuteRequirements && <p className={errorClass}>{localErrors.block4_minuteRequirements}</p>}
            </div>
             <div>
                <label htmlFor="block4_minuteAccess" className={labelClass}>How can members access the minutes?</label>
                <select id="block4_minuteAccess" name="block4_minuteAccess" value={formData.block4_minuteAccess || ''} onChange={handleInputChange} className={`${baseInputClasses} ${localErrors.block4_minuteAccess ? 'border-red-500' : ''}`}>
                   <option value="" disabled>Select...</option>
                   <option value="available_on_request">Available for inspection upon reasonable request</option>
                   <option value="circulated_after_meeting">Circulated to members within X days after the meeting</option>
                   <option value="website">Published on the Society website</option>
                   <option value="Other">Other (Specify)</option>
                </select>
                {formData.block4_minuteAccess === 'Other' && (
                   <Input type="text" className={`mt-1 block w-full ${localErrors.block4_minuteAccessOther ? 'border-red-500' : ''}`} value={formData.block4_minuteAccessOther || ''} onChange={handleInputChange} name="block4_minuteAccessOther" placeholder="Specify other access method..."/>
                )}
                {localErrors.block4_minuteAccess && <p className={errorClass}>{localErrors.block4_minuteAccess}</p>}
                {localErrors.block4_minuteAccessOther && <p className={errorClass}>{localErrors.block4_minuteAccessOther}</p>}
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

export default Block4GeneralMeetings; 