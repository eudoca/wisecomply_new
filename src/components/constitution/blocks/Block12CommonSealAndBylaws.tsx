import React, { useState } from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle, CheckCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // For editable text box

interface SubSectionWidgetData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string;
  actReferenceLink?: string;
  helpText: string;
  // Specific content for each subsection will be handled in the map
}

const subSectionsForBlock12: SubSectionWidgetData[] = [
  {
    id: '12.01',
    number: '12.01',
    title: 'Common seal usage',
    isS26Compulsory: false,
    helpText: `Some societies choose to use a common seal - a physical stamp used to formally execute legal documents. Under the Incorporated Societies Act 2022, having a common seal is optional, so you only need to include these rules if your society decides to have one.\nYou're being asked to confirm whether your society will have a common seal, and if so, who is responsible for holding it and how it may be used. If your society does use a seal, your constitution should clearly state who holds custody of the seal (e.g. the CHAIRPERSON or another OFFICER), and the procedure for using it - typically by resolution of the COMMITTEE and with signatures from two OFFICERs. This provides accountability and prevents improper use.\nIncluding clear rules about the common seal protects your society by ensuring that documents are properly authorised, the seal is securely held, and its use is formally approved when needed.`,
  },
  {
    id: '12.02',
    number: '12.02',
    title: 'Bylaws implementation and amendment',
    isS26Compulsory: false,
    actReferenceLabel: 'S28',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100893.html?search=sw_096be8ed81dce6e4_bylaws_25_se&p=1&sr=2',
    helpText: `Societies often need to create rules for day-to-day conduct that don't belong in the constitution - such as behavioural expectations or event procedures. These rules can be made and updated as bylaws or policies, provided they don't override the constitution or the law.\nYou're being asked to confirm that your society's committee has the power to make and change bylaws and operational policies, and that these must be consistent with the Incorporated Societies Act 2022 and the society's constitution. The COMMITTEE must also maintain a Bylaw Policy that outlines how new bylaws are developed and how members are consulted and involved in that process.\nThis gives your society the flexibility to manage evolving operational needs, while ensuring bylaws remain transparent, consistent with your founding rules, and legally compliant.`,
  },
];

const commonSealClausePart2Default = (custodyText: string = "an OFFICER, the CHAIRPERSON") => `that must be kept in the custody of ${custodyText}
The common seal may be affixed to any document: 
• by resolution of the COMMITTEE, and 
• must be countersigned by 2 OFFICERs or by such other means as the COMMITTEE may resolve from time to time.`;

const bylawsClauseText = `The COMMITTEE from time to time may make and amend bylaws, and policies for the conduct and control of Society activities and codes of conduct applicable to MEMBERs, but no such bylaws, policies or codes of conduct applicable to MEMBERs shall be inconsistent with this CONSTITUTION, the ACT, regulations made under the ACT, or any other legislation.
The COMMITTEE must maintain a Bylaw Policy that sets out: 
(i) the process for making and amending a bylaw; 
(ii) how members will access and participate in consultation and approval processes.`;

interface ValidationError {
  message: string;
  fields: string[];
}

