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

const subSectionsForBlock7: SubSectionData[] = [
  {
    id: '7.01',
    number: '7.01',
    title: 'Financial control and management',
    isS26Compulsory: true,
    actReferenceLabel: 'S99-109',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS101001.html?search=sw_096be8ed81dce6e4_%22Accounting+records%2c+financial+reporting%2c+and+annual+returns%22_25_se&p=1&sr=1',
    helpText: `Whether your society qualifies as a small society and whether it is a registered charity affect your financial reporting obligations, whether you need an audit and which accounting standards apply.\nConfirm below the rules for how your society's funds and property will be controlled, invested and used. This usually sits with the committee, who must operate within the boundaries of the constitution and the law. You also need to make it clear that all financial resources will be used solely to advance the society's purposes — not for private benefit.\nBy setting this out clearly in your constitution, you're building financial safeguards into your structure. It shows your members and funders that money will be handled responsibly.`
  },
];

const clause701_part1 = `The funds and property of the Society shall be -\n• controlled, invested and disposed of by the COMMITTEE, subject to this CONSTITUTION, and\n• devoted solely to the promotion of the purposes of the Society.\nThe COMMITTEE shall maintain bank accounts in the name of the Society.\nAll money received on account of the Society shall be banked within `;
const clause701_part2 = ` WORKING DAYS of receipt.\nAll accounts paid or for payment shall be submitted to the COMMITTEE for approval of payment.\nThe COMMITTEE must ensure that there are kept at all times accounting records that:\n• correctly record the transactions of the Society, and\n• allow the Society to produce financial statements that comply with the requirements of the ACT, and\n• would enable the financial statements to be readily and properly audited (if required under any legislation or the Society's CONSTITUTION).\nThe COMMITTEE must establish and maintain a satisfactory system of control of the Society's accounting records.\nThe accounting records must be kept in written form or in a form or manner that is easily accessible and convertible into written form.\nThe accounting records must be kept for the current accounting period and for the last 7 completed accounting periods of the Society.`;

const Block7Finances: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };
  const handleNumberInputChange = (field: keyof typeof formData, value: string) => {
    const num = parseInt(value, 10);
    updateFormData(field, isNaN(num) ? undefined : num);
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock7.map((subSection) => (
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
              <AccordionItem value={`help-${subSection.id}`} className="border-b-0">
                <AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                  {subSection.helpText.split(/\n+/).map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {subSection.id === '7.01' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block7_01_includeFinancialControlClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block7_01_includeFinancialControlClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Financial Control and Management</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause701_part1.split(/\n+/).map((line, idx) => {
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
                    <Input type="number" className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause701_part2.split(/\n+/).map((line, idx) => {
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

            {!['7.01'].includes(subSection.id) && (<p>Questions for {subSection.title} will be built here.</p>)}
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
export default Block7Finances; 