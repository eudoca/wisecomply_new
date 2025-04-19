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

// Placeholder standard texts
const standardInformalSteps = "Parties are encouraged to attempt to resolve the dispute informally between themselves first. If unresolved, they may approach a Committee member (not involved in the dispute) to facilitate discussion.";
const standardFormalSteps = "If informal resolution fails, a party may provide written notice of the dispute to the Committee. The Committee will appoint a sub-committee (or use the full Committee if appropriate) to hear from the parties involved and attempt to mediate a resolution. The Committee must act impartially and follow principles of natural justice.";
const standardNoticesText = "Any notice required by this Constitution may be served by sending it by post or electronically to the member's last known address as recorded in the Register of Members, or for notices to the Society, by delivery to the Registered Office or the Secretary.";
const standardIndemnityText = "Every member of the Committee and officer of the Society shall be indemnified out of the property of the Society against any liability incurred by them in their capacity as Committee member or officer in defending any proceedings, whether civil or criminal, in which judgement is given in their favour or in which they are acquitted or in connection with any application under the Act in which relief is granted to them by the Court.";

const Block7Disputes: React.FC<Omit<StepProps, 'errors'>> = ({ formData, updateFormData, onComplete }) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

   // Helper for Checkbox Groups
  const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
    const currentValues = (formData[field] as string[] | undefined) || [];
    let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
    if (field === 'block7_externalOptions' && value === 'Other' && !checked) {
      updateFormData('block7_externalOptionsOther', '');
    }
    updateFormData(field, newValues);
    setLocalErrors({});
  };

  // Validation logic for Block 7
  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Task 7.1 Validation
    if (!formData.block7_disputeProcedure) {
        newErrors.block7_disputeProcedure = 'Please select a dispute resolution procedure.';
        isValid = false;
    }
    if (formData.block7_disputeProcedure === 'informal_then_formal' || formData.block7_disputeProcedure === 'informal_only') {
        if (!formData.block7_informalSteps?.trim()) {
            newErrors.block7_informalSteps = 'Please describe the informal dispute resolution steps.';
            isValid = false;
        }
    }
    if (formData.block7_disputeProcedure === 'informal_then_formal' || formData.block7_disputeProcedure === 'formal_only') {
         if (!formData.block7_formalSteps?.trim()) {
            newErrors.block7_formalSteps = 'Please describe the formal dispute resolution steps (must include natural justice).';
            isValid = false;
        }
    }
     if (formData.block7_disputeProcedure === 'external_focus') { 
        if (!formData.block7_externalOptions?.length) {
             newErrors.block7_externalOptions = 'Please select at least one external resolution option.';
             isValid = false;
        }
        if (formData.block7_externalOptions?.includes('Other') && !formData.block7_externalOptionsOther?.trim()) {
            newErrors.block7_externalOptionsOther = 'Please specify the other external resolution option.';
            isValid = false;
        }
     }
    
    // ADDED Task 7.2 Validation
    if (formData.block7_includeNoticesClause === true && !formData.block7_noticesClauseText?.trim()) {
        newErrors.block7_noticesClauseText = 'Please provide the text for the notices clause.';
        isValid = false;
    }
    
    // ADDED Task 7.3 Validation (No specific text validation needed for indemnity/insurance options)
    if (formData.block7_includeIndemnityClause === null || formData.block7_includeIndemnityClause === undefined) {
        newErrors.block7_includeIndemnityClause = 'Please specify whether to include an indemnity clause.';
        isValid = false;
    }
    if (formData.block7_committeeCanArrangeInsurance === null || formData.block7_committeeCanArrangeInsurance === undefined) {
        newErrors.block7_committeeCanArrangeInsurance = 'Please specify whether the committee can arrange insurance.';
        isValid = false;
    }

    setLocalErrors(newErrors);

    if (isValid) {
      console.log('Block 7 Validation Passed');
      onComplete();
    } else {
      console.log('Block 7 Validation Failed', newErrors);
    }
  };

  return (
    <div className="space-y-6">
        {/* --- Task 7.1: Dispute Resolution Procedure [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">7.1 Dispute Resolution Procedure (Mandatory)</label>
                 <Tooltip text="Required clause. How will disputes between members, or members and the society, be handled? Must comply with natural justice. (Ref: Act s27(1)(m), s60-65)" position="top"><HelpCircle className="text-gray-500 hover:text-brand-primary cursor-help w-4 h-4" /></Tooltip>
            </div>
             <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Select the overall approach to dispute resolution:</label>
                 <RadioGroup
                    label="Select the overall approach to dispute resolution:"
                    name="block7_disputeProcedure"
                    options={[
                        { value: 'informal_then_formal', label: 'Standard Procedure: Informal steps first, then formal internal steps (Recommended - Template below)' }, 
                        { value: 'informal_only', label: 'Informal Internal Steps Only (Describe below)' },
                        { value: 'formal_only', label: 'Formal Internal Steps Only (Describe below - Must include natural justice)' },
                        { value: 'external_focus', label: 'Referral to External Options (Select options below)' }
                    ]}
                    value={formData.block7_disputeProcedure || 'informal_then_formal'} // Default Recommended
                    onChange={(value) => updateFormData('block7_disputeProcedure', value as string)}
                 />
                 {localErrors.block7_disputeProcedure && <p className="mt-1 text-xs text-red-600">{localErrors.block7_disputeProcedure}</p>}
            </div>

             {/* Conditional Sections based on Radio Selection */} 
             {(formData.block7_disputeProcedure === 'informal_then_formal' || formData.block7_disputeProcedure === 'informal_only') && (
                <div className="pt-4 border-t border-gray-100">
                     <label htmlFor="block7_informalSteps" className="block text-xs font-medium text-gray-700 mb-1">Describe the informal resolution steps:</label>
                     <textarea id="block7_informalSteps" name="block7_informalSteps" rows={3} className={`${baseInputClasses} ${localErrors.block7_informalSteps ? 'border-red-500' : ''}`} value={formData.block7_informalSteps === undefined ? standardInformalSteps : formData.block7_informalSteps} onChange={(e) => updateFormData('block7_informalSteps', e.target.value)} />
                      {localErrors.block7_informalSteps && <p className="mt-1 text-xs text-red-600">{localErrors.block7_informalSteps}</p>}
                </div>
             )}

             {(formData.block7_disputeProcedure === 'informal_then_formal' || formData.block7_disputeProcedure === 'formal_only') && (
                 <div className="pt-4 border-t border-gray-100">
                     <label htmlFor="block7_formalSteps" className="block text-xs font-medium text-gray-700 mb-1">Describe the formal internal resolution steps (Must ensure natural justice - right to be heard, impartiality):</label>
                     <textarea id="block7_formalSteps" name="block7_formalSteps" rows={4} className={`${baseInputClasses} ${localErrors.block7_formalSteps ? 'border-red-500' : ''}`} value={formData.block7_formalSteps === undefined ? standardFormalSteps : formData.block7_formalSteps} onChange={(e) => updateFormData('block7_formalSteps', e.target.value)} />
                     {localErrors.block7_formalSteps && <p className="mt-1 text-xs text-red-600">{localErrors.block7_formalSteps}</p>}
                 </div>
             )}

             {formData.block7_disputeProcedure === 'external_focus' && (
                 <div className="pt-4 border-t border-gray-100">
                     <label className="block text-xs font-medium text-gray-700 mb-1">Select external resolution options:</label>
                     <div className="space-y-1">
                         <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block7_externalOptions?.includes('mediation') || false} onChange={(e) => handleCheckboxGroupChange('block7_externalOptions', 'mediation', e.target.checked)} /> Mediation by an agreed external mediator
                         </label>
                         <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block7_externalOptions?.includes('arbitration') || false} onChange={(e) => handleCheckboxGroupChange('block7_externalOptions', 'arbitration', e.target.checked)} /> Arbitration by an agreed external arbitrator
                         </label>
                         <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block7_externalOptions?.includes('registrar') || false} onChange={(e) => handleCheckboxGroupChange('block7_externalOptions', 'registrar', e.target.checked)} /> Referral to the Registrar of Incorporated Societies (if applicable under Act)
                         </label>
                          <div className="flex items-center gap-2">
                             <input type="checkbox" className={checkboxClasses} checked={formData.block7_externalOptions?.includes('Other') || false} onChange={(e) => handleCheckboxGroupChange('block7_externalOptions', 'Other', e.target.checked)} />
                             <Input 
                                type="text" 
                                placeholder="Other external option..." 
                                value={formData.block7_externalOptionsOther || ''} 
                                onChange={(e) => updateFormData('block7_externalOptionsOther', e.target.value)}
                                disabled={!formData.block7_externalOptions?.includes('Other')} 
                                className={`flex-1 text-sm ${!formData.block7_externalOptions?.includes('Other') ? 'bg-gray-100 cursor-not-allowed' : ''} ${localErrors.block7_externalOptionsOther ? 'border-red-500' : ''}`}
                            />
                         </div>
                     </div>
                     {localErrors.block7_externalOptions && <p className="mt-1 text-xs text-red-600">{localErrors.block7_externalOptions}</p>}
                     {localErrors.block7_externalOptionsOther && <p className="mt-1 text-xs text-red-600">{localErrors.block7_externalOptionsOther}</p>}
                </div>
             )}

        </div>

        {/* --- Task 7.2: Notices [OPTIONAL / GOOD PRACTICE] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">7.2 Notices (Optional / Good Practice)</label>
                 <Tooltip text="Specify how formal notices are sent/received. (See example: Clause 33)" position="top"><HelpCircle className="text-gray-500 hover:text-brand-primary cursor-help w-4 h-4" /></Tooltip>
            </div>
            <div>
                <RadioGroup
                     label="Include a clause specifying how formal notices are handled?"
                     name="block7_includeNoticesClause"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block7_includeNoticesClause !== null ? formData.block7_includeNoticesClause : true} // Default Yes
                     onChange={(value) => updateFormData('block7_includeNoticesClause', value as boolean)}
                 />
            </div>
            {formData.block7_includeNoticesClause === true && (
                 <div className="pt-4 border-t border-gray-100">
                     <label htmlFor="block7_noticesClauseText" className="block text-xs font-medium text-gray-700 mb-1">Review/edit standard notices clause:</label>
                     <textarea id="block7_noticesClauseText" name="block7_noticesClauseText" rows={3} className={`${baseInputClasses} ${localErrors.block7_noticesClauseText ? 'border-red-500' : ''}`} value={formData.block7_noticesClauseText === undefined ? standardNoticesText : formData.block7_noticesClauseText} onChange={(e) => updateFormData('block7_noticesClauseText', e.target.value)} />
                     {localErrors.block7_noticesClauseText && <p className="mt-1 text-xs text-red-600">{localErrors.block7_noticesClauseText}</p>}
                 </div>
             )}
        </div>

        {/* --- Task 7.3: Indemnity & Insurance [OPTIONAL / GOOD PRACTICE] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">7.3 Indemnity & Insurance (Optional / Good Practice)</label>
                 <Tooltip text="Provide protection for volunteers acting reasonably. (See example: Clause 37)" position="top"><HelpCircle className="text-gray-500 hover:text-brand-primary cursor-help w-4 h-4" /></Tooltip>
            </div>
            <div>
                 <RadioGroup
                     label="Include a clause indemnifying Committee members/officers acting in good faith?"
                     name="block7_includeIndemnityClause"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block7_includeIndemnityClause !== null ? formData.block7_includeIndemnityClause : true} // Default Yes
                     onChange={(value) => updateFormData('block7_includeIndemnityClause', value as boolean)}
                 />
                 {localErrors.block7_includeIndemnityClause && <p className="mt-1 text-xs text-red-600">{localErrors.block7_includeIndemnityClause}</p>}
                  {formData.block7_includeIndemnityClause === true && (
                     <p className="mt-1 text-xs text-gray-500 italic p-2 bg-gray-50 rounded border">Standard text similar to: "{standardIndemnityText}" will be included.</p>
                 )}
            </div>
             <div className="pt-4 border-t border-gray-100">
                 <RadioGroup
                     label="Authorise the Committee to arrange appropriate insurance (e.g., Public Liability, Officers' Liability)?"
                     name="block7_committeeCanArrangeInsurance"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block7_committeeCanArrangeInsurance !== null ? formData.block7_committeeCanArrangeInsurance : true} // Default Yes
                     onChange={(value) => updateFormData('block7_committeeCanArrangeInsurance', value as boolean)}
                 />
                 {localErrors.block7_committeeCanArrangeInsurance && <p className="mt-1 text-xs text-red-600">{localErrors.block7_committeeCanArrangeInsurance}</p>}
             </div>
        </div>

      {/* Save Button for the Block */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button onClick={handleSave} variant="primary">Save & Close Section 7</Button>
      </div>
    </div>
  );
};

export default Block7Disputes; 