import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { RadioGroup } from '../../wizard/RadioGroup';
import { Button } from '../../ui/Button';
import type { StepProps, ConstitutionFormData } from '../ConstitutionWizard';

// Standard Tailwind classes
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";

// Standard Texts
const standardDissolutionText = "The Society may be put into liquidation, or removed from the Register of Incorporated Societies, in accordance with the procedures set out in the Incorporated Societies Act 2022.";

const Block8WindingUp: React.FC<Omit<StepProps, 'errors'>> = ({ formData, updateFormData, onComplete }) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Validation logic for Block 8
  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Task 8.1 Validation (Data key is block5_windingUpDistribution)
    if (!formData.block5_windingUpDistribution) {
        newErrors.block5_windingUpDistribution = 'Please specify how surplus assets will be distributed upon winding up.';
        isValid = false;
    }
    if ((formData.block5_windingUpDistribution === 'specified_charity' || formData.block5_windingUpDistribution === 'Other') && !formData.block5_windingUpDistributionOther?.trim()) {
        newErrors.block5_windingUpDistributionOther = 'Please specify the organisation name(s) or other distribution details.';
        isValid = false;
    }
    
    // Task 8.2 Validation (Optional - no specific validation needed for Yes/No)
    if (formData.block8_dissolutionProcedureReference === null || formData.block8_dissolutionProcedureReference === undefined) {
        newErrors.block8_dissolutionProcedureReference = 'Please specify whether to include a reference to dissolution procedures.';
        isValid = false;
    }

    setLocalErrors(newErrors);

    if (isValid) {
      console.log('Block 8 Validation Passed');
      onComplete();
    } else {
      console.log('Block 8 Validation Failed', newErrors);
    }
  };

  return (
    <div className="space-y-6">
        {/* --- Task 8.1: Distribution of Surplus Assets [Mandatory] --- */}
        {/* Note: Uses block5_ keys for data persistence */}
        <div className="p-4 border border-gray-200 rounded-md">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">8.1 Distribution of Surplus Assets (Mandatory)</label>
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Required clause. Specifies where assets go if the society dissolves. Must go to another non-profit with similar purposes, not members. (Ref: Act s27(1)(j), s124)</p>
             <div>
                <label htmlFor="block5_windingUpDistribution" className="block text-xs font-medium text-gray-700 mb-1">If the Society is wound up or dissolved, where will any surplus assets be transferred?</label>
                <select id="block5_windingUpDistribution" name="block5_windingUpDistribution" className={`${baseInputClasses} ${localErrors.block5_windingUpDistribution ? 'border-red-500' : ''}`} value={formData.block5_windingUpDistribution || ''} onChange={(e) => updateFormData('block5_windingUpDistribution', e.target.value)}>
                    <option value="" disabled>Select...</option>
                    <option value="similar_society">To one or more incorporated societies with similar purposes</option>
                    <option value="specified_charity">To a specified charitable organisation(s) with similar purposes</option>
                    <option value="decided_at_gm">To be decided by members at the final General Meeting (must still meet Act requirements)</option>
                    <option value="Other">Other (Specify - must comply with Act)</option>
                </select>
                 {(formData.block5_windingUpDistribution === 'specified_charity' || formData.block5_windingUpDistribution === 'Other') && (
                    <Input type="text" className={`mt-1 block w-full ${localErrors.block5_windingUpDistributionOther ? 'border-red-500' : ''}`} value={formData.block5_windingUpDistributionOther || ''} onChange={(e) => updateFormData('block5_windingUpDistributionOther', e.target.value)} placeholder="Specify organisation name(s) or other details..."/>
                 )}
                 {localErrors.block5_windingUpDistribution && <p className="mt-1 text-xs text-red-600">{localErrors.block5_windingUpDistribution}</p>}
                 {localErrors.block5_windingUpDistributionOther && <p className="mt-1 text-xs text-red-600">{localErrors.block5_windingUpDistributionOther}</p>}
            </div>
        </div>
        
        {/* --- Task 8.2: Dissolution & Removal Procedures [OPTIONAL / GOOD PRACTICE] --- */}
         <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">8.2 Dissolution Procedures (Optional / Good Practice)</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">Briefly mentioning the process (e.g., requiring Special Resolutions) provides context, although the Act dictates the full procedure. (See example: Clauses 31.1, 31.2, 32)</p>
            <div>
                 <RadioGroup
                     label="Include a clause briefly outlining dissolution/removal procedures (referencing the Act)?"
                     name="block8_dissolutionProcedureReference"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block8_dissolutionProcedureReference !== null ? formData.block8_dissolutionProcedureReference : true} // Default Yes
                     onChange={(value) => updateFormData('block8_dissolutionProcedureReference', value as boolean)}
                 />
                 {localErrors.block8_dissolutionProcedureReference && <p className="mt-1 text-xs text-red-600">{localErrors.block8_dissolutionProcedureReference}</p>}
                 {formData.block8_dissolutionProcedureReference === true && (
                     <p className="mt-1 text-xs text-gray-500 italic p-2 bg-gray-50 rounded border">Standard text similar to: "{standardDissolutionText}" will be included.</p>
                 )}
            </div>
        </div>

      {/* Save Button for the Block */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button onClick={handleSave} variant="primary">Save & Close Section 8</Button>
      </div>
    </div>
  );
};

export default Block8WindingUp; 