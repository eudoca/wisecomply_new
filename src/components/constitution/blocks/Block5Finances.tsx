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

// Standard Clause Texts
const standardApplicationOfIncomeText = "The Society's income and property must be used solely to achieve its purposes. No portion may be paid or transferred directly or indirectly to any member, except for reasonable payment for services rendered, reimbursement of expenses, or for interest on money borrowed from a member.";
const standardNoFinancialGainText = "No member of the Society, or any person associated with a member, shall participate in or materially influence any decision made by the Society in respect of the payment to or on behalf of that member or associated person of any income, benefit, or advantage whatsoever. Any such income paid shall be reasonable and relative to that which would be paid in an arm's length transaction (being the open market value).";

const Block5Finances: React.FC<Omit<StepProps, 'errors'>> = ({ formData, updateFormData, onComplete }) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Helper for Checkbox Groups
  const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
    const currentValues = (formData[field] as string[] | undefined) || [];
    let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
    if (field === 'block5_fundManagement' && value === 'Other' && !checked) {
      updateFormData('block5_fundManagementOther', '');
    }
    updateFormData(field, newValues);
    setLocalErrors({});
  };
  
  // Simplified handler for single checkboxes mapped to boolean state
  const handleSingleCheckboxChange = (field: keyof ConstitutionFormData, checked: boolean) => {
      updateFormData(field, checked);
      setLocalErrors({});
  };

  // Validation logic for Block 5
  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Task 5.1 Validation
    if (!formData.block5_financialYearEnd) {
        newErrors.block5_financialYearEnd = 'Please specify the financial year end date.';
        isValid = false;
    }
    if (formData.block5_financialYearEnd === 'Other' && !formData.block5_financialYearEndOther?.trim()) {
        newErrors.block5_financialYearEndOther = 'Please specify the other financial year end date.';
        isValid = false;
    }
    
    // Task 5.2 Validation
    if (!formData.block5_fundManagement?.length) {
        newErrors.block5_fundManagement = 'Please select at least one method for managing funds.';
        isValid = false;
    }
    if (formData.block5_fundManagement?.includes('Other') && !formData.block5_fundManagementOther?.trim()) {
        newErrors.block5_fundManagementOther = 'Please specify the other fund management method.';
        isValid = false;
    }
     if (!formData.block5_paymentAuthorisation) {
        newErrors.block5_paymentAuthorisation = 'Please specify how payments are authorised.';
        isValid = false;
    }
    if (formData.block5_paymentAuthorisation === 'Other' && !formData.block5_paymentAuthorisationOther?.trim()) {
        newErrors.block5_paymentAuthorisationOther = 'Please specify the other payment authorisation method.';
        isValid = false;
    }
    if (formData.block5_confirmNoFinancialGain !== true) {
        newErrors.block5_confirmNoFinancialGain = 'You must confirm understanding of the Application of Income and No Financial Gain clauses.';
        isValid = false;
    }
    
    // Task 5.3 Validation
    if (formData.block5_borrowingPower === null || formData.block5_borrowingPower === undefined) {
        newErrors.block5_borrowingPower = 'Please specify if the Society has borrowing powers.';
        isValid = false;
    }
     if (formData.block5_borrowingPower === true && !formData.block5_borrowingLimits?.trim()) {
        newErrors.block5_borrowingLimits = 'Please specify any limits or conditions on borrowing.';
        isValid = false;
    }
    
    // Task 5.4 Validation
    if (!formData.block5_auditRequirement) {
        newErrors.block5_auditRequirement = 'Please specify the audit requirements.';
        isValid = false;
    }
    if (formData.block5_auditRequirement === 'revenue_threshold' && (!formData.block5_auditRequirementThreshold || formData.block5_auditRequirementThreshold <= 0)) {
        newErrors.block5_auditRequirementThreshold = 'Please specify a valid revenue threshold for requiring an audit.';
        isValid = false;
    }
    if (!formData.block5_auditorAppointment) {
        newErrors.block5_auditorAppointment = 'Please specify how the auditor is appointed.';
        isValid = false;
    }
    if (formData.block5_auditorAppointment === 'Other' && !formData.block5_auditorAppointmentOther?.trim()) {
        newErrors.block5_auditorAppointmentOther = 'Please specify the other auditor appointment method.';
        isValid = false;
    }
    
    // Task 5.5 Validation
    if (!formData.block5_windingUpDistribution) {
        newErrors.block5_windingUpDistribution = 'Please specify how surplus assets will be distributed upon winding up.';
        isValid = false;
    }
    if (formData.block5_windingUpDistribution === 'Other' && !formData.block5_windingUpDistributionOther?.trim()) {
        newErrors.block5_windingUpDistributionOther = 'Please specify the other distribution method.';
        isValid = false;
    }

    setLocalErrors(newErrors);

    if (isValid) {
      console.log('Block 5 Validation Passed');
      onComplete();
    } else {
      console.log('Block 5 Validation Failed', newErrors);
    }
  };

  return (
    <div className="space-y-6">
        {/* --- Task 5.1: Financial Year [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">5.1 Financial Year (Mandatory)</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">Define the 12-month period for financial reporting. Common examples are 30 June or 31 March. (Ref: Act s48(1))</p>
             <div>
                <label htmlFor="block5_financialYearEnd" className="block text-xs font-medium text-gray-700 mb-1">What is the Society&apos;s financial year end date?</label>
                <select id="block5_financialYearEnd" name="block5_financialYearEnd" className={`${baseInputClasses} ${localErrors.block5_financialYearEnd ? 'border-red-500' : ''}`} value={formData.block5_financialYearEnd || '30_june'} onChange={(e) => updateFormData('block5_financialYearEnd', e.target.value)}>
                    <option value="30_june">30 June</option>
                    <option value="31_march">31 March</option>
                    <option value="31_december">31 December</option>
                    <option value="Other">Other (Specify)</option>
                </select>
                {formData.block5_financialYearEnd === 'Other' && (
                    <Input type="text" className={`mt-1 block w-full ${localErrors.block5_financialYearEndOther ? 'border-red-500' : ''}`} value={formData.block5_financialYearEndOther || ''} onChange={(e) => updateFormData('block5_financialYearEndOther', e.target.value)} placeholder="Specify month and day (e.g., 30 September)"/>
                )}
                 {localErrors.block5_financialYearEnd && <p className="mt-1 text-xs text-red-600">{localErrors.block5_financialYearEnd}</p>}
                {localErrors.block5_financialYearEndOther && <p className="mt-1 text-xs text-red-600">{localErrors.block5_financialYearEndOther}</p>}
            </div>
        </div>

        {/* --- Task 5.2: Management of Funds & Confirmation [MANDATORY] --- */}
         <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">5.2 Management of Funds (Mandatory)</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">How will the society handle its money? Detail accounts and payment processes. (Ref: Act s27(1)(h))</p>
            <div>
                 <label className="block text-xs font-medium text-gray-700 mb-1">How will the Society&apos;s funds be managed?</label>
                 <div className="space-y-1">
                     <label className="flex items-center gap-2 text-sm text-gray-700">
                         <input type="checkbox" className={checkboxClasses} checked={formData.block5_fundManagement?.includes('bank_account') || false} onChange={(e) => handleCheckboxGroupChange('block5_fundManagement', 'bank_account', e.target.checked)} /> Held in bank account(s) in the Society&apos;s name
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-700">
                         <input type="checkbox" className={checkboxClasses} checked={formData.block5_fundManagement?.includes('investments') || false} onChange={(e) => handleCheckboxGroupChange('block5_fundManagement', 'investments', e.target.checked)} /> May be invested according to Committee policy
                     </label>
                      <div className="flex items-center gap-2">
                         <input type="checkbox" className={checkboxClasses} checked={formData.block5_fundManagement?.includes('Other') || false} onChange={(e) => handleCheckboxGroupChange('block5_fundManagement', 'Other', e.target.checked)} />
                         <Input 
                            type="text" 
                            placeholder="Other method..." 
                            value={formData.block5_fundManagementOther || ''} 
                            onChange={(e) => updateFormData('block5_fundManagementOther', e.target.value)}
                            disabled={!formData.block5_fundManagement?.includes('Other')} 
                            className={`flex-1 text-sm ${!formData.block5_fundManagement?.includes('Other') ? 'bg-gray-100 cursor-not-allowed' : ''} ${localErrors.block5_fundManagementOther ? 'border-red-500' : ''}`}
                         />
                     </div>
                 </div>
                 {localErrors.block5_fundManagement && <p className="mt-1 text-xs text-red-600">{localErrors.block5_fundManagement}</p>}
                 {localErrors.block5_fundManagementOther && <p className="mt-1 text-xs text-red-600">{localErrors.block5_fundManagementOther}</p>}
            </div>
             <div className="pt-4 border-t border-gray-100">
                 <label htmlFor="block5_paymentAuthorisation" className="block text-xs font-medium text-gray-700 mb-1">How are payments from the Society&apos;s funds authorised?</label>
                 <select id="block5_paymentAuthorisation" name="block5_paymentAuthorisation" className={`${baseInputClasses} ${localErrors.block5_paymentAuthorisation ? 'border-red-500' : ''}`} value={formData.block5_paymentAuthorisation || ''} onChange={(e) => updateFormData('block5_paymentAuthorisation', e.target.value)}>
                     <option value="" disabled>Select...</option>
                     <option value="two_signatories">By two authorised Committee members (e.g., Treasurer + one other)</option>
                     <option value="treasurer_committee">By the Treasurer, subject to Committee approval/budget</option>
                     <option value="committee_resolution">By resolution of the Committee</option>
                     <option value="Other">Other (Specify)</option>
                 </select>
                 {formData.block5_paymentAuthorisation === 'Other' && (
                    <Input type="text" className={`mt-1 block w-full ${localErrors.block5_paymentAuthorisationOther ? 'border-red-500' : ''}`} value={formData.block5_paymentAuthorisationOther || ''} onChange={(e) => updateFormData('block5_paymentAuthorisationOther', e.target.value)} placeholder="Specify other authorisation process..."/>
                 )}
                 {localErrors.block5_paymentAuthorisation && <p className="mt-1 text-xs text-red-600">{localErrors.block5_paymentAuthorisation}</p>}
                 {localErrors.block5_paymentAuthorisationOther && <p className="mt-1 text-xs text-red-600">{localErrors.block5_paymentAuthorisationOther}</p>}
             </div>

             {/* ADDED CONFIRMATION SECTION */}
             <div className="pt-4 border-t border-gray-100">
                 <h4 className="text-sm font-medium text-gray-700 mb-2">Mandatory Clauses Confirmation (Task 5.2 Cont.)</h4>
                 <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs space-y-2 mb-2">
                     <p><strong>Application of Income:</strong> {standardApplicationOfIncomeText}</p>
                     <p><strong>No Financial Gain:</strong> {standardNoFinancialGainText}</p>
                 </div>
                 <label className="flex items-start gap-2 text-sm text-gray-700">
                     <input 
                         type="checkbox" 
                         className={`${checkboxClasses} mt-1 ${localErrors.block5_confirmNoFinancialGain ? 'border-red-500' : ''}`} 
                         checked={formData.block5_confirmNoFinancialGain || false} 
                         onChange={(e) => updateFormData('block5_confirmNoFinancialGain', e.target.checked)} 
                     />
                     <span>I confirm the Society understands and agrees to include these mandatory clauses regarding Application of Income and No Financial Gain.</span>
                 </label>
                 {localErrors.block5_confirmNoFinancialGain && <p className="mt-1 ml-6 text-xs text-red-600">{localErrors.block5_confirmNoFinancialGain}</p>}
                  <p className="mt-1 ml-6 text-xs text-gray-500 italic">These clauses are required by the Act (s27(1)(h), s26) and ensure the society operates on a not-for-profit basis. Modifying them significantly is strongly discouraged and may affect registration.</p>
             </div>
        </div>

        {/* --- Task 5.3: Borrowing Powers [OPTIONAL / GOOD PRACTICE] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">5.3 Borrowing Powers (Optional / Good Practice)</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">Can the society borrow money? If yes, consider adding limits or requiring member approval for large amounts. (Ref: Act s27(1)(i))</p>
            <div>
                 <RadioGroup
                     label="Does the Society have the power to borrow money (e.g., take out loans, overdrafts)?"
                     name="block5_borrowingPower"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block5_borrowingPower}
                     onChange={(value) => updateFormData('block5_borrowingPower', value as boolean)}
                 />
                 {localErrors.block5_borrowingPower && <p className="mt-1 text-xs text-red-600">{localErrors.block5_borrowingPower}</p>}
                 {formData.block5_borrowingPower === true && (
                     <div className="mt-3">
                         <label htmlFor="block5_borrowingLimits" className="block text-xs font-medium text-gray-700 mb-1">Specify any limits or conditions on borrowing powers:</label>
                         <textarea id="block5_borrowingLimits" name="block5_borrowingLimits" rows={2} className={`${baseInputClasses} ${localErrors.block5_borrowingLimits ? 'border-red-500' : ''}`} value={formData.block5_borrowingLimits || 'e.g., Limited to $X amount without General Meeting approval; Only for specific purposes approved by the Committee.'} onChange={(e) => updateFormData('block5_borrowingLimits', e.target.value)} />
                         {localErrors.block5_borrowingLimits && <p className="mt-1 text-xs text-red-600">{localErrors.block5_borrowingLimits}</p>}
                     </div>
                 )}
             </div>
        </div>

        {/* --- Task 5.4: Audit Requirements [OPTIONAL / GOOD PRACTICE unless large] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">5.4 Audit / Review (Optional / Good Practice)</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">Specify if/when an audit or review is required. The Act may set minimum requirements based on size/revenue. Check Regulations. (Ref: Act s49, Regulations)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                     <label htmlFor="block5_auditRequirement" className="block text-xs font-medium text-gray-700 mb-1">When is an audit or financial review required?</label>
                     <select id="block5_auditRequirement" name="block5_auditRequirement" className={`${baseInputClasses} ${localErrors.block5_auditRequirement ? 'border-red-500' : ''}`} value={formData.block5_auditRequirement || ''} onChange={(e) => updateFormData('block5_auditRequirement', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="never">Not required unless mandated by Act/Regulations</option>
                         <option value="always">Always required annually (Audit)</option>
                         <option value="always_review">Always required annually (Financial Review)</option>
                         <option value="revenue_threshold">Required if annual revenue exceeds threshold (Specify)</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                     {formData.block5_auditRequirement === 'revenue_threshold' && (
                        <div className="mt-1 flex items-center gap-1">
                            <span className="text-xs">Threshold ($):</span>
                            <Input type="number" min="1" placeholder="e.g., 50000" className={`w-32 ${localErrors.block5_auditRequirementThreshold ? 'border-red-500' : ''}`} value={formData.block5_auditRequirementThreshold || ''} onChange={(e) => updateFormData('block5_auditRequirementThreshold', e.target.valueAsNumber)} />
                        </div>
                     )}
                     {(formData.block5_auditRequirement === 'Other') && (
                        <Input type="text" className={`mt-1 block w-full ${localErrors.block5_auditRequirement ? 'border-red-500' : ''}`} value={formData.block5_auditRequirement === 'Other' ? formData.block5_auditRequirement : ''} onChange={(e) => updateFormData('block5_auditRequirement', e.target.value)} placeholder="Specify other requirement..."/>
                     )}
                     {localErrors.block5_auditRequirement && <p className="mt-1 text-xs text-red-600">{localErrors.block5_auditRequirement}</p>}
                     {localErrors.block5_auditRequirementThreshold && <p className="mt-1 text-xs text-red-600">{localErrors.block5_auditRequirementThreshold}</p>}
                </div>
                 <div>
                    <label htmlFor="block5_auditorAppointment" className="block text-xs font-medium text-gray-700 mb-1">How is the Auditor/Reviewer appointed (if required)?</label>
                     <select id="block5_auditorAppointment" name="block5_auditorAppointment" className={`${baseInputClasses} ${localErrors.block5_auditorAppointment ? 'border-red-500' : ''}`} value={formData.block5_auditorAppointment || ''} onChange={(e) => updateFormData('block5_auditorAppointment', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="agm">Appointed at the AGM</option>
                         <option value="committee">Appointed by the Committee</option>
                         <option value="not_applicable">Not Applicable (if no audit required)</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                      {formData.block5_auditorAppointment === 'Other' && (
                        <Input type="text" className={`mt-1 block w-full ${localErrors.block5_auditorAppointmentOther ? 'border-red-500' : ''}`} value={formData.block5_auditorAppointmentOther || ''} onChange={(e) => updateFormData('block5_auditorAppointmentOther', e.target.value)} placeholder="Specify other appointment method..."/>
                     )}
                     {localErrors.block5_auditorAppointment && <p className="mt-1 text-xs text-red-600">{localErrors.block5_auditorAppointment}</p>}
                     {localErrors.block5_auditorAppointmentOther && <p className="mt-1 text-xs text-red-600">{localErrors.block5_auditorAppointmentOther}</p>}
                 </div>
            </div>
        </div>

      {/* Save Button for the Block */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button onClick={handleSave} variant="primary">Save & Close Section 5</Button>
      </div>
    </div>
  );
};

export default Block5Finances; 