const Block12CommonSealAndBylaws: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, ValidationError | null>>({});
  const [successSubsectionId, setSuccessSubsectionId] = useState<string | null>(null);

  const handleSealOptionChange = (value: string) => {
    updateFormData('block12_01_commonSealOption', value as 'noSeal' | 'hasSeal');
    if (value === 'noSeal') {
      updateFormData('block12_01_sealCustody', ''); // Clear custody if no seal
    }
    setValidationErrors(prev => ({ ...prev, '12.01': null }));
  };

  const handleCustodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('block12_01_sealCustody', e.target.value);
    setValidationErrors(prev => ({ ...prev, '12.01': null }));
  };

  const handleBylawsCheckboxChange = (checked: boolean | 'indeterminate') => {
    updateFormData('block12_02_includeBylawsClause', checked === true);
    setValidationErrors(prev => ({ ...prev, '12.02': null }));
  };

  const validateSubsection = (subsectionId: string): ValidationError | null => {
    const errors: string[] = [];
    if (subsectionId === '12.01') {
      if (!formData.block12_01_commonSealOption) {
        errors.push('block12_01_commonSealOption');
      } else if (formData.block12_01_commonSealOption === 'hasSeal') {
        if (!formData.block12_01_sealCustody?.trim()) {
          errors.push('block12_01_sealCustody');
        }
      }
    } else if (subsectionId === '12.02') {
      // block12_02_includeBylawsClause is a checkbox, validation for it would be if it *must* be checked.
      // Currently, no specific data field depends on it being checked for validation here.
    }
    if (errors.length > 0) return { message: "Please complete all required fields.", fields: errors };
    return null;
  };

  const handleUpdateClick = (subsectionId: string) => {
    setSuccessSubsectionId(null);
    const validationResult = validateSubsection(subsectionId);
    setValidationErrors(prev => ({ ...prev, [subsectionId]: validationResult }));
    if (!validationResult) {
      console.log(`Block12: Constitution update logic for ${subsectionId} would run here.`);
      setSuccessSubsectionId(subsectionId);
      setTimeout(() => setSuccessSubsectionId(null), 3000);
    }
  };

  const isFieldInvalid = (subsectionId: string, fieldName: string): boolean => {
    return !!validationErrors[subsectionId]?.fields.includes(fieldName);
  };
  const getRadioGroupErrorState = (subsectionId: string, fieldName: string): boolean => { // For 12.01 RadioGroup
    return isFieldInvalid(subsectionId, fieldName);
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock12.map((subSection) => {
        const currentError = validationErrors[subSection.id];
        const isSuccess = successSubsectionId === subSection.id;
        return (
          <div key={subSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
            {/* Sub-section Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold text-gray-800">
                {subSection.number} {subSection.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span 
                  className={cn(
                    "flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium border",
                    subSection.isS26Compulsory 
                      ? "bg-[#8065F2] text-white border-[#8065F2]" 
                      : "bg-gray-200 text-gray-500 border-gray-300"
                  )}
                  title={subSection.isS26Compulsory ? "Compulsory under Section 26 ISA 2022" : "Not compulsory under Section 26 ISA 2022"}
                >
                  S26
                </span>
                {subSection.actReferenceLabel && subSection.actReferenceLink && (
                  <a href={subSection.actReferenceLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                    title={`View ${subSection.actReferenceLabel} in the Act`}>
                    {subSection.actReferenceLabel}
                    <ExternalLinkIcon className="w-3 h-3 ml-1 flex-shrink-0" />
                  </a>
                )}
              </div>
            </div>

            {/* Content for the specific sub-section */}
            <div className="pl-1 space-y-3">
              <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                <AccordionItem value={`help-${subSection.id}`} className="border-b-0">
                  <AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                    {subSection.helpText.split(/\n+/).map((p, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {subSection.id === '12.01' && (
                <RadioGroup 
                  value={formData.block12_01_commonSealOption}
                  onValueChange={handleSealOptionChange}
                  className={cn("space-y-2 pt-1 rounded-md", getRadioGroupErrorState('12.01', 'block12_01_commonSealOption') ? 'ring-2 ring-red-500 ring-offset-1' : '')}
                >
                  {/* Option 1: No Seal */}
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-50 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="noSeal" id={`${subSection.id}-noSeal`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-noSeal`} className="flex-1 text-sm font-normal text-gray-700">
                      The Society will not have a common seal
                    </Label>
                  </div>
                  {/* Option 2: Has Seal */}
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-50 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="hasSeal" id={`${subSection.id}-hasSeal`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-hasSeal`} className="flex-1 text-sm font-normal text-gray-700">
                      <div className="mb-1">
                        The Society will have a common seal 
                      </div>
                      {formData.block12_01_commonSealOption === 'hasSeal' && (
                        <div className="mt-2">
                          <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Common Seal Rules</h4>
                          <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                            <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                              <p className="block text-xs text-gray-700 font-normal leading-snug">
                                The Society will have a common seal that must be kept in the custody of 
                                <Input 
                                  type="text" 
                                  value={formData.block12_01_sealCustody || ''} 
                                  onChange={handleCustodyChange} 
                                  placeholder="e.g., an OFFICER, the CHAIRPERSON" 
                                  className={cn(
                                    "inline-block w-auto min-w-[250px] h-7 px-2 text-xs mx-1 my-1 align-baseline bg-white border-gray-300 rounded-sm placeholder-gray-400 placeholder:italic focus:border-purple-500 focus:ring-purple-500",
                                    isFieldInvalid('12.01', 'block12_01_sealCustody') ? 'border-red-500' : 'border-gray-300'
                                  )}
                                />
                              </p>
                              {commonSealClausePart2Default("").split('\n').slice(1).map((line, idx) => {
                                const trimmedLine = line.trim(); 
                                if (trimmedLine === "") return null;
                                
                                if (trimmedLine.startsWith('•')) { 
                                  return (
                                    <div 
                                      key={idx} 
                                      className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                                    >
                                      <span className="mr-1 text-violet-400">&bull;</span>
                                      <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                                    </div>
                                  ); 
                                }
                                
                                return (
                                  <div 
                                    key={idx} 
                                    className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              )}

              {subSection.id === '12.02' && (
                <>
                  <div className="flex items-start space-x-3 p-2 rounded-md border bg-transparent hover:border-purple-300 ">
                    <Checkbox 
                      id={`${subSection.id}-includeClause`}
                      checked={!!formData.block12_02_includeBylawsClause} // Ensure formData access is correct
                      onCheckedChange={(checked: boolean | 'indeterminate') => handleBylawsCheckboxChange(checked)}
                      className="mt-1"
                    />
                    <Label htmlFor={`${subSection.id}-includeClause`} className="flex-1 text-sm font-normal">
                       Select this clause to include in your constitution
                    </Label>
                  </div>
                  {/* Clause text now always visible below checkbox */}
                  <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Bylaws Rules</h4>
                  <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                    <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                      {bylawsClauseText.split(/\n+/).map((line, idx) => {
                        const trimmedLine = line.trim(); 
                        if (trimmedLine === "") return null;
                        
                        if (trimmedLine.startsWith('•')) { 
                          return (
                            <div 
                              key={idx} 
                              className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                            >
                              <span className="mr-1 text-violet-400">&bull;</span>
                              <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                            </div>
                          ); 
                        } else if (trimmedLine.startsWith('o')) {
                          return (
                            <div 
                              key={idx} 
                              className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                            >
                              <span className="mr-1 text-violet-400">○</span>
                              <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                            </div>
                          );
                        }
                        
                        return (
                          <div 
                            key={idx} 
                            className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                            dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-end items-center mt-4 space-x-2">
                    {currentError && !isSuccess && <span className="text-red-600 text-xs italic">{currentError?.message}</span>}
                    {isSuccess && <span className="text-green-600 text-xs italic flex items-center"><CheckCircleIcon className="w-4 h-4 mr-1" />Constitution updated</span>}
                    <button onClick={() => handleUpdateClick(subSection.id)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
      
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <button onClick={() => onSaveProgress(blockNumber)} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Save Progress</button>
        <button onClick={() => onComplete(blockNumber)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">Mark Block as Complete</button>
      </div>
    </div>
  );
};

export default Block12CommonSealAndBylaws; 