import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SubSectionData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string;
  actReferenceLink?: string;
  helpText: string;
}

const subSectionsForBlock3: SubSectionData[] = [
  {
    id: '3.01',
    number: '3.01',
    title: 'Number of officers',
    isS26Compulsory: true,
    actReferenceLabel: 'S45',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100956.html?search=sw_096be8ed81dce6e4_76_25_se&p=1&sr=2', // Link seems to be for S76 from image, S45 is officer qualifications
    helpText: `The Incorporated Societies Act 2022 requires every society to have a committee made up of at least three officers. This sets the legal minimum to ensure proper oversight and accountability.\nYou can choose to either fix the number of officers or allow a range. A fixed number offers predictability but less flexibility. A range (e.g. between 3 and 7) gives your society room to grow while still meeting the minimum requirement.\nWhichever option you choose, the rules should reflect how your society operates in practice and be easy to update if your committee structure changes over time.`
  },
  {
    id: '3.02',
    number: '3.02',
    title: 'Committee composition',
    isS26Compulsory: true,
    actReferenceLabel: 'S46',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100956.html?search=sw_096be8ed81dce6e4_76_25_se&p=1&sr=2', // Link seems to be for S76 from image, S46 is committee management
    helpText: `The Incorporated Societies Act 2022 requires that a majority of the COMMITTEE must be either MEMBERs of the Society or representatives of body corporates that are MEMBERs. This ensures the COMMITTEE is primarily accountable to the society's membership.\nThis rule supports democratic governance and avoids situations where outsiders could control decision-making without having a direct connection to the Society. It ties voting power to those with a stake in the organisation.\nWhen setting your COMMITTEE rules, make sure this majority requirement is preserved - even if some external expertise is added to the COMMITTEE for operational or advisory reasons.`
  },
  {
    id: '3.03',
    number: '3.03',
    title: 'Committee functions and powers',
    isS26Compulsory: true,
    actReferenceLabel: 'S46',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100956.html?search=sw_096be8ed81dce6e4_76_25_se&p=1&sr=2', // Link seems to be for S76
    helpText: `Under the Incorporated Societies Act 2022, the committee is responsible for managing, or directing and supervising the management of, the society's operations and affairs. This ensures that the society has continuous governance throughout the year, not just at AGM points, maintaining operational stability and legal compliance.\nThe committee holds all powers necessary for managing the society, but these powers are bounded by the Act and the society's constitution. This framework prevents unauthorised or rogue decision-making, anchoring the committee's actions firmly within statutory and constitutional boundaries.\nEach committee member, as an officer of the society, must act in good faith and in the best interests of the society when performing their functions. This duty reinforces the main function of your committee and ensures that decisions are made with integrity and accountability.`
  },
  {
    id: '3.04',
    number: '3.04',
    title: 'Sub-committees (if any)',
    isS26Compulsory: false,
    helpText: `Please note: There is no direct reference in the Act that requires or regulates sub-committees. This is a constitution-level governance choice.\nSocieties may wish to set up sub-committees to carry out specific tasks or provide advice to the main COMMITTEE. This clause makes clear that the COMMITTEE has the power to establish sub-committees and choose their members - whether or not those individuals are Society MEMBERs.\nTo ensure good governance, this clause places clear limits on sub-committees. They can't spend money or make financial commitments without express approval. They also can't delegate their powers further or co-opt others. These safeguards help the COMMITTEE retain oversight and prevent unauthorised actions.\nSetting quorum rules and membership restrictions for sub-committees helps ensure accountability and prevents decisions being made by too few people or by those with no link to the Society.`
  },
  {
    id: '3.05',
    number: '3.05',
    title: 'General matters',
    isS26Compulsory: false,
    helpText: `Please note: There is no direct reference in the Act that requires or regulates committee proceedings. This is a constitution-level governance choice.\nThe COMMITTEE can appoint sub-committees and decide who serves on them - including people who are not Society MEMBERs. This gives flexibility to bring in skills or experience relevant to specific tasks or projects.\nThe clause sets boundaries to keep governance clear and controlled. Sub-committees must not commit the Society to any financial expenditure without COMMITTEE approval, cannot co-opt additional members, and must not further delegate powers. A minimum quorum ensures decisions are made with proper participation.\nThis structure is optional but widely used. It enables committees to delegate work without diluting accountability. It also reinforces that ultimate decision-making power stays with the full COMMITTEE, not sub-groups.`
  },
];

const clause302 = `A majority of the OFFICERs on the COMMITTEE must be either: \n• MEMBERs of the Society, or \n• representatives of bodies corporate that are MEMBERs of the Society.`;
const clause303 = `From the end of each ANNUAL GENERAL MEETING until the end of the next, the Society shall be managed by, or under the direction or supervision of, the COMMITTEE in accordance with the Incorporated Societies Act 2022, any Regulations made under that ACT, and this CONSTITUTION.\n\nThe COMMITTEE has all the powers necessary for managing - and for directing and supervising the management of - the operation and affairs of the Society.`;
const clause304 = `The COMMITTEE may appoint sub-committees consisting of such persons (whether or not MEMBERs of the Society) and for such purposes as it thinks fit. Unless otherwise resolved by the COMMITTEE—\n• the quorum of every sub-committee is half the members of the sub-committee but not less than 2,\n• no sub-committee shall have power to co-opt additional members,\n• a sub-committee must not commit the Society to any financial expenditure without express authority from the COMMITTEE, and\n• a sub-committee must not further delegate any of its powers.`;
const clause305 = `The COMMITTEE and any sub-committee may act by resolution approved during a conference call using audio and/or audio-visual technology or through a written ballot conducted by email, electronic voting system, or post.\n\nAny such resolution shall be recorded in the minutes of the next COMMITTEE or sub-committee meeting.\n\nOther than as prescribed by the Act or this CONSTITUTION, the COMMITTEE or any sub-committee may regulate its proceedings as it thinks fit.`;

