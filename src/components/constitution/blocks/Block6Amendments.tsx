import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { RadioGroup } from '../../wizard/RadioGroup';
import { Button } from '../../ui/Button';
import type { StepProps, ConstitutionFormData } from '../ConstitutionWizard';

// Standard Tailwind classes
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";

// Standard Texts
const standardAppealProcessText = "Appeals against significant decisions made under the dispute or disciplinary procedures may be made to [Specify Body, e.g., a specially convened Appeals Panel, the national body, the Sports Tribunal if applicable] within [Number] days of the decision, following the procedures set out by that body.";
const standardBylawText = "The Committee may make, alter, or rescind bylaws, rules, or regulations for the general management of the Society, provided they are not inconsistent with this Constitution or the Act. Such bylaws shall be binding on members.";

const Block6Amendments: React.FC<Omit<StepProps, 'errors'>> = ({ formData, updateFormData, onComplete }) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Validation logic for Block 6
  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Task 6.1 Validation
    if (!formData.block6_amendmentProcedure) {
        newErrors.block6_amendmentProcedure = 'Please specify the procedure for amending the constitution.';
        isValid = false;
    }
    if (formData.block6_amendmentProcedure === 'Other' && !formData.block6_amendmentProcedureOther?.trim()) {
        newErrors.block6_amendmentProcedureOther = 'Please specify the other amendment procedure.';
        isValid = false;
    }
    
    // Task 6.2 Validation
    if (formData.block6_hasCommonSeal === null || formData.block6_hasCommonSeal === undefined) {
        newErrors.block6_hasCommonSeal = 'Please specify if the Society will have a common seal.';
        isValid = false;
    }
    if (formData.block6_hasCommonSeal === true && !formData.block6_commonSealCustody?.trim()) {
        newErrors.block6_commonSealCustody = 'Please specify who will have custody of the common seal.';
        isValid = false;
    }
     if (formData.block6_hasCommonSeal === true && !formData.block6_commonSealUse?.trim()) {
        newErrors.block6_commonSealUse = 'Please specify how the common seal will be used/affixed.';
        isValid = false;
    }

    // ADDED Task 6.2 Appeals Validation
    if (formData.block6_appealRights === true && !formData.block6_appealProcess?.trim()) {
        newErrors.block6_appealProcess = 'Please describe the appeal process or specify the appeal body.';
        isValid = false;
    }
    
    // ADDED Task 6.3 Bylaws Validation
    if (formData.block6_committeeCanMakeBylaws === true && !formData.block6_bylawProcedure) {
        newErrors.block6_bylawProcedure = 'Please specify how bylaws are made or changed.';
        isValid = false;
    }
    if (formData.block6_bylawProcedure === 'Other' && !formData.block6_bylawProcedureOther?.trim()) {
        newErrors.block6_bylawProcedureOther = 'Please specify the other bylaw procedure.';
        isValid = false;
    }

    setLocalErrors(newErrors);

    if (isValid) {
      console.log('Block 6 Validation Passed');
      onComplete();
    } else {
      console.log('Block 6 Validation Failed', newErrors);
    }
  };

  return (
    <div className="space-y-6">
        {/* --- Task 6.1: Amending the Constitution [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">6.1 Amending the Constitution (Mandatory)</label>
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">How can the society change its rules? Specify the required majority and meeting type. (Ref: Act s32-35, s27(1)(k))</p>
            <div>
                <label htmlFor="block6_amendmentProcedure" className="block text-xs font-medium text-gray-700 mb-1">Procedure for amending this Constitution?</label>
                <select id="block6_amendmentProcedure" name="block6_amendmentProcedure" className={`${baseInputClasses} ${localErrors.block6_amendmentProcedure ? 'border-red-500' : ''}`} value={formData.block6_amendmentProcedure || 'sgm_2_thirds'} onChange={(e) => updateFormData('block6_amendmentProcedure', e.target.value)}>
                    <option value="sgm_2_thirds">By resolution passed by a two-thirds majority of members present and voting at a General Meeting</option>
                    <option value="sgm_simple_majority">By resolution passed by a simple majority (&gt;50%) of members present and voting at a General Meeting</option>
                    <option value="sgm_75_percent">By resolution passed by a 75% majority of members present and voting at a General Meeting</option>
                     <option value="committee_recommend_gm">Recommended by Committee, approved by majority at General Meeting</option>
                    <option value="Other">Other (Specify)</option>
                </select>
                {formData.block6_amendmentProcedure === 'Other' && (
                    <Input type="text" className={`mt-1 block w-full ${localErrors.block6_amendmentProcedureOther ? 'border-red-500' : ''}`} value={formData.block6_amendmentProcedureOther || ''} onChange={(e) => updateFormData('block6_amendmentProcedureOther', e.target.value)} placeholder="Specify other amendment procedure..."/>
                )}
                 {localErrors.block6_amendmentProcedure && <p className="mt-1 text-xs text-red-600">{localErrors.block6_amendmentProcedure}</p>}
                {localErrors.block6_amendmentProcedureOther && <p className="mt-1 text-xs text-red-600">{localErrors.block6_amendmentProcedureOther}</p>}
            </div>
        </div>

        {/* --- Task 6.2: Common Seal [OPTIONAL / GOOD PRACTICE] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">6.2 Common Seal (Optional / Good Practice)</label>
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Optional but recommended for executing formal documents. Define who keeps it and how it's used. (Ref: Act s27(1)(l), s28)</p>
            <div>
                 <RadioGroup
                     label="Will the Society have a common seal?"
                     name="block6_hasCommonSeal"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block6_hasCommonSeal}
                     onChange={(value) => updateFormData('block6_hasCommonSeal', value as boolean)}
                 />
                  {localErrors.block6_hasCommonSeal && <p className="mt-1 text-xs text-red-600">{localErrors.block6_hasCommonSeal}</p>}
            </div>
             {formData.block6_hasCommonSeal === true && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                     <div>
                         <label htmlFor="block6_commonSealCustody" className="block text-xs font-medium text-gray-700 mb-1">Who will have custody of the common seal?</label>
                         <textarea id="block6_commonSealCustody" name="block6_commonSealCustody" rows={2} className={`${baseInputClasses} ${localErrors.block6_commonSealCustody ? 'border-red-500' : ''}`} value={formData.block6_commonSealCustody || 'The Secretary (or another person appointed by the Committee) shall have custody of the common seal.'} onChange={(e) => updateFormData('block6_commonSealCustody', e.target.value)} />
                         {localErrors.block6_commonSealCustody && <p className="mt-1 text-xs text-red-600">{localErrors.block6_commonSealCustody}</p>}
                     </div>
                     <div>
                         <label htmlFor="block6_commonSealUse" className="block text-xs font-medium text-gray-700 mb-1">How will the common seal be used/affixed to documents?</label>
                         <textarea id="block6_commonSealUse" name="block6_commonSealUse" rows={3} className={`${baseInputClasses} ${localErrors.block6_commonSealUse ? 'border-red-500' : ''}`} value={formData.block6_commonSealUse || 'The common seal shall only be affixed to a document following a resolution of the Committee and shall be witnessed by at least two Committee members (one of whom may be the Secretary).'} onChange={(e) => updateFormData('block6_commonSealUse', e.target.value)} />
                         {localErrors.block6_commonSealUse && <p className="mt-1 text-xs text-red-600">{localErrors.block6_commonSealUse}</p>}
                     </div>
                 </div>
             )}
        </div>

        {/* --- Task 6.2 (User List): Appeals [OPTIONAL / GOOD PRACTICE] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">6.2 Appeals (Optional / Good Practice)</label>
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Do you want to specify rights of appeal against dispute/disciplinary decisions? (See example: Clause 25)</p>
            <div>
                <RadioGroup
                     label="Specify appeal rights from dispute/discipline decisions?"
                     name="block6_appealRights"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block6_appealRights}
                     onChange={(value) => updateFormData('block6_appealRights', value as boolean)}
                 />
            </div>
            {formData.block6_appealRights === true && (
                 <div className="pt-4 border-t border-gray-100">
                     <label htmlFor="block6_appealProcess" className="block text-xs font-medium text-gray-700 mb-1">Describe the appeal pathway(s):</label>
                     <textarea id="block6_appealProcess" name="block6_appealProcess" rows={3} className={`${baseInputClasses} ${localErrors.block6_appealProcess ? 'border-red-500' : ''}`} value={formData.block6_appealProcess === undefined ? standardAppealProcessText : formData.block6_appealProcess} onChange={(e) => updateFormData('block6_appealProcess', e.target.value)} placeholder="e.g., Appeal to a separate internal panel, Appeal to national body..."/>
                     {localErrors.block6_appealProcess && <p className="mt-1 text-xs text-red-600">{localErrors.block6_appealProcess}</p>}
                 </div>
             )}
        </div>

        {/* --- Task 6.3 (User List): Society Regulations / Bylaws [OPTIONAL / GOOD PRACTICE] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">6.3 Society Regulations / Bylaws (Optional / Good Practice)</label>
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Allow the Committee to create separate operational rules (e.g., facility use, competition rules) that don't conflict with the Constitution? (See example: Clause 30)</p>
            <div>
                 <RadioGroup
                     label="Allow the Committee to create separate operational Rules or Bylaws?"
                     name="block6_committeeCanMakeBylaws"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block6_committeeCanMakeBylaws !== null ? formData.block6_committeeCanMakeBylaws : true} // Default Yes
                     onChange={(value) => updateFormData('block6_committeeCanMakeBylaws', value as boolean)}
                 />
            </div>
             {formData.block6_committeeCanMakeBylaws === true && (
                 <div className="pt-4 border-t border-gray-100">
                     <label htmlFor="block6_bylawProcedure" className="block text-xs font-medium text-gray-700 mb-1">How are these Regulations made/changed?</label>
                     <select id="block6_bylawProcedure" name="block6_bylawProcedure" className={`${baseInputClasses} ${localErrors.block6_bylawProcedure ? 'border-red-500' : ''}`} value={formData.block6_bylawProcedure || 'committee_resolution'} onChange={(e) => updateFormData('block6_bylawProcedure', e.target.value)}>
                         <option value="committee_resolution">By Committee resolution</option>
                         <option value="committee_consult_gm">By Committee resolution after consulting members</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                     {formData.block6_bylawProcedure === 'Other' && (
                        <Input type="text" className={`mt-1 block w-full ${localErrors.block6_bylawProcedureOther ? 'border-red-500' : ''}`} value={formData.block6_bylawProcedureOther || ''} onChange={(e) => updateFormData('block6_bylawProcedureOther', e.target.value)} placeholder="Specify other procedure..."/>
                     )}
                     {localErrors.block6_bylawProcedure && <p className="mt-1 text-xs text-red-600">{localErrors.block6_bylawProcedure}</p>}
                     {localErrors.block6_bylawProcedureOther && <p className="mt-1 text-xs text-red-600">{localErrors.block6_bylawProcedureOther}</p>}
                     <p className="mt-2 text-xs text-gray-500 italic">Consider adding a standard clause clarifying the Committee's power to make bylaws: "{standardBylawText}"</p>
                 </div>
             )}
        </div>

      {/* Save Button for the Block */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button onClick={handleSave} variant="primary">Save & Close Section 6</Button>
      </div>
    </div>
  );
};

export default Block6Amendments; 