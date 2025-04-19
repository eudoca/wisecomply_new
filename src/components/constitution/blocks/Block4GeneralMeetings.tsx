import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { RadioGroup } from '../../wizard/RadioGroup';
import { Tooltip } from '../../ui/Tooltip';
import { Button } from '../../ui/Button';
import { HelpCircle } from 'lucide-react';
import type { StepProps, ConstitutionFormData } from '../ConstitutionWizard';

// Standard Tailwind classes
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";

// Standard AGM Business Text
const standardAGMBusinessText = `- Confirmation of minutes of the previous General Meeting\n- Receiving the Committee's report on the activities of the Society during the preceding financial year\n- Receiving the Society's financial statements for the preceding financial year\n- Election of Committee members (if applicable)\n- Appointment of Auditor/Reviewer (if applicable)\n- Any other business specified in the notice of meeting`;

const Block4GeneralMeetings: React.FC<Omit<StepProps, 'errors'>> = ({ formData, updateFormData, onComplete, blockNumber }) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Helper for Checkbox Groups
  const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
    const currentValues = (formData[field] as string[] | undefined) || [];
    let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
    // Clear 'Other' text if 'Other' checkbox is unchecked
    if ((field === 'block4_agmNoticeMethod' || field === 'block4_sgmNoticeMethod') && value === 'Other' && !checked) {
      updateFormData(field === 'block4_agmNoticeMethod' ? 'block4_agmNoticeMethodOther' : 'block4_sgmNoticeMethodOther', '');
    }
    // Clear SGM member request fields if that option is unchecked
    if (field === 'block4_sgmTriggerMethod' && value === 'member_request' && !checked) {
        updateFormData('block4_sgmMemberRequestNumber', undefined);
        updateFormData('block4_sgmMemberRequestPercent', undefined);
    }
    updateFormData(field, newValues);
    setLocalErrors({});
  };
  
  // Simplified handler for single checkboxes mapped to boolean state
  const handleSingleCheckboxChange = (field: keyof ConstitutionFormData, checked: boolean) => {
      updateFormData(field, checked);
      setLocalErrors({});
  };

  // Validation logic for Block 4
  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Task 4.1 Validation
    if (!formData.block4_agmTiming) {
        newErrors.block4_agmTiming = 'Please specify the timing of the AGM.';
        isValid = false;
    }
    if (formData.block4_agmTiming === 'Other' && !formData.block4_agmTimingOther?.trim()) {
        newErrors.block4_agmTimingOther = 'Please specify the other AGM timing details.';
        isValid = false;
    }
    if (!formData.block4_agmStandardBusiness?.trim()) {
        newErrors.block4_agmStandardBusiness = 'Please list the standard business for the AGM.';
        isValid = false;
    }
    
    // Task 4.2 Validation
    if (!formData.block4_agmNoticePeriod || formData.block4_agmNoticePeriod <= 0) {
        newErrors.block4_agmNoticePeriod = 'Please specify a valid notice period for the AGM (minimum 14 days recommended).';
        isValid = false;
    }
    if (!formData.block4_agmNoticeMethod?.length) {
        newErrors.block4_agmNoticeMethod = 'Please select at least one method for giving AGM notice.';
        isValid = false;
    }
    if (formData.block4_agmNoticeMethod?.includes('Other') && !formData.block4_agmNoticeMethodOther?.trim()) {
        newErrors.block4_agmNoticeMethodOther = 'Please specify the other notice method.';
        isValid = false;
    }

    // Task 4.3 Validation
     if (!formData.block4_agmQuorumValue || formData.block4_agmQuorumValue <= 0) {
        newErrors.block4_agmQuorumValue = 'Please specify a valid quorum number or percentage for the AGM.';
        isValid = false;
    } else if (formData.block4_agmQuorumType === 'percentage' && formData.block4_agmQuorumValue > 100) {
        newErrors.block4_agmQuorumValue = 'Quorum percentage cannot exceed 100.';
        isValid = false;
    }
    if (!formData.block4_agmAdjournmentRule) {
        newErrors.block4_agmAdjournmentRule = 'Please specify the rule for adjournment if quorum is not met.';
        isValid = false;
    }
    if (formData.block4_agmAdjournmentRule === 'Other' && !formData.block4_agmAdjournmentRuleOther?.trim()) {
        newErrors.block4_agmAdjournmentRuleOther = 'Please specify the other adjournment rule.';
        isValid = false;
    }
    
    // Task 4.4 Validation
     if (!formData.block4_gmChair) {
        newErrors.block4_gmChair = 'Please specify who chairs General Meetings.';
        isValid = false;
    }
    if (formData.block4_gmChair === 'Other' && !formData.block4_gmChairOther?.trim()) {
        newErrors.block4_gmChairOther = 'Please specify the other chair arrangement.';
        isValid = false;
    }
    if (formData.block4_gmChairCastingVote === null || formData.block4_gmChairCastingVote === undefined) {
        newErrors.block4_gmChairCastingVote = 'Please specify if the Chairperson has a casting vote.';
        isValid = false;
    }
    
    // Task 4.5 Validation
    if (!formData.block4_votingRights) {
        newErrors.block4_votingRights = 'Please specify members&apos; voting rights.';
        isValid = false;
    }
    if (formData.block4_votingRights === 'Other' && !formData.block4_votingRightsOther?.trim()) {
        newErrors.block4_votingRightsOther = 'Please specify the other voting rights arrangement.';
        isValid = false;
    }
     if (formData.block4_showOfHandsDefault === null || formData.block4_showOfHandsDefault === undefined) {
        newErrors.block4_showOfHandsDefault = 'Please specify the default voting method.';
        isValid = false;
    }
    if (!formData.block4_pollConditions?.trim()) {
        newErrors.block4_pollConditions = 'Please specify the conditions under which a poll can be demanded.';
        isValid = false;
    }
    if (formData.block4_proxiesAllowed === null || formData.block4_proxiesAllowed === undefined) {
        newErrors.block4_proxiesAllowed = 'Please specify if proxies are allowed.';
        isValid = false;
    }
    if (formData.block4_proxiesAllowed === true && !formData.block4_proxyFormRequirements?.trim()) {
        newErrors.block4_proxyFormRequirements = 'Please specify proxy form requirements.';
        isValid = false;
    }
     if (formData.block4_proxiesAllowed === true && !formData.block4_proxyLodgementDeadline?.trim()) {
        newErrors.block4_proxyLodgementDeadline = 'Please specify the proxy lodgement deadline.';
        isValid = false;
    }
    
    // Task 4.6 Validation
    if (!formData.block4_sgmTriggerMethod?.length) {
        newErrors.block4_sgmTriggerMethod = 'Please specify how a Special General Meeting (SGM) can be triggered.';
        isValid = false;
    }
    if (formData.block4_sgmTriggerMethod?.includes('member_request')) {
        const hasNumber = formData.block4_sgmMemberRequestNumber && formData.block4_sgmMemberRequestNumber > 0;
        const hasPercent = formData.block4_sgmMemberRequestPercent && formData.block4_sgmMemberRequestPercent > 0 && formData.block4_sgmMemberRequestPercent <= 100;
        if (!hasNumber && !hasPercent) {
            newErrors.block4_sgmMemberRequestThreshold = 'Please specify either a number or percentage of members required to request an SGM.';
            isValid = false;
        }
        // Optionally add validation to ensure only one is filled? Or prefer one if both filled?
    }
     if (!formData.block4_sgmNoticePeriod || formData.block4_sgmNoticePeriod <= 0) {
        newErrors.block4_sgmNoticePeriod = 'Please specify a valid notice period for SGMs (minimum 14 days recommended).';
        isValid = false;
    }
     if (!formData.block4_sgmNoticeMethod?.length) {
        newErrors.block4_sgmNoticeMethod = 'Please select at least one method for giving SGM notice.';
        isValid = false;
    }
    if (formData.block4_sgmNoticeMethod?.includes('Other') && !formData.block4_sgmNoticeMethodOther?.trim()) {
        newErrors.block4_sgmNoticeMethodOther = 'Please specify the other SGM notice method.';
        isValid = false;
    }
    
    // Task 4.7 Validation
     if (formData.block4_remoteParticipation === null || formData.block4_remoteParticipation === undefined) {
        newErrors.block4_remoteParticipation = 'Please specify if remote participation in General Meetings is allowed.';
        isValid = false;
    }

    setLocalErrors(newErrors);

    if (isValid) {
      console.log('Block 4 Validation Passed');
      onComplete(blockNumber);
    } else {
      console.log('Block 4 Validation Failed', newErrors);
    }
  };

  return (
    <div className="space-y-6">
        {/* --- Task 4.1: Annual General Meeting (AGM) Timing & Business [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">4.1 Annual General Meeting (AGM) (Mandatory)</label>
                 {/* Tooltip removed */}
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">Define AGM timing (Act s39) and standard business.</p> {/* Text added */} 
             <div>
                <label htmlFor="block4_agmTiming" className="block text-xs font-medium text-gray-700 mb-1">When must the AGM be held?</label>
                <select id="block4_agmTiming" name="block4_agmTiming" className={`${baseInputClasses} ${localErrors.block4_agmTiming ? 'border-red-500' : ''}`} value={formData.block4_agmTiming || 'within_6_months'} onChange={(e) => updateFormData('block4_agmTiming', e.target.value)}>
                    <option value="within_6_months">Within 6 months after the end of the Society&apos;s financial year (Required by Act)</option>
                    <option value="within_5_months">Within 5 months after the end of the Society&apos;s financial year</option>
                    <option value="by_date">By a specific date each year (e.g., 31st October)</option>
                    <option value="Other">Other (Specify)</option>
                </select>
                {(formData.block4_agmTiming === 'by_date' || formData.block4_agmTiming === 'Other') && (
                    <Input type="text" className={`mt-1 block w-full ${localErrors.block4_agmTimingOther ? 'border-red-500' : ''}`} value={formData.block4_agmTimingOther || ''} onChange={(e) => updateFormData('block4_agmTimingOther', e.target.value)} placeholder="Specify date or other timing..."/>
                )}
                 {localErrors.block4_agmTiming && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmTiming}</p>}
                {localErrors.block4_agmTimingOther && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmTimingOther}</p>}
            </div>
            
            {/* ADDED AGM BUSINESS TEXTAREA */}
            <div className="pt-4 border-t border-gray-100">
                <label htmlFor="block4_agmStandardBusiness" className="block text-xs font-medium text-gray-700 mb-1">Standard business to be conducted at the AGM:</label>
                <textarea 
                    id="block4_agmStandardBusiness" 
                    name="block4_agmStandardBusiness" 
                    rows={6} 
                    className={`${baseInputClasses} ${localErrors.block4_agmStandardBusiness ? 'border-red-500' : ''}`} 
                    value={formData.block4_agmStandardBusiness === undefined ? standardAGMBusinessText : formData.block4_agmStandardBusiness} 
                    onChange={(e) => updateFormData('block4_agmStandardBusiness', e.target.value)} 
                />
                {localErrors.block4_agmStandardBusiness && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmStandardBusiness}</p>}
                <p className="mt-1 text-xs text-gray-500 italic">List the minimum required business. Specific motions require separate notice.</p>
            </div>
        </div>

        {/* --- Task 4.2: Notice for AGMs [MANDATORY] --- */}
         <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">4.2 Notice for AGMs (Mandatory)</label>
                  {/* Tooltip removed */}
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Adequate notice ensures members can attend. Minimum 14 clear days often recommended. (Ref: Act s40, s41)</p> {/* Text added */} 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label htmlFor="block4_agmNoticePeriod" className="block text-xs font-medium text-gray-700 mb-1">Minimum notice period for AGM (days)?</label>
                     <Input id="block4_agmNoticePeriod" name="block4_agmNoticePeriod" type="number" min="1" placeholder="e.g., 14" className={`w-24 ${localErrors.block4_agmNoticePeriod ? 'border-red-500' : ''}`} value={formData.block4_agmNoticePeriod || ''} onChange={(e) => updateFormData('block4_agmNoticePeriod', e.target.valueAsNumber)} />
                     {localErrors.block4_agmNoticePeriod && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmNoticePeriod}</p>}
                 </div>
                 <div>
                     <label className="block text-xs font-medium text-gray-700 mb-1">How will notice be given?</label>
                     <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block4_agmNoticeMethod?.includes('email') || false} onChange={(e) => handleCheckboxGroupChange('block4_agmNoticeMethod', 'email', e.target.checked)} /> Email to members
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block4_agmNoticeMethod?.includes('post') || false} onChange={(e) => handleCheckboxGroupChange('block4_agmNoticeMethod', 'post', e.target.checked)} /> Post to members
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block4_agmNoticeMethod?.includes('website') || false} onChange={(e) => handleCheckboxGroupChange('block4_agmNoticeMethod', 'website', e.target.checked)} /> Notice on Society website
                        </label>
                         <div className="flex items-center gap-2">
                             <input type="checkbox" className={checkboxClasses} checked={formData.block4_agmNoticeMethod?.includes('Other') || false} onChange={(e) => handleCheckboxGroupChange('block4_agmNoticeMethod', 'Other', e.target.checked)} />
                             <Input 
                                type="text" 
                                placeholder="Other method..." 
                                value={formData.block4_agmNoticeMethodOther || ''} 
                                onChange={(e) => updateFormData('block4_agmNoticeMethodOther', e.target.value)}
                                disabled={!formData.block4_agmNoticeMethod?.includes('Other')} 
                                className={`flex-1 text-sm ${!formData.block4_agmNoticeMethod?.includes('Other') ? 'bg-gray-100 cursor-not-allowed' : ''} ${localErrors.block4_agmNoticeMethodOther ? 'border-red-500' : ''}`}
                            />
                         </div>
                     </div>
                     {localErrors.block4_agmNoticeMethod && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmNoticeMethod}</p>}
                     {localErrors.block4_agmNoticeMethodOther && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmNoticeMethodOther}</p>}
                 </div>
             </div>
        </div>

        {/* --- Task 4.3: Quorum for AGMs [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">4.3 Quorum for AGMs (Mandatory)</label>
                  {/* Tooltip removed */}
            </div>
              <p className="text-sm text-gray-600 mt-1 mb-3">Minimum number of members needed to conduct business. (Ref: Act s42)</p> {/* Text added */} 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                     <label htmlFor="block4_agmQuorumValue" className="block text-xs font-medium text-gray-700 mb-1">Quorum required for AGM?</label>
                     <div className="flex items-center gap-2">
                        <Input id="block4_agmQuorumValue" name="block4_agmQuorumValue" type="number" min="1" className={`w-24 ${localErrors.block4_agmQuorumValue ? 'border-red-500' : ''}`} value={formData.block4_agmQuorumValue || ''} onChange={(e) => updateFormData('block4_agmQuorumValue', e.target.valueAsNumber)} placeholder="Number"/>
                        <select className={baseInputClasses + " flex-1 py-1 text-sm"} value={formData.block4_agmQuorumType || 'number'} onChange={(e) => updateFormData('block4_agmQuorumType', e.target.value)}>
                             <option value="number">members</option>
                             <option value="percentage">percent (%) of eligible members</option>
                         </select>
                     </div>
                     {localErrors.block4_agmQuorumValue && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmQuorumValue}</p>}
                </div>
                 <div>
                    <label htmlFor="block4_agmAdjournmentRule" className="block text-xs font-medium text-gray-700 mb-1">If quorum is not present within (e.g.) 30 minutes?</label>
                    <select id="block4_agmAdjournmentRule" name="block4_agmAdjournmentRule" className={`${baseInputClasses} ${localErrors.block4_agmAdjournmentRule ? 'border-red-500' : ''}`} value={formData.block4_agmAdjournmentRule || ''} onChange={(e) => updateFormData('block4_agmAdjournmentRule', e.target.value)}>
                        <option value="" disabled>Select...</option>
                        <option value="adjourn_reschedule">Adjourn meeting and reschedule</option>
                        <option value="adjourn_proceed_later">Adjourn; if quorum not met at rescheduled meeting, proceed with members present</option>
                        <option value="proceed_reduced_quorum">Proceed with reduced quorum (specify)</option>
                        <option value="Other">Other (Specify)</option>
                    </select>
                     {(formData.block4_agmAdjournmentRule === 'proceed_reduced_quorum' || formData.block4_agmAdjournmentRule === 'Other') && (
                        <Input type="text" className={`mt-1 block w-full ${localErrors.block4_agmAdjournmentRuleOther ? 'border-red-500' : ''}`} value={formData.block4_agmAdjournmentRuleOther || ''} onChange={(e) => updateFormData('block4_agmAdjournmentRuleOther', e.target.value)} placeholder="Specify reduced quorum or other rule..."/>
                    )}
                    {localErrors.block4_agmAdjournmentRule && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmAdjournmentRule}</p>}
                    {localErrors.block4_agmAdjournmentRuleOther && <p className="mt-1 text-xs text-red-600">{localErrors.block4_agmAdjournmentRuleOther}</p>}
                 </div>
             </div>
        </div>

        {/* --- Task 4.4: Chairing General Meetings [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">4.4 Chairing General Meetings (Mandatory)</label>
                  {/* Tooltip removed */}
            </div>
              <p className="text-sm text-gray-600 mt-1 mb-3">Who runs the meeting? Usually the President/Chairperson. (Ref: Act s43)</p> {/* Text added */} 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="block4_gmChair" className="block text-xs font-medium text-gray-700 mb-1">Who chairs General Meetings (AGMs & SGMs)?</label>
                     <select id="block4_gmChair" name="block4_gmChair" className={`${baseInputClasses} ${localErrors.block4_gmChair ? 'border-red-500' : ''}`} value={formData.block4_gmChair || 'President'} onChange={(e) => updateFormData('block4_gmChair', e.target.value)}>
                         <option value="President">President/Chairperson; if absent, Vice-President; if both absent, Committee elects chair</option>
                         <option value="Elected">Members present elect a Chairperson for the meeting</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                      {formData.block4_gmChair === 'Other' && (
                        <Input type="text" className={`mt-1 block w-full ${localErrors.block4_gmChairOther ? 'border-red-500' : ''}`} value={formData.block4_gmChairOther || ''} onChange={(e) => updateFormData('block4_gmChairOther', e.target.value)} placeholder="Specify other chair arrangement..."/>
                     )}
                     {localErrors.block4_gmChair && <p className="mt-1 text-xs text-red-600">{localErrors.block4_gmChair}</p>}
                     {localErrors.block4_gmChairOther && <p className="mt-1 text-xs text-red-600">{localErrors.block4_gmChairOther}</p>}
                 </div>
                  <div>
                      <RadioGroup
                         label="Does the meeting Chairperson have a casting vote (in case of a tie)?"
                         name="block4_gmChairCastingVote"
                         options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                         value={formData.block4_gmChairCastingVote}
                         onChange={(value) => updateFormData('block4_gmChairCastingVote', value as boolean)}
                     />
                     {localErrors.block4_gmChairCastingVote && <p className="mt-1 text-xs text-red-600">{localErrors.block4_gmChairCastingVote}</p>}
                 </div>
            </div>
        </div>

        {/* --- Task 4.5: Voting Rights & Procedures [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">4.5 Voting Rights & Procedures (Mandatory)</label>
                  {/* Tooltip removed */}
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Define who can vote and how. Consider different membership categories if applicable. (Ref: Act s27(1)(e), s44)</p> {/* Text added */} 
            <div>
                 <label htmlFor="block4_votingRights" className="block text-xs font-medium text-gray-700 mb-1">Voting rights of members?</label>
                 <select id="block4_votingRights" name="block4_votingRights" className={`${baseInputClasses} ${localErrors.block4_votingRights ? 'border-red-500' : ''}`} value={formData.block4_votingRights || 'one_member_one_vote'} onChange={(e) => updateFormData('block4_votingRights', e.target.value)}>
                     <option value="one_member_one_vote">One member, one vote (for all eligible voting members)</option>
                     <option value="category_based">Different rights based on membership category (Specify)</option>
                     <option value="Other">Other (Specify)</option>
                 </select>
                 {(formData.block4_votingRights === 'category_based' || formData.block4_votingRights === 'Other') && (
                     <Input type="text" className={`mt-1 block w-full ${localErrors.block4_votingRightsOther ? 'border-red-500' : ''}`} value={formData.block4_votingRightsOther || ''} onChange={(e) => updateFormData('block4_votingRightsOther', e.target.value)} placeholder="Specify voting rights details..."/>
                 )}
                 {localErrors.block4_votingRights && <p className="mt-1 text-xs text-red-600">{localErrors.block4_votingRights}</p>}
                 {localErrors.block4_votingRightsOther && <p className="mt-1 text-xs text-red-600">{localErrors.block4_votingRightsOther}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div>
                    <RadioGroup
                         label="Is voting normally by show of hands?"
                         name="block4_showOfHandsDefault"
                         options={[{ value: true, label: 'Yes' }, { value: false, label: 'No (e.g., always ballot)' }]}
                         value={formData.block4_showOfHandsDefault !== null ? formData.block4_showOfHandsDefault : true} // Default Yes
                         onChange={(value) => updateFormData('block4_showOfHandsDefault', value as boolean)}
                     />
                     {localErrors.block4_showOfHandsDefault && <p className="mt-1 text-xs text-red-600">{localErrors.block4_showOfHandsDefault}</p>}
                 </div>
                 <div>
                    <label htmlFor="block4_pollConditions" className="block text-xs font-medium text-gray-700 mb-1">Under what conditions can a poll (secret ballot) be demanded?</label>
                    <textarea id="block4_pollConditions" name="block4_pollConditions" rows={2} className={`${baseInputClasses} ${localErrors.block4_pollConditions ? 'border-red-500' : ''}`} value={formData.block4_pollConditions || 'If demanded by the Chairperson or by at least [e.g., 5] members present.'} onChange={(e) => updateFormData('block4_pollConditions', e.target.value)} />
                    {localErrors.block4_pollConditions && <p className="mt-1 text-xs text-red-600">{localErrors.block4_pollConditions}</p>}
                 </div>
            </div>
             <div className="pt-4 border-t border-gray-100">
                <RadioGroup
                     label="Are proxy votes allowed at General Meetings?"
                     name="block4_proxiesAllowed"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block4_proxiesAllowed}
                     onChange={(value) => updateFormData('block4_proxiesAllowed', value as boolean)}
                 />
                 {localErrors.block4_proxiesAllowed && <p className="mt-1 text-xs text-red-600">{localErrors.block4_proxiesAllowed}</p>}
                 {formData.block4_proxiesAllowed === true && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                             <label htmlFor="block4_proxyFormRequirements" className="block text-xs font-medium text-gray-700 mb-1">Proxy form requirements:</label>
                            <textarea id="block4_proxyFormRequirements" name="block4_proxyFormRequirements" rows={2} className={`${baseInputClasses} ${localErrors.block4_proxyFormRequirements ? 'border-red-500' : ''}`} value={formData.block4_proxyFormRequirements || 'Must be in writing, signed by the member, and state the proxy holder&apos;s name.'} onChange={(e) => updateFormData('block4_proxyFormRequirements', e.target.value)} />
                             {localErrors.block4_proxyFormRequirements && <p className="mt-1 text-xs text-red-600">{localErrors.block4_proxyFormRequirements}</p>}
                        </div>
                        <div>
                             <label htmlFor="block4_proxyLodgementDeadline" className="block text-xs font-medium text-gray-700 mb-1">Proxy form lodgement deadline:</label>
                            <textarea id="block4_proxyLodgementDeadline" name="block4_proxyLodgementDeadline" rows={2} className={`${baseInputClasses} ${localErrors.block4_proxyLodgementDeadline ? 'border-red-500' : ''}`} value={formData.block4_proxyLodgementDeadline || 'Must be received by the Secretary at least [e.g., 48] hours before the meeting.'} onChange={(e) => updateFormData('block4_proxyLodgementDeadline', e.target.value)} />
                             {localErrors.block4_proxyLodgementDeadline && <p className="mt-1 text-xs text-red-600">{localErrors.block4_proxyLodgementDeadline}</p>}
                        </div>
                     </div>
                 )}
            </div>
        </div>
        
        {/* --- Task 4.6: Special General Meetings (SGMs) [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">4.6 Special General Meetings (SGMs) (Mandatory)</label>
                  {/* Tooltip removed */}
            </div>
              <p className="text-sm text-gray-600 mt-1 mb-3">How members can call meetings for specific urgent business outside the AGM cycle. (Ref: Act s38)</p> {/* Text added */} 
             <div>
                 <label className="block text-xs font-medium text-gray-700 mb-1">How can an SGM be triggered?</label>
                 <div className="space-y-2">
                     <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className={checkboxClasses} checked={formData.block4_sgmTriggerMethod?.includes('committee_decision') || false} onChange={(e) => handleCheckboxGroupChange('block4_sgmTriggerMethod', 'committee_decision', e.target.checked)} /> By decision of the Committee
                    </label>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                        <input type="checkbox" className={checkboxClasses} checked={formData.block4_sgmTriggerMethod?.includes('member_request') || false} onChange={(e) => handleCheckboxGroupChange('block4_sgmTriggerMethod', 'member_request', e.target.checked)} />
                        On written request of members (Specify threshold):
                         {formData.block4_sgmTriggerMethod?.includes('member_request') && (
                            <div className="flex flex-col sm:flex-row gap-2 ml-2">
                                 <div className="flex items-center gap-1">
                                    <Input type="number" min="1" placeholder="Number" className={`w-20 ${localErrors.block4_sgmMemberRequestThreshold ? 'border-red-500' : ''}`} value={formData.block4_sgmMemberRequestNumber || ''} onChange={(e) => updateFormData('block4_sgmMemberRequestNumber', e.target.valueAsNumber)} /> members
                                </div>
                                 <span className="text-xs self-center">OR</span>
                                 <div className="flex items-center gap-1">
                                    <Input type="number" min="1" max="100" placeholder="Percent" className={`w-20 ${localErrors.block4_sgmMemberRequestThreshold ? 'border-red-500' : ''}`} value={formData.block4_sgmMemberRequestPercent || ''} onChange={(e) => updateFormData('block4_sgmMemberRequestPercent', e.target.valueAsNumber)} /> % of members
                                </div>
                            </div>
                         )}
                    </div>
                 </div>
                  {localErrors.block4_sgmTriggerMethod && <p className="mt-1 text-xs text-red-600">{localErrors.block4_sgmTriggerMethod}</p>}
                  {localErrors.block4_sgmMemberRequestThreshold && <p className="mt-1 text-xs text-red-600">{localErrors.block4_sgmMemberRequestThreshold}</p>}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div>
                     <label htmlFor="block4_sgmNoticePeriod" className="block text-xs font-medium text-gray-700 mb-1">Minimum notice period for SGM (days)?</label>
                     <Input id="block4_sgmNoticePeriod" name="block4_sgmNoticePeriod" type="number" min="1" placeholder="e.g., 14" className={`w-24 ${localErrors.block4_sgmNoticePeriod ? 'border-red-500' : ''}`} value={formData.block4_sgmNoticePeriod || ''} onChange={(e) => updateFormData('block4_sgmNoticePeriod', e.target.valueAsNumber)} />
                     {localErrors.block4_sgmNoticePeriod && <p className="mt-1 text-xs text-red-600">{localErrors.block4_sgmNoticePeriod}</p>}
                 </div>
                 <div>
                     <label className="block text-xs font-medium text-gray-700 mb-1">How will notice for SGM be given?</label>
                     <div className="space-y-1">
                         <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block4_sgmNoticeMethod?.includes('email') || false} onChange={(e) => handleCheckboxGroupChange('block4_sgmNoticeMethod', 'email', e.target.checked)} /> Email to members
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block4_sgmNoticeMethod?.includes('post') || false} onChange={(e) => handleCheckboxGroupChange('block4_sgmNoticeMethod', 'post', e.target.checked)} /> Post to members
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block4_sgmNoticeMethod?.includes('website') || false} onChange={(e) => handleCheckboxGroupChange('block4_sgmNoticeMethod', 'website', e.target.checked)} /> Notice on Society website
                        </label>
                         <div className="flex items-center gap-2">
                             <input type="checkbox" className={checkboxClasses} checked={formData.block4_sgmNoticeMethod?.includes('Other') || false} onChange={(e) => handleCheckboxGroupChange('block4_sgmNoticeMethod', 'Other', e.target.checked)} />
                             <Input 
                                type="text" 
                                placeholder="Other method..." 
                                value={formData.block4_sgmNoticeMethodOther || ''} 
                                onChange={(e) => updateFormData('block4_sgmNoticeMethodOther', e.target.value)}
                                disabled={!formData.block4_sgmNoticeMethod?.includes('Other')} 
                                className={`flex-1 text-sm ${!formData.block4_sgmNoticeMethod?.includes('Other') ? 'bg-gray-100 cursor-not-allowed' : ''} ${localErrors.block4_sgmNoticeMethodOther ? 'border-red-500' : ''}`}
                            />
                         </div>
                     </div>
                     {localErrors.block4_sgmNoticeMethod && <p className="mt-1 text-xs text-red-600">{localErrors.block4_sgmNoticeMethod}</p>}
                     {localErrors.block4_sgmNoticeMethodOther && <p className="mt-1 text-xs text-red-600">{localErrors.block4_sgmNoticeMethodOther}</p>}
                 </div>
             </div>
        </div>

        {/* --- Task 4.7: Remote Participation [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md">
             <RadioGroup
                 label="4.7 Can members participate in General Meetings using technology? (Mandatory)"
                 name="block4_remoteParticipation"
                 options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                 value={formData.block4_remoteParticipation !== null ? formData.block4_remoteParticipation : true} // Default Yes
                 onChange={(value) => updateFormData('block4_remoteParticipation', value as boolean)}
             />
             {localErrors.block4_remoteParticipation && <p className="mt-1 text-xs text-red-600">{localErrors.block4_remoteParticipation}</p>}
        </div>

      {/* Save Button for the Block */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button onClick={handleSave} variant="primary">Save & Close Section 4</Button>
      </div>
    </div>
  );
};

export default Block4GeneralMeetings; 