const Block3Committee: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };
  const handleNumberInputChange = (field: keyof typeof formData, value: string) => {
    const num = parseInt(value, 10);
    updateFormData(field, isNaN(num) ? undefined : num);
  };
  const handleOfficerNumberOptionChange = (value: string) => {
    updateFormData('block3_01_officerNumberOption', value as 'fixed' | 'range');
    if (value === 'fixed') updateFormData('block3_01_maxOfficerCount', undefined);
    if (value === 'range') updateFormData('block3_01_fixedOfficerCount', undefined);
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock3.map((subSection) => (
        <div key={subSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
          {/* Sub-section Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold text-gray-800">{subSection.number} {subSection.title}</h3>
                     <div className="flex items-center space-x-2">
              <span className={cn("flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium border", subSection.isS26Compulsory ? "bg-[#8065F2] text-white border-[#8065F2]" : "bg-gray-200 text-gray-500 border-gray-300")} title={subSection.isS26Compulsory ? "Compulsory under Section 26 ISA 2022" : "Not compulsory under Section 26 ISA 2022"}>S26</span>
              {subSection.actReferenceLabel && subSection.actReferenceLink && (
                <a href={subSection.actReferenceLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition-colors" title={`View ${subSection.actReferenceLabel} in the Act`}>{subSection.actReferenceLabel}<ExternalLinkIcon className="w-3 h-3 ml-1 flex-shrink-0" /></a>
                 )}
            </div>
        </div>

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

            {subSection.id === '3.01' && (
              <>
                <p className="text-sm text-gray-700">Choose the clause to include in your constitution</p>
                <RadioGroup value={formData.block3_01_officerNumberOption} onValueChange={handleOfficerNumberOptionChange} className="space-y-2 pt-1">
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="fixed" id={`${subSection.id}-fixed`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-fixed`} className="flex-1 text-sm font-normal text-gray-700">
                      The COMMITTEE will consist of <Input 
                        type="number" 
                        min={3} 
                        max={20} 
                        value={formData.block3_01_fixedOfficerCount === undefined ? '' : formData.block3_01_fixedOfficerCount} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value) && value >= 3 && value <= 20) {
                            handleNumberInputChange('block3_01_fixedOfficerCount', e.target.value);
                          } else if (e.target.value === '') {
                            updateFormData('block3_01_fixedOfficerCount', undefined);
                          }
                        }} 
                        disabled={formData.block3_01_officerNumberOption !== 'fixed'} 
                        className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" 
                      /> OFFICERs.
                    </Label>
                     </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="range" id={`${subSection.id}-range`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-range`} className="flex-1 text-sm font-normal text-gray-700">
                      The COMMITTEE will consist of at least 3 OFFICERs and no more than <Input 
                        type="number" 
                        min={4} 
                        max={20} 
                        value={formData.block3_01_maxOfficerCount === undefined ? '' : formData.block3_01_maxOfficerCount} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value) && value >= 4 && value <= 20) {
                            handleNumberInputChange('block3_01_maxOfficerCount', e.target.value);
                          } else if (e.target.value === '') {
                            updateFormData('block3_01_maxOfficerCount', undefined);
                          }
                        }} 
                        disabled={formData.block3_01_officerNumberOption !== 'range'} 
                        className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" 
                      /> OFFICERs.
                    </Label>
                  </div>
                </RadioGroup>
              </>
            )}
            {subSection.id === '3.02' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block3_02_includeCompositionClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block3_02_includeCompositionClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for committee composition</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Committee Composition Requirements</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause302.split(/\n+/).map((line, idx) => {
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
              </>
            )}
            {subSection.id === '3.03' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block3_03_includeFunctionsPowersClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block3_03_includeFunctionsPowersClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for committee functions and powers</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Committee Functions and Powers</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause303.split(/\n+/).map((line, idx) => {
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
              </>
            )}
            {subSection.id === '3.04' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block3_04_includeSubcommitteesClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block3_04_includeSubcommitteesClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for sub-committees</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Sub-Committee Requirements</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause304.split(/\n+/).map((line, idx) => {
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
              </>
            )}
            {subSection.id === '3.05' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block3_05_includeGeneralProvisionsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block3_05_includeGeneralProvisionsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for general committee provisions</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">General Committee Provisions</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause305.split(/\n+/).map((line, idx) => {
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
              </>
            )}

            {!['3.01', '3.02', '3.03', '3.04', '3.05'].includes(subSection.id) && (<p>Questions for {subSection.title} will be built here.</p>)}
            <div className="flex justify-end mt-4"><button onClick={() => console.log(`Update constitution for ${subSection.number}. Data:`, formData)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button></div>
             </div>
        </div>
      ))}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <button onClick={() => onSaveProgress(blockNumber)} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Save Progress</button>
        <button onClick={() => onComplete(blockNumber)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">Mark Block as Complete</button>
        </div>
    </div>
  );
};
export default Block3Committee; 