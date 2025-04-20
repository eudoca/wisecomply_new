import React, { useState } from 'react';
import { RadioGroup } from '../../wizard/RadioGroup';
import { Button } from '@/components/ui/button';
import type { StepProps, ConstitutionFormData } from '../ConstitutionWizard';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from '@/components/ui/label';
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InfoIcon } from 'lucide-react';

// Standard Tailwind classes
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";

// Standard Texts
const standardTransitionalText = `On the date this Constitution is adopted:\n- All persons who were members of the Society under its previous rules shall continue as members under this Constitution, mapped to the equivalent membership category where applicable.\n- All persons holding office as Committee members under the previous rules shall continue in office for the remainder of their term or until the next Annual General Meeting, whichever is earlier, subject to the provisions of this Constitution.\n- Any existing bylaws or regulations made under the previous rules shall continue in force insofar as they are not inconsistent with this Constitution, until amended or repealed by the Committee.`;

const Block9Transitional: React.FC<Omit<StepProps, 'errors'>> = ({ formData, updateFormData, onComplete, blockNumber }) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Validation logic for Block 9
  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Task 9.1 Validation
    if (formData.block9_isReplacingConstitution === null || formData.block9_isReplacingConstitution === undefined) {
        newErrors.block9_isReplacingConstitution = 'Please specify if this constitution replaces a previous one.';
        isValid = false;
    }
    if (formData.block9_isReplacingConstitution === true) {
        if (formData.block9_includeTransitionalProvisions === null || formData.block9_includeTransitionalProvisions === undefined) {
             newErrors.block9_includeTransitionalProvisions = 'Please specify if transitional rules are needed.';
             isValid = false;
        }
        if (formData.block9_includeTransitionalProvisions === true && !formData.block9_transitionalProvisionsText?.trim()) {
            newErrors.block9_transitionalProvisionsText = 'Please provide the text for the transitional provisions.';
            isValid = false;
        }
    }
    
    setLocalErrors(newErrors);

    if (isValid) {
      console.log('Block 9 Validation Passed');
      onComplete(blockNumber);
    } else {
      console.log('Block 9 Validation Failed', newErrors);
    }
  };

  return (
    <div className="space-y-6">
        {/* --- Task 9.1: Transitional Provisions [OPTIONAL - needed if replacing old constitution] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">9.1 Transitional Provisions (Optional)</label>
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Needed only if this constitution replaces previous rules for an existing society. Ensures smooth changeover. (See example: Clause 39)</p>
            <div>
                <RadioGroup
                     label="Is this constitution replacing a previous one for an existing society?"
                     name="block9_isReplacingConstitution"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block9_isReplacingConstitution}
                     onChange={(value) => updateFormData('block9_isReplacingConstitution', value as boolean)}
                 />
                 {localErrors.block9_isReplacingConstitution && <p className="mt-1 text-xs text-red-600">{localErrors.block9_isReplacingConstitution}</p>}
            </div>

            {formData.block9_isReplacingConstitution === true && (
                <div className="pt-4 border-t border-gray-100 space-y-4">
                    <div>
                        <RadioGroup
                            label="Include specific rules to manage the transition (e.g., confirming members, officers)?"
                            name="block9_includeTransitionalProvisions"
                            options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                            value={formData.block9_includeTransitionalProvisions !== null ? formData.block9_includeTransitionalProvisions : true} // Default Yes
                            onChange={(value) => updateFormData('block9_includeTransitionalProvisions', value as boolean)}
                        />
                         {localErrors.block9_includeTransitionalProvisions && <p className="mt-1 text-xs text-red-600">{localErrors.block9_includeTransitionalProvisions}</p>}
                    </div>

                    {formData.block9_includeTransitionalProvisions === true && (
                         <div>
                             <label htmlFor="block9_transitionalProvisionsText" className="block text-xs font-medium text-gray-700 mb-1">Review/edit standard transitional provisions:</label>
                             <textarea id="block9_transitionalProvisionsText" name="block9_transitionalProvisionsText" rows={5} className={`${baseInputClasses} ${localErrors.block9_transitionalProvisionsText ? 'border-red-500' : ''}`} value={formData.block9_transitionalProvisionsText === undefined ? standardTransitionalText : formData.block9_transitionalProvisionsText} onChange={(e) => updateFormData('block9_transitionalProvisionsText', e.target.value)} />
                             {localErrors.block9_transitionalProvisionsText && <p className="mt-1 text-xs text-red-600">{localErrors.block9_transitionalProvisionsText}</p>}
                         </div>
                     )}
                </div>
            )}
        </div>

      {/* Save Button for the Block */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button onClick={handleSave} variant="primary">Save & Close Section 9</Button>
      </div>
    </div>
  );
};

export default Block9Transitional; 