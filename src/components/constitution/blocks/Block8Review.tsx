import { Button } from '@/components/ui/button'; // Standardized path
import React from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { ConstitutionFormData, StepProps, ValidationErrors } from '../ConstitutionWizard';

// Helper component to display a section of the form data
const ReviewSection: React.FC<{ title: string; data: Record<string, any> | string | undefined | null | boolean | number | string[]}> = ({ title, data }) => {
    if (data === undefined || data === null || (typeof data === 'object' && Object.keys(data).length === 0) || (Array.isArray(data) && data.length === 0) || data === '') {
        return null; // Don't render empty sections
    }

    let displayData: React.ReactNode;
    if (typeof data === 'boolean') {
        displayData = data ? 'Yes' : 'No';
    } else if (Array.isArray(data)) {
        displayData = (
            <ul className="list-disc list-inside">
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        );
    } else if (typeof data === 'object') {
        // Basic object display (could be enhanced)
        displayData = <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>;
    } else {
        displayData = <p className="text-gray-700 whitespace-pre-wrap">{String(data)}</p>;
    }

    return (
        <div className="py-2 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-600 mb-1">{title}</h4>
            <div className="text-sm">{displayData}</div>
        </div>
    );
};

// Main Review Block Component
const Block8Review: React.FC<Pick<StepProps, 'formData'>> = ({ formData }) => {

    const handleGenerate = () => {
        console.log('Generating Constitution with data:', formData);
        // TODO: Implement API call to backend to generate the document
        alert('Constitution generation initiated! (Check console for data)');
    };

    // Helper to filter and format keys for display
    const formatKey = (key: string): string => {
        return key
            .replace(/^block\d+_/, '') // Remove block prefix
            .replace(/([A-Z])/g, ' $1') // Add space before capitals
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
    };

    // Group data by block number
    const groupedData: Record<number, Record<string, any>> = {};
    Object.entries(formData).forEach(([key, value]) => {
        const match = key.match(/^block(\d+)_/);
        if (match) {
            const blockNum = parseInt(match[1], 10);
            if (!groupedData[blockNum]) {
                groupedData[blockNum] = {};
            }
            groupedData[blockNum][key] = value;
        }
    });

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review Your Constitution Details</h3>
            <p className="text-sm text-gray-600">
Please review the information you provided below. If anything needs changing, please go back to the relevant section before generating the document.</p>

            {Object.entries(groupedData).sort(([numA], [numB]) => parseInt(numA) - parseInt(numB)).map(([blockNum, blockData]) => (
                 <div key={blockNum} className="p-4 border border-gray-200 rounded-md space-y-2 bg-white">
                    <h4 className="text-md font-semibold text-brand-primary">Block {blockNum} Summary</h4>
                     {Object.entries(blockData).map(([key, value]) => (
                         <ReviewSection key={key} title={formatKey(key)} data={value} />
                     ))}
                 </div>
            ))}

            {Object.keys(groupedData).length === 0 && (
                <p className="text-sm text-gray-500 italic">No constitution data entered yet. Please complete the previous sections.</p>
            )}

            {/* Generate Button */} 
            <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button onClick={handleGenerate} variant="primary" size="lg" disabled={Object.keys(groupedData).length === 0}>
                    Generate Constitution Document
                </Button>
            </div>
        </div>
    );
};

export default Block8Review; 