import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SubSectionData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string;
  actReferenceLink?: string;
}

const subSectionsForBlock11: SubSectionData[] = [
  {
    id: '11.01',
    number: '11.01',
    title: 'Access to information for members',
    isS26Compulsory: false,
    actReferenceLabel: 'S88',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100968.html?search=sw_096be8ed81dce6e4_%22request+information%22_25_se&p=1&sr=0',
  },
];

const helpTextContent = `Members have a legal right to request information the society holds about its operations, decisions or other relevant matters. The Act protects this right while allowing societies to refuse access in certain situations, such as where the request would breach privacy, involve commercially sensitive material or be considered unreasonable.
You're not required to set out how your society will handle these requests — but including a clause may help members understand the process and that fair and lawful access will be respected. This suggested clause might be amended to describe how to make a written request, when a response can be expected, whether any charges may apply and the grounds for declining a request. These grounds may include legal obligations, privacy concerns or lack of relevance to the society's activities. If a charge is applied, members must be allowed to withdraw the request.
Including a clause like this can support transparency, reduce confusion and ensure both members and the committee understand the boundaries set by the Privacy Act 2020 and other legislation.`;

const uneditableClauseText = `A MEMBER may at any time make a written request to the Society for information held by the Society.\n
The request must specify the information sought in sufficient detail to enable the information to be identified.\n
The Society must, within a reasonable time after receiving a request – \n• provide the information, or \n• agree to provide the information within a specified period, or \n• agree to provide the information within a specified period if the MEMBER pays a reasonable charge to the Society (which must be specified and explained) to meet the cost of providing the information, or \n• refuse to provide the information, specifying the reasons for the refusal.\n
Without limiting the reasons for which the Society may refuse to provide the information, the Society may refuse to provide the information if – \n• withholding the information is necessary to protect the privacy of natural persons, including that of deceased natural persons.\n• the disclosure of the information would, or would be likely to, prejudice the commercial position of the Society or any of its MEMBERs.\n• the disclosure of the information would, or would be likely to, prejudice the financial or commercial position of any other person, whether or not that person supplied the information to the Society.\n• the information is not relevant to the operation or affairs of the society.\n• withholding the information is necessary to maintain legal professional privilege.\n• the disclosure of the information would, or would be likely to, breach an enactment.\n• the burden to the Society in responding to the request is substantially disproportionate to any benefit that the MEMBER (or any other person) will or may receive from the disclosure of the information.\n• the request for the information is frivolous or vexatious.\n• the request seeks information about a dispute or complaint which is or has been the subject of the procedures for resolving such matters under this CONSTITUTION and the ACT.\n
If the Society requires the MEMBER to pay a charge for the information, the MEMBER may withdraw the request, and must be treated as having done so unless, within 10 WORKING DAYS after receiving notification of the charge, the MEMBER informs the Society – \n• that the MEMBER will pay the charge; or \n• that the MEMBER considers the charge to be unreasonable.\n
Nothing in this rule limits Information Privacy Principle 6 of the Privacy Act 2020 relating to access to personal information.`;

const Block11Records: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const currentSubSection = subSectionsForBlock11[0]; // Assuming only one sub-section for now as per data

  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };

  const includeClause = formData.block11_01_includeAccessToInfoClause;

  return (
    <div className="space-y-6">
      <div key={currentSubSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
        {/* Sub-section Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold text-gray-800">
            {currentSubSection.number} {currentSubSection.title}
          </h3>
          <div className="flex items-center space-x-2">
            <span 
              className={cn(
                "flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium border",
                currentSubSection.isS26Compulsory 
                  ? "bg-[#8065F2] text-white border-[#8065F2]" 
                  : "bg-gray-200 text-gray-500 border-gray-300"
              )}
              title={currentSubSection.isS26Compulsory ? "Compulsory under Section 26 ISA 2022" : "Not compulsory under Section 26 ISA 2022"}
            >
              S26
            </span>
            {currentSubSection.actReferenceLabel && currentSubSection.actReferenceLink && (
              <a 
                href={currentSubSection.actReferenceLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                title={`View ${currentSubSection.actReferenceLabel} in the Act`}
              >
                {currentSubSection.actReferenceLabel}
                <ExternalLinkIcon className="w-3 h-3 ml-1 flex-shrink-0" />
              </a>
            )}
          </div>
        </div>

        {/* Content for 11.01a */}
        <div className="pl-1 space-y-3">
          <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
            <AccordionItem value={`help-${currentSubSection.id}`} className="border-b-0">
              <AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md">
                <div className="flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2 text-purple-600" />
                  Helpful information for this question
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                {helpTextContent.split(/\n+/).map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center space-x-2 py-2">
            <Checkbox 
              id="includeAccessToInfoClause-11.01"
              checked={!!formData.block11_01_includeAccessToInfoClause}
              onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block11_01_includeAccessToInfoClause', checked)}
            />
            <Label htmlFor="includeAccessToInfoClause-11.01" className="text-sm font-medium leading-none">
              Select this clause to include in your constitution
            </Label>
          </div>

          <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Member Access to Information</h4>
          <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
            <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
              {uneditableClauseText.split(/\n+/).map((line, idx) => {
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

          <div className="flex justify-end mt-4">
            <button 
              onClick={() => console.log("Update constitution for 11.01. Clause included:", includeClause)}
              className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]"
            >
              Update Constitution
            </button>
          </div>
        </div>
      </div>

      {/* Main Block Save/Complete buttons */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <button onClick={() => onSaveProgress(blockNumber)} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Save Progress</button>
        <button onClick={() => onComplete(blockNumber)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">Mark Block as Complete</button>
      </div>
    </div>
  );
};

export default Block11Records; 