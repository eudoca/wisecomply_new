import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import type { ConstitutionFormData } from '../ConstitutionWizard';
import { Label } from '@/components/ui/label';

// Standard Tailwind classes for inputs
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";
const labelClass = "block text-sm font-medium text-gray-700 mb-1"; // Standard label size for inputs/selects etc.
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1"; // Consistent task title
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3"; // Consistent description
const errorClass = "mt-1 text-xs text-red-600"; // Error message class

// Define the props for the component
interface Block2MembershipProps {
  formData: ConstitutionFormData;
  updateFormData: (field: keyof ConstitutionFormData, value: any) => void;
  onComplete: (blockNumber: number) => void;
  onSaveProgress: (blockNumber: number) => void;
  blockNumber: number;
}

const Block2Membership: React.FC<Block2MembershipProps> = ({ 
    formData, 
    updateFormData, 
    onComplete,
    onSaveProgress,
    blockNumber
}) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Helper for Checkbox Groups mapped to Array state
  const handleCheckboxGroupChange = (
    field: keyof ConstitutionFormData,
    value: string,
    checked: boolean
  ) => {
    const currentValues = (formData[field] as string[] | undefined) || [];
    let newValues;
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((item) => item !== value);
    }
    updateFormData(field, newValues);
    setLocalErrors({}); // Clear errors on interaction
  };

  // Validation logic for Block 2
  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Task 2.2 Validation (Mandatory)
    if (!formData.block2_applicationSteps?.length && !formData.block2_applicationOther?.trim()) {
      newErrors.block2_applicationSteps = 'Please specify how someone applies for membership.';
      isValid = false;
    }
    if (!formData.block2_consentMethod) {
      newErrors.block2_consentMethod = 'Please specify how member consent is recorded.';
      isValid = false;
    }
    if (formData.block2_consentMethod === 'Other' && !formData.block2_consentOther?.trim()) {
         newErrors.block2_consentOther = 'Please specify the other consent method.';
         isValid = false;
    }
    if (!formData.block2_approvingBody) {
        newErrors.block2_approvingBody = 'Please specify who approves membership.';
        isValid = false;
    }
    if (formData.block2_approvingBody === 'Other' && !formData.block2_approvingBodyOther?.trim()) {
        newErrors.block2_approvingBodyOther = 'Please specify the other approving body.';
        isValid = false;
    }
    if (formData.block2_canRefuseMembership === null || formData.block2_canRefuseMembership === undefined) {
         newErrors.block2_canRefuseMembership = 'Please specify if membership can be refused.';
         isValid = false;
    }

    // Task 2.4 Validation (Mandatory)
    if (!formData.block2_resignationSteps?.length) {
        newErrors.block2_resignationSteps = 'Please specify how a member resigns.';
        isValid = false;
    }
    if (formData.block2_resignationSteps?.includes('notice_period') && (!formData.block2_resignationNoticePeriod || formData.block2_resignationNoticePeriod < 0)) {
        newErrors.block2_resignationNoticePeriod = 'Please specify a valid notice period.';
        isValid = false;
    }
    if (!formData.block2_terminationGrounds?.length && !formData.block2_terminationOther?.trim()) {
        newErrors.block2_terminationGrounds = 'Please specify grounds for termination.';
        isValid = false;
    }

    // Task 2.5 Validation (Mandatory)
    if (!formData.block2_registerMaintainer) {
        newErrors.block2_registerMaintainer = 'Please specify who maintains the register.';
        isValid = false;
    }
    if (formData.block2_registerMaintainer === 'Other' && !formData.block2_registerMaintainerOther?.trim()) {
        newErrors.block2_registerMaintainerOther = 'Please specify the other maintainer.';
        isValid = false;
    }
     if (!formData.block2_registerUpdateMethods?.length && !formData.block2_registerUpdateOther?.trim()) {
        newErrors.block2_registerUpdateMethods = 'Please specify how the register is kept up-to-date.';
        isValid = false;
    }
    
    setLocalErrors(newErrors);

    if (isValid) {
      console.log('Block 2 Validation Passed');
      onComplete(blockNumber);
    } else {
      console.log('Block 2 Validation Failed', newErrors);
    }
  };

  return (
    <div className="space-y-6">
      {/* Removed H3 heading */}
      {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Membership Details</h3> */}
      
      {/* Task 2.1: Membership Categories - Directly in main div */}
      <div> {/* Add a simple div wrapper if needed for spacing/grouping */} 
        <div className="flex items-center gap-2">
            <label className={taskTitleClass}> 
                2.1 Membership Categories (Optional / Good Practice)
            </label> 
        </div>
        <p className={descriptionClass}>Examples: Full, Social, Junior, Life. Clearly state rights/limitations, especially voting rights.</p>
        <Label className={labelClass}>Will your society have different categories of members?</Label>
        <RadioGroup
            name="block2_hasCategories"
            value={formData.block2_hasCategories === true ? 'yes' : formData.block2_hasCategories === false ? 'no' : 'yes'} // Default Yes
            onValueChange={(value: string) => updateFormData('block2_hasCategories', value === 'yes')}
            className="flex space-x-4 mt-2"
        >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="b2-cat-yes" />
                <Label htmlFor="b2-cat-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="b2-cat-no" />
                <Label htmlFor="b2-cat-no">No</Label>
            </div>
        </RadioGroup>
         {formData.block2_hasCategories === true && (
             <div className="pt-4 border-t border-gray-100">
                 <label htmlFor="block2_categories" className={labelClass}>Define categories, rights, and voting rights:</label>
                 <textarea
                     id="block2_categories"
                     name="block2_categories"
                     rows={5}
                     className={baseInputClasses}
                     value={formData.block2_categories || ''}
                     onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block2_categories', e.target.value)}
                     placeholder="Example: Playing Member - Full rights, can vote\nSocial Member - Can use facilities, cannot vote"
                 />
                 <p className="mt-1 text-xs text-gray-500">See example Clauses 6.1, 7, 8, 9. (Note: A dedicated Category list input will replace this text area later).</p>
             </div>
         )}
      </div>

      <hr className="border-gray-200" />

      {/* Task 2.2: Becoming a Member - Directly in main div */}
      <div>
        <div className="flex items-center gap-2">
            <label className={taskTitleClass}> 
                2.2 Becoming a Member (Mandatory)
            </label> 
        </div>
        <p className={descriptionClass}>Outline the key steps from application to acceptance. (Ref: Act s27(1)(c))</p>
        <div>
            <label className={labelClass}>How does someone apply to become a member?</label>
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block2_applicationSteps?.includes('submit_form') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_applicationSteps', 'submit_form', e.target.checked)} />
                    Submit a written/online application form
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block2_applicationSteps?.includes('proposed') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_applicationSteps', 'proposed', e.target.checked)} />
                    Be proposed/nominated by existing member(s)
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block2_applicationSteps?.includes('committee_approval') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_applicationSteps', 'committee_approval', e.target.checked)} />
                    Application reviewed and approved by the Committee
                </label>
                <div className="flex items-start gap-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700 pt-1">
                        <input type="checkbox" className={checkboxClasses} checked={formData.block2_applicationSteps?.includes('other') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_applicationSteps', 'other', e.target.checked)} />
                        Other:
                    </label>
                    {formData.block2_applicationSteps?.includes('other') && (
                        <textarea
                            rows={2}
                            className={`flex-1 ${baseInputClasses}`}
                            value={formData.block2_applicationOther || ''}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block2_applicationOther', e.target.value)}
                            placeholder="Describe other steps..."
                        />
                    )}
                </div>
            </div>
             {localErrors.block2_applicationSteps && <p className={errorClass}>{localErrors.block2_applicationSteps}</p>}
             
            <div className="pt-4 border-t border-gray-100 space-y-4">
                 <div>
                    <p className={descriptionClass}>The Act requires members to consent. You need a clear process. (Ref: Act s76)</p>
                    <Label className={labelClass}>How do applicants consent to becoming a member and agree to follow the rules? (Mandatory)</Label>
                    <RadioGroup
                        name="block2_consentMethod"
                        value={formData.block2_consentMethod || ''}
                        onValueChange={(value: string) => updateFormData('block2_consentMethod', value)}
                        className="space-y-2 mt-2"
                    >
                         <div className="flex items-center space-x-2">
                             <RadioGroupItem value="sign_declaration" id="b2-consent-sign" />
                             <Label htmlFor="b2-consent-sign">By signing a declaration on the application form.</Label>
                         </div>
                         <div className="flex items-center space-x-2">
                              <RadioGroupItem value="accept_payment" id="b2-consent-payment" />
                             <Label htmlFor="b2-consent-payment">Their consent is confirmed upon acceptance and payment of fees.</Label>
                         </div>
                         <div className="flex items-center space-x-2">
                             <RadioGroupItem value="Other" id="b2-consent-other" />
                             <Label htmlFor="b2-consent-other">Other method:</Label>
                         </div>
                    </RadioGroup>
                     {formData.block2_consentMethod === 'Other' && (
                         <textarea
                              rows={2}
                              className={`mt-1 ${baseInputClasses} ${localErrors.block2_consentOther ? 'border-red-500' : ''}`}
                              value={formData.block2_consentOther || ''}
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block2_consentOther', e.target.value)}
                              placeholder="Describe other consent method..."
                         />
                     )}
                     {localErrors.block2_consentMethod && <p className={errorClass}>{localErrors.block2_consentMethod}</p>}
                     {localErrors.block2_consentOther && <p className={errorClass}>{localErrors.block2_consentOther}</p>}
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                     <div>
                         <label htmlFor="block2_approvingBody" className={labelClass}>Who approves membership applications?</label>
                         <select
                            id="block2_approvingBody"
                            name="block2_approvingBody"
                            value={formData.block2_approvingBody || ''}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block2_approvingBody', e.target.value)}
                            className={`${baseInputClasses} ${localErrors.block2_approvingBody ? 'border-red-500' : ''}`}
                        >
                            <option value="" disabled>Select...</option>
                            <option value="Committee">The Committee</option>
                            <option value="Secretary">The Secretary</option>
                            <option value="Other">Other (Specify)</option>
                        </select>
                            {formData.block2_approvingBody === 'Other' && (
                               <Input
                                    type="text"
                                    className={`mt-1 block w-full ${localErrors.block2_approvingBodyOther ? 'border-red-500' : ''}`}
                                    value={formData.block2_approvingBodyOther || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block2_approvingBodyOther', e.target.value)}
                                    placeholder="Specify other approving body..."
                               />
                           )}
                           {localErrors.block2_approvingBody && <p className={errorClass}>{localErrors.block2_approvingBody}</p>}
                           {localErrors.block2_approvingBodyOther && <p className={errorClass}>{localErrors.block2_approvingBodyOther}</p>}
                     </div>
                     <div>
                         <Label className={labelClass}>Can membership be refused even if an applicant meets the criteria?</Label>
                         <RadioGroup
                             name="block2_canRefuseMembership"
                             value={formData.block2_canRefuseMembership === true ? 'yes' : formData.block2_canRefuseMembership === false ? 'no' : ''}
                             onValueChange={(value: string) => updateFormData('block2_canRefuseMembership', value === 'yes')}
                             className="flex space-x-4 mt-2"
                         >
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="b2-refuse-yes" />
                                  <Label htmlFor="b2-refuse-yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="b2-refuse-no" />
                                  <Label htmlFor="b2-refuse-no">No</Label>
                              </div>
                         </RadioGroup>
                         {localErrors.block2_canRefuseMembership && <p className={errorClass}>{localErrors.block2_canRefuseMembership}</p>}
                     </div>
                 </div>
             </div>
        </div>
      </div>
      
      <hr className="border-gray-200" />

      {/* Task 2.3: Subscriptions & Fees - Directly in main div */}
      <div>
           <div className="flex items-center gap-2">
               <label className={taskTitleClass}> 
                   2.3 Subscriptions & Fees (Optional / Good Practice)
               </label> 
           </div>
           <p className={descriptionClass}>Define the process clearly. Include grace periods or notice requirements if desired. (See example: Clause 10)</p>
           <div className="space-y-4">
             <div>
               <label htmlFor="block2_feeSettingMethod" className={labelClass}>How will annual membership subscription fees be set?</label>
                <select id="block2_feeSettingMethod" name="block2_feeSettingMethod" className={baseInputClasses} value={formData.block2_feeSettingMethod || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block2_feeSettingMethod', e.target.value)}>
                   <option value="" disabled>Select...</option>
                   <option value="agm_approval">Recommended by Committee, approved at AGM</option>
                   <option value="committee_sets">Set solely by Committee</option>
                   <option value="Other">Other (Specify)</option>
               </select>
                {formData.block2_feeSettingMethod === 'Other' && (
                   <Input type="text" className="mt-1 block w-full" value={formData.block2_feeSettingOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block2_feeSettingOther', e.target.value)} placeholder="Specify other method..."/>
               )}
             </div>
             <div>
               <label htmlFor="block2_feeDueDate" className={labelClass}>When are annual fees typically due?</label>
                <select id="block2_feeDueDate" name="block2_feeDueDate" className={baseInputClasses} value={formData.block2_feeDueDate || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block2_feeDueDate', e.target.value)}>
                   <option value="" disabled>Select...</option>
                   <option value="start_year">Start of Membership Year (e.g., 1 July)</option>
                   <option value="anniversary">Anniversary of joining</option>
                   <option value="Other">Other (Specify)</option>
               </select>
                {formData.block2_feeDueDate === 'Other' && (
                   <Input type="text" className="mt-1 block w-full" value={formData.block2_feeDueDateOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block2_feeDueDateOther', e.target.value)} placeholder="Specify other due date..."/>
               )}
             </div>
             <div>
               <label htmlFor="block2_nonPaymentConsequence" className={labelClass}>What is the consequence of non-payment by a certain date?</label>
                <select id="block2_nonPaymentConsequence" name="block2_nonPaymentConsequence" className={baseInputClasses} value={formData.block2_nonPaymentConsequence || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block2_nonPaymentConsequence', e.target.value)}>
                   <option value="" disabled>Select...</option>
                   <option value="suspended">Membership may be suspended</option>
                   <option value="terminated">Membership may be terminated</option>
                   <option value="Other">Other (Specify)</option>
               </select>
               {formData.block2_nonPaymentConsequence === 'Other' && (
                   <Input type="text" className="mt-1 block w-full" value={formData.block2_nonPaymentConsequenceOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block2_nonPaymentConsequenceOther', e.target.value)} placeholder="Specify other consequence..."/>
               )}
             </div>
            </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task 2.4: Ceasing Membership - Directly in main div */}
      <div>
         <div className="flex items-center gap-2">
             <label className={taskTitleClass}> 
                 2.4 Ceasing Membership (Mandatory)
             </label> 
         </div>
          <div className="space-y-4">
               <div>
                   <label className={labelClass}>How does a member resign?</label>
                   <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block2_resignationSteps?.includes('written_notice') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_resignationSteps', 'written_notice', e.target.checked)} />
                            Provide written notice to the Secretary/Committee
                        </label>
                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input type="checkbox" className={checkboxClasses} checked={formData.block2_resignationSteps?.includes('notice_period') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_resignationSteps', 'notice_period', e.target.checked)} />
                              A specific notice period is required:
                            </label>
                            {formData.block2_resignationSteps?.includes('notice_period') && (
                               <div className="flex items-center gap-1">
                                  <Input type="number" className={`w-16 ${localErrors.block2_resignationNoticePeriod ? 'border-red-500' : ''}`} min="1" value={formData.block2_resignationNoticePeriod || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block2_resignationNoticePeriod', e.target.valueAsNumber)} />
                                  <select className={baseInputClasses + " w-auto py-1 text-sm"} value={formData.block2_resignationNoticeUnit || 'Days'} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block2_resignationNoticeUnit', e.target.value)}>
                                     <option value="Days">Days</option>
                                     <option value="Weeks">Weeks</option>
                                  </select>
                               </div>
                            )}
                            {localErrors.block2_resignationNoticePeriod && <p className={errorClass + " ml-2"}>{localErrors.block2_resignationNoticePeriod}</p>}
                         </div>
                         <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block2_resignationSteps?.includes('pay_fees') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCheckboxGroupChange('block2_resignationSteps', 'pay_fees', e.target.checked); updateFormData('block2_resignationPayFees', e.target.checked); }} />
                            All outstanding fees must be paid
                         </label>
                   </div>
                   {localErrors.block2_resignationSteps && <p className={errorClass}>{localErrors.block2_resignationSteps}</p>}
                </div>
               
               <div className="pt-4 border-t border-gray-100">
                  <label className={labelClass}>On what grounds can the Society suspend or terminate membership involuntarily?</label>
                  <p className={descriptionClass}>Be specific. Align with Dispute Resolution process. (Ref: Act s27(1)(d))</p>
                    <div className="space-y-2">
                       <label className="flex items-center gap-2 text-sm text-gray-700">
                           <input type="checkbox" className={checkboxClasses} checked={formData.block2_terminationGrounds?.includes('fail_pay_fees') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_terminationGrounds', 'fail_pay_fees', e.target.checked)} />
                           Failure to pay fees by the due date (after notice)
                       </label>
                       <label className="flex items-center gap-2 text-sm text-gray-700">
                           <input type="checkbox" className={checkboxClasses} checked={formData.block2_terminationGrounds?.includes('misconduct') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_terminationGrounds', 'misconduct', e.target.checked)} />
                           Serious misconduct (as defined in Dispute Resolution section)
                       </label>
                       <label className="flex items-center gap-2 text-sm text-gray-700">
                           <input type="checkbox" className={checkboxClasses} checked={formData.block2_terminationGrounds?.includes('harm_reputation') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_terminationGrounds', 'harm_reputation', e.target.checked)} />
                           Acting in a way that harms the Society's reputation
                       </label>
                       <label className="flex items-center gap-2 text-sm text-gray-700">
                           <input type="checkbox" className={checkboxClasses} checked={formData.block2_terminationGrounds?.includes('breach_rules') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_terminationGrounds', 'breach_rules', e.target.checked)} />
                           Breaching the Constitution or Rules/Regulations
                       </label>
                       <div className="flex items-start gap-2">
                           <label className="flex items-center gap-2 text-sm text-gray-700 pt-1">
                               <input type="checkbox" className={checkboxClasses} checked={formData.block2_terminationGrounds?.includes('other') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_terminationGrounds', 'other', e.target.checked)} />
                               Other:
                           </label>
                           {formData.block2_terminationGrounds?.includes('other') && (
                               <textarea rows={2} className={`flex-1 ${baseInputClasses}`} value={formData.block2_terminationOther || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block2_terminationOther', e.target.value)} placeholder="Describe other grounds..."/>
                           )}
                       </div>
                   </div>
                   {localErrors.block2_terminationGrounds && <p className={errorClass}>{localErrors.block2_terminationGrounds}</p>}
                </div>
            </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task 2.5: Register of Members - Directly in main div */}
      <div>
         <div className="flex items-center gap-2">
             <label className={taskTitleClass}> 
                 2.5 Register of Members (Mandatory)
             </label> 
         </div>
         <p className={descriptionClass}>Act requires an accurate register (name, contact, date joined). Comply with Privacy Act 2020. (Ref: Act s79, s27(1)(e))</p>
         <div className="space-y-4">
            <div>
                <label htmlFor="block2_registerMaintainer" className={labelClass}>Who is responsible for maintaining the Register of Members?</label>
                 <select id="block2_registerMaintainer" name="block2_registerMaintainer" className={`${baseInputClasses} ${localErrors.block2_registerMaintainer ? 'border-red-500' : ''}`} value={formData.block2_registerMaintainer || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block2_registerMaintainer', e.target.value)}>
                     <option value="" disabled>Select...</option>
                     <option value="Secretary">The Secretary</option>
                     <option value="Membership Officer">A designated Membership Officer</option>
                     <option value="Committee">The Committee</option>
                     <option value="Other">Other (Specify)</option>
                 </select>
                 {formData.block2_registerMaintainer === 'Other' && (
                     <Input type="text" className={`mt-1 block w-full ${localErrors.block2_registerMaintainerOther ? 'border-red-500' : ''}`} value={formData.block2_registerMaintainerOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block2_registerMaintainerOther', e.target.value)} placeholder="Specify other maintainer..."/>
                 )}
                 {localErrors.block2_registerMaintainer && <p className={errorClass}>{localErrors.block2_registerMaintainer}</p>}
                 {localErrors.block2_registerMaintainerOther && <p className={errorClass}>{localErrors.block2_registerMaintainerOther}</p>}
            </div>
            <div>
                 <label className={labelClass}>How will the society ensure member details are kept up-to-date?</label>
                 <div className="space-y-2">
                     <label className="flex items-center gap-2 text-sm text-gray-700">
                         <input type="checkbox" className={checkboxClasses} checked={formData.block2_registerUpdateMethods?.includes('member_informs') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_registerUpdateMethods', 'member_informs', e.target.checked)} />
                         Members are required to inform the Society of changes
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-700">
                         <input type="checkbox" className={checkboxClasses} checked={formData.block2_registerUpdateMethods?.includes('annual_check') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_registerUpdateMethods', 'annual_check', e.target.checked)} />
                         An annual reminder/check process will occur
                     </label>
                     <div className="flex items-start gap-2">
                          <label className="flex items-center gap-2 text-sm text-gray-700 pt-1">
                              <input type="checkbox" className={checkboxClasses} checked={formData.block2_registerUpdateMethods?.includes('other') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block2_registerUpdateMethods', 'other', e.target.checked)} />
                              Other:
                          </label>
                          {formData.block2_registerUpdateMethods?.includes('other') && (
                              <textarea rows={2} className={`flex-1 ${baseInputClasses}`} value={formData.block2_registerUpdateOther || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block2_registerUpdateOther', e.target.value)} placeholder="Describe other update method..."/>
                          )}
                     </div>
                 </div>
                 {localErrors.block2_registerUpdateMethods && <p className={errorClass}>{localErrors.block2_registerUpdateMethods}</p>}
            </div>
         </div>
          <p className="mt-4 text-xs text-gray-500">Remember to comply with the Privacy Act 2020 when handling member data.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
           <Button 
               variant="secondary" 
               onClick={() => onSaveProgress(blockNumber)}
           >
               Save Progress
           </Button>
           <Button 
               onClick={handleSave}
           >
               Mark as Complete 
           </Button>
      </div>
    </div>
  );
};

export default Block2Membership; 