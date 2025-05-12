import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

const subSectionsForBlock9: SubSectionData[] = [
  {
    id: '9.01',
    number: '9.01',
    title: 'How the constitution can be changed',
    isS26Compulsory: true,
    actReferenceLabel: 'S30-37',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100898.html?search=sw_096be8ed81dce6e4_30_25_se&p=1&sr=2',
    helpText: `A constitution isn't set in stone - societies need the ability to update their rules as circumstances change. The Incorporated Societies Act 2022 requires every society to clearly set out how amendments to the constitution can be made, so that the process is predictable and fair for members.\nModify the suggested clause to reflect how constitutional amendments are proposed, how much notice members must be given, what majority is needed to pass them and whether changes can be approved outside of a meeting (if your constitution allows written resolutions). You'll also need to confirm that all approved changes are registered with the Registrar, and if your society is a charity, with Charities Services too. Minor or technical amendments can be made by the COMMITTEE, but only if members are notified and do not object within 20 working days.\nThese rules ensure that changes are made openly, with member input, and only take effect once properly registered. They also protect the society from rushed or unclear amendments and keep your constitution aligned with legal obligations.`
  },
];

const clause901_part1 = `All amendments must be made in accordance with this CONSTITUTION. Any minor or technical amendments shall be notified to MEMBERs as outlined in section 31 of the ACT.\nThe Society may amend or replace this CONSTITUTION at a GENERAL MEETING by a resolution passed by a `;
const clause901_part2 = ` majority of those MEMBERs present and voting.\nThat amendment could be approved by a resolution passed in lieu of a meeting but only if allowed by this CONSTITUTION (see 6.03).\nAny proposed resolution to amend or replace this CONSTITUTION shall be -\n• signed by at least `;
const clause901_part3 = `% of eligible MEMBERs, and \n• given in writing to the COMMITTEE at least `;
const clause901_part4 = ` WORKING DAYS before the GENERAL MEETING at which the resolution is to be considered, and \n• accompanied by a written explanation of the reasons for the proposal.\nAt least `;
const clause901_part5 = ` WORKING DAYS before the GENERAL MEETING at which any amendment is to be considered , the COMMITTEE shall give to all MEMBERs -\n• notice of the proposed resolution, and\n• the reasons for the proposal, and \n• any recommendations the COMMITTEE has.\nWhen an amendment is approved by a GENERAL MEETING it shall be -\n• notified to the Registrar of Incorporated Societies in the form and manner specified in the Act for registration, and \n• shall take effect from the date of registration.\nIf the Society is registered as a charity under the Charities Act 2005 the amendment shall also be notified to Charities Services as required by section 40 of that ACT.`;

const Block9ChangingTheConstitution: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };
  const handleTextInputChange = (field: keyof typeof formData, value: string) => {
    updateFormData(field, value);
  };
  const handleNumberInputChange = (field: keyof typeof formData, value: string) => {
    const num = parseInt(value, 10);
    updateFormData(field, isNaN(num) ? undefined : num);
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock9.map((subSection) => (
        <div key={subSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold text-gray-800">{subSection.number} {subSection.title}</h3>
            <div className="flex items-center space-x-2">
              <span className={cn("flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium border", subSection.isS26Compulsory ? "bg-[#8065F2] text-white border-[#8065F2]" : "bg-gray-200 text-gray-500 border-gray-300")} title={subSection.isS26Compulsory ? "Compulsory under Section 26 ISA 2022" : "Not compulsory under Section 26 ISA 2022"}>S26</span>
              {subSection.actReferenceLabel && subSection.actReferenceLink && (
                <a href={subSection.actReferenceLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition-colors" title={`View ${subSection.actReferenceLabel} in the Act`}>{subSection.actReferenceLabel}<ExternalLinkIcon className="w-3 h-3 ml-1 flex-shrink-0" /></a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="pl-1 space-y-3">
            <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
              <AccordionItem value={`help-${subSection.id}`} className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{subSection.helpText.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
            </Accordion>

            {subSection.id === '9.01' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block9_01_includeChangeClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block9_01_includeChangeClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">How the Constitution Can Be Changed</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause901_part1.split(/\n+/).map((line, idx) => {
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
                    <Input 
                      type="text" 
                      placeholder="e.g., simple, two thirds" 
                      value={formData.block9_01_amendmentMajority || ''} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange('block9_01_amendmentMajority', e.target.value)} 
                      className="inline-block w-auto min-w-[150px] h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                    />
                    {clause901_part2.split(/\n+/).map((line, idx) => {
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
                    <Input 
                      type="number" 
                      value={formData.block9_01_memberProposalPercent === undefined ? '' : formData.block9_01_memberProposalPercent} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block9_01_memberProposalPercent', e.target.value)} 
                      className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                    />
                    {clause901_part3.split(/\n+/).map((line, idx) => {
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
                    <Input 
                      type="number" 
                      value={formData.block9_01_memberProposalNoticeDays === undefined ? '' : formData.block9_01_memberProposalNoticeDays} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block9_01_memberProposalNoticeDays', e.target.value)} 
                      className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                    />
                    {clause901_part4.split(/\n+/).map((line, idx) => {
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
                    <Input 
                      type="number" 
                      value={formData.block9_01_committeeNoticeToMembersDays === undefined ? '' : formData.block9_01_committeeNoticeToMembersDays} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block9_01_committeeNoticeToMembersDays', e.target.value)} 
                      className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                    />
                    {clause901_part5.split(/\n+/).map((line, idx) => {
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

            {!['9.01'].includes(subSection.id) && (<p>Questions for {subSection.title} will be built here.</p>)}
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
export default Block9ChangingTheConstitution; 