import React from 'react';
import type { StepProps, ConstitutionFormData } from '../ConstitutionWizard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

// Standard Tailwind classes
const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
const textareaClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

// Helper function to render tooltips
const renderTooltip = (content: string) => (
    <Tooltip text={content}>
        <HelpCircle className="text-gray-500 hover:text-brand-primary cursor-help w-4 h-4 ml-1" />
    </Tooltip>
);

// Tooltip Content
const tooltips = {
    initialCommittee: "List the names and positions of the first committee members.",
    firstAGMTiming: "Specify when the first Annual General Meeting will be held after incorporation.",
    constitutionAdoption: "How was this initial constitution adopted? (e.g., vote at inaugural meeting)",
    customTransitional: "Include any other specific rules needed for the transition period."
};

// Update props to match other blocks
interface Block10TransitionalProps extends StepProps {
    blockNumber: number;
    onSaveProgress: (blockNumber: number) => void;
}

const Block10Transitional: React.FC<Block10TransitionalProps> = ({ 
    formData, 
    updateFormData, // Use updateFormData from StepProps
    onComplete,     // Use onComplete from StepProps
    blockNumber,
    onSaveProgress // Use onSaveProgress 
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Use updateFormData prop
        updateFormData(name as keyof ConstitutionFormData, value);
    };

    // Validation logic (basic - check if fields are filled, can be expanded)
    const validateBlock10 = (): boolean => {
      // Add actual validation based on required fields later if needed
      // For now, just return true to allow completion
      return true; 
    };

    const handleSave = () => {
        if (validateBlock10()) {
            console.log('Block 10 Data (Pre-Completion):', {
                block10_initialCommittee: formData.block10_initialCommittee,
                block10_firstAGMTiming: formData.block10_firstAGMTiming,
                block10_constitutionAdoptionMethod: formData.block10_constitutionAdoptionMethod,
                block10_customTransitionalProvisions: formData.block10_customTransitionalProvisions,
            });
             // Call onComplete when validation passes
            onComplete(blockNumber);
        } else {
            console.log("Block 10 Validation Failed");
            // Handle validation errors (e.g., setLocalErrors)
        }
    };

    const handleSaveProgressClick = () => {
      console.log('Saving progress for Block 10...');
      onSaveProgress(blockNumber);
    };

    return (
        <div className="space-y-6"> {/* Replaced border div with space-y */} 
            {/* Removed H3 heading */}
            {/* <h3>Transitional Provisions</h3> */}

            {/* Task 10.1: Initial Committee Members */}
            <div> {/* Added wrapper div */} 
                <h4 className="text-base font-semibold text-gray-800 mb-1 flex items-center"> {/* Adjusted heading style */} 
                    Task 10.1: Initial Committee Members
                    {renderTooltip(tooltips.initialCommittee)}
                </h4>
                <Textarea
                    id="block10_initialCommittee"
                    name="block10_initialCommittee"
                    value={formData.block10_initialCommittee || ''}
                    onChange={handleChange}
                    rows={4}
                    className={textareaClasses}
                    placeholder="e.g., Jane Doe (President), John Smith (Treasurer)..."
                />
            </div>

            {/* Task 10.2: First AGM Timing */}
            <hr className="my-6 border-gray-200" /> {/* Adjusted separator style */} 
            <div> {/* Added wrapper div */} 
                <h4 className="text-base font-semibold text-gray-800 mb-1 flex items-center"> {/* Adjusted heading style */} 
                    Task 10.2: Timing of First AGM
                    {renderTooltip(tooltips.firstAGMTiming)}
                </h4>
                <Input
                    id="block10_firstAGMTiming"
                    name="block10_firstAGMTiming"
                    type="text"
                    value={formData.block10_firstAGMTiming || ''}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g., Within 3 months of incorporation, By [Specific Date]..."
                />
            </div>

            {/* Task 10.3: Adoption of Constitution */}
            <hr className="my-6 border-gray-200" /> {/* Adjusted separator style */} 
            <div> {/* Added wrapper div */} 
                <h4 className="text-base font-semibold text-gray-800 mb-1 flex items-center"> {/* Adjusted heading style */} 
                    Task 10.3: Adoption of this Constitution
                    {renderTooltip(tooltips.constitutionAdoption)}
                </h4>
                <Input
                    id="block10_constitutionAdoptionMethod"
                    name="block10_constitutionAdoptionMethod"
                    type="text"
                    value={formData.block10_constitutionAdoptionMethod || ''}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g., By resolution at the inaugural meeting on [Date]..."
                />
            </div>

            {/* Task 10.4: Custom Transitional Provisions */} 
            <hr className="my-6 border-gray-200" /> {/* Adjusted separator style */} 
            <div> {/* Added wrapper div */} 
                <h4 className="text-base font-semibold text-gray-800 mb-1 flex items-center"> {/* Adjusted heading style */} 
                    Task 10.4: Custom Transitional Provisions
                    {renderTooltip(tooltips.customTransitional)}
                </h4>
                <Textarea
                    id="block10_customTransitionalProvisions"
                    name="block10_customTransitionalProvisions"
                    value={formData.block10_customTransitionalProvisions || ''}
                    onChange={handleChange}
                    rows={4}
                    className={textareaClasses}
                    placeholder="Enter any specific provisions for the transitional period..."
                />
            </div>

            {/* Action Buttons */} 
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200"> 
                <Button variant="secondary" onClick={handleSaveProgressClick}>Save Progress</Button>
                <Button onClick={handleSave}>Mark as Complete</Button>
            </div>
        </div>
    );
};

export default Block10Transitional;