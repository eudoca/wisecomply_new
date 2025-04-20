import { Button } from '@/components/ui/button';
import { Tooltip } from "@/components/ui/tooltip";
import React, { useState, useCallback, useEffect } from 'react';
import { RadioGroup } from '../../wizard/RadioGroup';
import { HelpCircle } from 'lucide-react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';
import { cn } from '../../../utils/cn';

// Standard Tailwind classes
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const htmlLabelClass = "block text-sm font-medium text-gray-700 mb-1";
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1";
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3";
const errorClass = "mt-1 text-xs text-red-600";
const helpIconClass = "ml-2 text-gray-500 hover:text-gray-700 inline-block align-middle h-4 w-4 cursor-help";
const requiredMarker = <span className="text-red-500">*</span>;

// Define the props for the component
interface Block10TransitionalProps extends StepProps {
    blockNumber: number;
    onSaveProgress: (blockNumber: number) => void;
}

// Define Tooltips specific to Block 10
const TOOLTIPS = {
    block10_isReplacingConstitution: "Is this new constitution replacing an existing one for the society?",
    block10_includeTransitionalProvisions: "Transitional provisions explain how things work during the changeover from the old constitution to the new one (e.g., when the new rules take effect, how existing committee members continue). It\'s important if replacing an existing constitution.",
    block10_transitionalProvisionsText: "Specify the details of the transition. For example: \"This constitution takes effect from [Date/AGM]. The committee elected under the previous constitution continues in office until the first AGM under this constitution. All assets and liabilities of the society under its former constitution become the assets and liabilities of the society under this constitution.\""
};

// Standard Texts
const standardTransitionalText = "This constitution replaces the previous constitution of the Society. It comes into effect immediately upon its adoption by special resolution at a general meeting. The members of the Committee in office immediately prior to the adoption of this constitution shall continue in office until the conclusion of the first annual general meeting held after the adoption of this constitution. All actions taken by the Committee and members under the previous constitution remain valid.";

export const Block10Transitional: React.FC<Block10TransitionalProps> = ({
    formData,
    updateFormData,
    onComplete,
    blockNumber,
    onSaveProgress,
}) => {

    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    // Validation function for Block 10
    const validateBlock10 = useCallback((currentFormData: ConstitutionFormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};

        // Task 10.1: Replacement & Provisions
        if (currentFormData.block10_isReplacingConstitution === null || currentFormData.block10_isReplacingConstitution === undefined) {
            newErrors.block10_isReplacingConstitution = 'Please specify if this constitution replaces an existing one.';
        }

        if (currentFormData.block10_isReplacingConstitution === true) {
            if (currentFormData.block10_includeTransitionalProvisions === null || currentFormData.block10_includeTransitionalProvisions === undefined) {
                 newErrors.block10_includeTransitionalProvisions = 'Please specify if transitional provisions are needed.';
            }
            if (currentFormData.block10_includeTransitionalProvisions === true && !currentFormData.block10_transitionalProvisionsText?.trim()) {
                 newErrors.block10_transitionalProvisionsText = 'Please provide the text for the transitional provisions.';
            }
        }

        return newErrors;
    }, []);

    useEffect(() => {
        const validationErrors = validateBlock10(formData);
        setLocalErrors(validationErrors);
    }, [formData, validateBlock10]);

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateFormData(name as keyof ConstitutionFormData, value);
        if (localErrors[name as keyof ConstitutionFormData]) {
            setLocalErrors(prev => { const next = {...prev}; delete next[name as keyof ConstitutionFormData]; return next; });
        }
    };

    const handleBooleanRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
        const booleanValue = value === 'Yes' || value === true ? true : value === 'No' || value === false ? false : null;

        // Clear dependent fields if conditions change
        if (field === 'block10_isReplacingConstitution' && booleanValue === false) {
            updateFormData('block10_includeTransitionalProvisions', null);
            updateFormData('block10_transitionalProvisionsText', '');
            setLocalErrors(prev => {
                const next = {...prev};
                delete next.block10_includeTransitionalProvisions;
                delete next.block10_transitionalProvisionsText;
                return next;
            });
        }
        if (field === 'block10_includeTransitionalProvisions' && booleanValue === false) {
             updateFormData('block10_transitionalProvisionsText', '');
             setLocalErrors(prev => { const next = {...prev}; delete next.block10_transitionalProvisionsText; return next; });
        }

        updateFormData(field, booleanValue);
        if (localErrors[field]) {
             setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
        }
    };

    const handleSave = () => {
        const validationErrors = validateBlock10(formData);
        setLocalErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Block 10 Validation Passed');
            onComplete(blockNumber);
        } else {
            console.log('Block 10 Validation Failed', validationErrors);
        }
    };

    // --- Render Helpers ---
    const renderBooleanRadioGroup = (id: keyof ConstitutionFormData, labelText: string, required: boolean = true, tooltipText?: string) => (
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
                options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                value={typeof formData[id] === 'boolean' || formData[id] === null || formData[id] === undefined ? formData[id] : null}
                onChange={(value) => handleBooleanRadioChange(id, value)}
            />
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    const renderTextArea = (id: keyof ConstitutionFormData, labelText: string, required: boolean = true, tooltipText?: string, placeholder?: string, rows: number = 5) => (
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
             <p className="mt-2 text-xs text-gray-500">Consider using or adapting the standard text: "{standardTransitionalText}"</p>
            {localErrors[id] && <p className={errorClass}>{localErrors[id]}</p>}
        </div>
    );

    // --- Main Component Return ---
    return (
        <div className="space-y-6">
            {/* Removed H3 heading */}
            {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Transitional Provisions</h3> */}

            {/* Task 10.1: Replacement & Provisions - Content moved directly here */}
            <div>
                <h4 className={taskTitleClass}>10.1 Adoption & Transition</h4>
                <p className={descriptionClass}>Clarify if this constitution replaces an old one and outline the transition process.</p>
                
                <div className="space-y-4">
                    {renderBooleanRadioGroup('block10_isReplacingConstitution', 'Is this constitution replacing an existing constitution for the society?', true, TOOLTIPS.block10_isReplacingConstitution)}

                    {formData.block10_isReplacingConstitution === true && (
                        <div className="pl-4 border-l-2 border-gray-200 space-y-4">
                             {renderBooleanRadioGroup('block10_includeTransitionalProvisions', 'Include specific transitional provisions?', true, TOOLTIPS.block10_includeTransitionalProvisions)}

                             {formData.block10_includeTransitionalProvisions === true && (
                                renderTextArea('block10_transitionalProvisionsText', 'Transitional Provisions Text', true, TOOLTIPS.block10_transitionalProvisionsText, standardTransitionalText)
                             )}
                        </div>
                    )}
                 </div>
            </div>

            {/* Action Buttons - Adjusted position relative to main container */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                    variant="secondary"
                    onClick={() => onSaveProgress(blockNumber)}
                    type="button"
                >
                    Save Progress
                </Button>
                <Button
                    onClick={handleSave}
                    type="button"
                >
                    Mark as Complete
                </Button>
            </div>
        </div>
    );
};

export default Block10Transitional; 