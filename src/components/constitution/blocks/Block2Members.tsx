import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle, PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // For 2.02 editable parts
import { Textarea } from "@/components/ui/textarea"; // For 2.05
import { Button } from '@/components/ui/button';

// Re-using the SubSectionData interface structure from Block1 for consistency
interface SubSectionData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string; // Optional as some rows might not have it
  actReferenceLink?: string;  // Optional
  helpText: string; // Added helpText to interface
}

// Define an interface for the additional member info items
interface AdditionalMemberInfoItem {
  id: string;
  value: string;
}

// Extend the formData type to include our new fields
interface ExtendedFormData {
  block2_05_additionalMemberInfo?: AdditionalMemberInfoItem[];
  [key: string]: any;
}

const subSectionsForBlock2: SubSectionData[] = [
  {
    id: '2.01',
    number: '2.01',
    title: 'Minimum number of members',
    isS26Compulsory: false,
    actReferenceLabel: 'S74',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100953.html?search=sw_096be8ed81dce6e4_74_25_se&p=1&sr=2',
    helpText: `To remain validly incorporated, your Society must always have at least 10 members who are either individuals or body corporates. This is a legal requirement under the ACT.\nAll members must have consented to join and must be properly recorded in the REGISTER OF MEMBERS. If membership drops below 10, your Society is at risk of being removed from the register.\nIt's the COMMITTEE's responsibility to monitor membership numbers and take action if they fall below the minimum - for example, by recruiting new members or holding a special meeting.`
  },
  {
    id: '2.02',
    number: '2.02',
    title: 'Types of member',
    isS26Compulsory: false,
    helpText: `Please note: There is no direct reference in the Act that requires or regulates types of member. This is a constitution-level governance choice.\nYour society can define different types of membership, such as standard, life, or honorary members. These classifications help reflect the different roles, contributions, or entitlements within your society.\nIt's important to clearly state what rights and responsibilities come with each class - especially around voting and participation. That way, members understand their role and no one is unintentionally excluded from decision-making or counted toward legal minimums when they shouldn't be.\nThere is no specific requirement in the Incorporated Societies Act 2022 to create different membership classes. However, if you do, the rules must be fair, clear, and consistent with the overall obligations and structure of the ACT.`
  },
  {
    id: '2.03',
    number: '2.03',
    title: 'How a person becomes a member',
    isS26Compulsory: true,
    actReferenceLabel: 'S76',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100956.html?search=sw_096be8ed81dce6e4_76_25_se&p=1&sr=2',
    helpText: `Every person who becomes a member must give signed, written consent. This ensures the Society has a clear record that all members joined voluntarily - a specific legal requirement that helps prevent disputes or claims of automatic or invalid membership.\nThe Society can set its own process for membership applications. Applicants may be asked to complete a form, provide relevant details, or attend an interview. The COMMITTEE may accept or decline applications, but must do so reasonably and fairly.\nThis process protects the Society's integrity, ensures members meet any conditions in the CONSTITUTION, and helps keep membership records and rights aligned with legal obligations.`
  },
  {
    id: '2.04',
    number: '2.04',
    title: "Members' obligations and rights",
    isS26Compulsory: false,
    actReferenceLabel: 'S76',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100956.html?search=sw_096be8ed81dce6e4_76_25_se&p=1&sr=2',
    helpText: 'Your society can define specific rights and obligations for its members...`'
  },
  {
    id: '2.05',
    number: '2.05',
    title: 'Register of members',
    isS26Compulsory: true,
    actReferenceLabel: 'S79',
    // The image shows S79 for label but link for S76, using S79 for link as it seems more specific to register
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100958.html?search=sw_096be8ed81dce6e4_79_25_se&p=1&sr=2', // Adjusted link to S79 assuming S79 is correct for register
    helpText: 'Every society is required to maintain an up-to-date register of its members...'
  },
  {
    id: '2.06',
    number: '2.06',
    title: 'Subscriptions and fees',
    isS26Compulsory: false,
    helpText: 'Please note: There is no direct reference in the Act that requires or regulates subscriptions...'
  },
  {
    id: '2.07',
    number: '2.07',
    title: 'Ceasing to be a member',
    isS26Compulsory: true,
    helpText: `Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates how a person ceases to be a member. This is a constitution-level governance choice.\nMEMBERs may cease their membership through various means, including resignation, expulsion following a dispute resolution process, or other conditions specified in the constitution. It\'s essential that these processes are clearly outlined to ensure transparency and fairness.\nThe Incorporated Societies Act 2022 mandates that a society\'s constitution must include procedures for resolving disputes and for terminating membership. This ensures that members are aware of the grounds and processes for cessation of membership, promoting good governance and accountability within the society.\nAdditionally, the constitution may specify other circumstances under which membership ceases, such as non-payment of fees or bringing the society into disrepute. It\'s important that any such provisions comply with the principles of natural justice and the requirements of the ACT.`
  },
  {
    id: '2.08',
    number: '2.08',
    title: 'Reinstatement of membership',
    isS26Compulsory: false,
    helpText: `Please note: There is no direct reference in the Act that requires or regulates how former members may be re-admitted. This is a constitution-level governance choice.\nFormer members must follow the same application process as new applicants. This helps ensure the process is fair, consistent, and doesn't allow for automatic or preferential re-entry into the Society.\nIf a member was previously removed due to a disciplinary issue or dispute resolution outcome, they can only be re-admitted by a vote at a GENERAL MEETING - and only if the COMMITTEE supports the application. This protects the integrity of the Society and ensures trust in its governance processes.\nRe-admission rules are not mandated by the ACT, but they support good governance and help prevent conflicts. Clear rules ensure decisions are made consistently and reduce the risk of allegations of bias or favouritism.`
  },
];

const clause201 = `The Society shall maintain the minimum number of MEMBERs required by the Incorporated Societies Act 2022.`;
const clause202_part1 = `The classes of membership and the method by which MEMBERs are admitted to different classes of membership are as follows:\nMEMBER\nA MEMBER is an individual or body corporate admitted to membership under this CONSTITUTION and who or which has not ceased to be a MEMBER.\nLife MEMBER\nA Life MEMBER is a person honoured for highly valued services to the Society elected as a Life MEMBER by resolution of a GENERAL MEETING passed by a `;
const clause202_part2 = ` majority of those MEMBERs present and voting. A Life MEMBER shall have all the rights and privileges of a MEMBER and shall be subject to all the same duties as a MEMBER except those of paying subscriptions and levies.\nHonorary MEMBER\nAn Honorary MEMBER is a person honoured for services to the Society or in an associated field elected as an Honorary MEMBER by resolution of a GENERAL MEETING passed by a `;
const clause202_part3 = ` majority of those present and voting. An Honorary MEMBER has no membership rights, privileges or duties.`;
const clause203 = `The signed written consent of every MEMBER to become a MEMBER must be obtained and kept by the Society.\nAn applicant for membership must complete and sign any application form, supply any information, or attend an interview as may be reasonably required by the COMMITTEE regarding an application for membership and will become a MEMBER on acceptance of that application by the COMMITTEE.`;

const clause204 = `The Society has chosen to define certain rights and obligations of MEMBERs to promote good governance and clear expectations. These rights and obligations may include (without limitation):\nRights:\n• The right to attend and vote at GENERAL MEETINGs, subject to any conditions set out in this CONSTITUTION;\n• The right to receive notices and communications from the Society;\n• The right to participate in the Society's activities and events;\n• The right to stand for election to the COMMITTEE (if eligible under the CONSTITUTION);\n• The right to access certain Society documents and records (subject to confidentiality requirements).\nObligations:\n• To provide and maintain current contact details (including a physical or email address and a telephone number) with the Society;\n• To promptly advise the Society of any changes to their contact details;\n• To promote the interests and purposes of the Society and avoid bringing the Society into disrepute;\n• To comply with this CONSTITUTION and any rules, policies, or procedures set by the COMMITTEE;\n• To pay all subscriptions, levies, or fees by the due date to maintain full membership rights;\n• To behave respectfully and lawfully at Society activities and in dealings with other MEMBERs;\n• To avoid any conduct that may harm the reputation or operations of the Society;\n• If a MEMBER is a body corporate, to provide the Society with the name and contact details of its authorised representative for voting purposes.`;

const clause205_part1 = `The Society shall maintain a register of MEMBERs, as required by section 79 of the Incorporated Societies Act 2022.\nThe register shall include, at a minimum, the following details for each MEMBER:\n• Name of the MEMBER;\n• Contact details (including physical address, email address, and telephone number);\n• Date the MEMBER was admitted to the Society;\n• Date the MEMBER ceased to be a MEMBER (if applicable).`;
const clause205_part2 = `The Society shall ensure that the register is kept up to date and accurate at all times.\nMEMBERs may inspect the register at any reasonable time, subject to any confidentiality or privacy provisions set out in this CONSTITUTION.\nFor each MEMBER who ceased to be a MEMBER within the previous 7 years, the Society will record in the REGISTER OF MEMBERS that MEMBER's name, and the date the former MEMBER ceased to be a MEMBER.`;

const clause206_part1 = `The annual subscription and any other fees for membership for the then current financial year shall be set by resolution of a GENERAL MEETING (which can also decide that payment be made by periodic instalments).\nAny MEMBER failing to pay the annual subscription (including any periodic payment), any levy, or any capitation fees, within`;
const clause206_part2 = `WORKING DAYS of the date the same was due for payment shall be considered as unfinancial and shall (without being released from the obligation of payment) have no membership rights and shall not be entitled to participate in any Society activity or to access or use the Society's premises, facilities, equipment and other property until all the arrears are paid.\nThe COMMITTEE may terminate the MEMBER's membership (without being required to give prior notice to that MEMBER).\nIf such arrears are not then paid within`;
const clause206_part3 = `WORKING DAYS of the due date for payment of the subscription, any other fees, or levy the COMMITTEE may terminate the MEMBER's membership (without being required to give prior notice to that MEMBER).`;

const clause207_part1 = `A MEMBER ceases to be a MEMBER:\n• by resignation from that MEMBER's class of membership by written notice signed by that MEMBER to the COMMITTEE, or\n• on termination of a MEMBER's membership following a dispute resolution process under this CONSTITUTION, or\n• on death (or if a body corporate on liquidation or deregistration, or if a partnership on dissolution of the partnership), or\n• by resolution of the COMMITTEE where they have failed to pay a subscription, levy or other amount due to the Society within`;
const clause207_part2 = `WORKING DAYS of the due date for payment.\n• by resolution of the COMMITTEE where in the opinion of the COMMITTEE the MEMBER has brought the Society into disrepute.\n• otherwise in accordance with the CONSTITUTION and by resolution of the COMMITTEE.\nA member ceases to be a member with effect from (as applicable):\n• the date of receipt of the MEMBER's notice of resignation by the COMMITTEE (or any subsequent date stated in the notice of resignation), or\n• the date of termination of the MEMBER's membership under this CONSTITUTION, or\n• the date of death of the MEMBER (or if a body corporate from the date of its liquidation or deregistration, or if a partnership from the date of its dissolution), or\n• the date specified in a resolution of the COMMITTEE and when a MEMBER's membership has been terminated the COMMITTEE shall promptly notify the former MEMBER in writing.\nA MEMBER who has ceased to be a MEMBER under this CONSTITUTION:\n• remains liable to pay all subscriptions and other fees to the Society's next balance date,\n• shall cease to hold himself or herself out as a MEMBER of the Society, and\n• shall return to the Society all material provided to MEMBERs by the Society (including any membership certificate, badges, handbooks and manuals).\n• shall cease to be entitled to any of the rights of a Society MEMBER.`;

const clause208 = `Any former MEMBER may apply for re-admission in the manner prescribed for new applicants, and may be re-admitted only by resolution of the COMMITTEE.\nBut, if a former MEMBER's membership was terminated following a disciplinary or dispute resolution process, the applicant may be re-admitted only by a resolution passed at a GENERAL MEETING on the recommendation of the COMMITTEE.`;

const Block2Members: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  // Cast formData to our extended type
  const typedFormData = formData as ExtendedFormData;
  const typedUpdateFormData = updateFormData as (field: keyof ExtendedFormData, value: any) => void;

  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };
  const handleNumberInputChange = (field: keyof typeof formData, value: string) => {
    const num = parseInt(value, 10);
    updateFormData(field, isNaN(num) ? undefined : num);
  };

  const handleAdditionalMemberInfoChange = (index: number, value: string) => {
    const existingItems = typedFormData.block2_05_additionalMemberInfo || [];
    const updatedItems = existingItems.map((item: AdditionalMemberInfoItem, i: number) => 
      i === index ? { ...item, value } : item
    );
    typedUpdateFormData('block2_05_additionalMemberInfo', updatedItems);
  };

  const addAdditionalMemberInfo = () => {
    const existingItems = typedFormData.block2_05_additionalMemberInfo || [];
    if (existingItems.length < 20) {
      const newItems = [...existingItems, { id: Date.now().toString(), value: '' }];
      typedUpdateFormData('block2_05_additionalMemberInfo', newItems);
    }
  };

  const removeAdditionalMemberInfo = (idToRemove: string) => {
    const existingItems = typedFormData.block2_05_additionalMemberInfo || [];
    const filteredItems = existingItems.filter((item: AdditionalMemberInfoItem) => item.id !== idToRemove);
    typedUpdateFormData('block2_05_additionalMemberInfo', filteredItems);
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock2.map((subSection) => (
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

            {/* Non-editable clause text pattern for 2.01 */}
            {subSection.id === '2.01' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block2_01_includeMinMembersClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block2_01_includeMinMembersClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for minimum number of members</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Minimum Members Requirements</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause201.split(/\n+/).map((line, idx) => {
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

            {/* Non-editable clause text pattern for 2.02 */}
            {subSection.id === '2.02' && (
              <>
                <p className="text-sm text-gray-700">Modify and select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block2_02_includeMembershipTypesClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block2_02_includeMembershipTypesClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for types of membership</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Membership Types</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause202_part1.split(/\n+/).map((line, idx) => {
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
                    <Input type="text" placeholder="e.g., simple, two thirds" value={formData.block2_02_lifeMemberMajority || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block2_02_lifeMemberMajority', e.target.value)} className="inline-block w-auto h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause202_part2.split(/\n+/).map((line, idx) => {
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
                    <Input type="text" placeholder="e.g., simple, two thirds" value={formData.block2_02_honoraryMemberMajority || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block2_02_honoraryMemberMajority', e.target.value)} className="inline-block w-auto h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause202_part3.split(/\n+/).map((line, idx) => {
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

            {/* Non-editable clause text pattern for 2.03 */}
            {subSection.id === '2.03' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block2_03_includeBecomingMemberClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block2_03_includeBecomingMemberClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for how a person becomes a member</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Membership Application Process</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause203.split(/\n+/).map((line, idx) => {
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

            {/* Non-editable clause text pattern for 2.04 */}
            {subSection.id === '2.04' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block2_04_includeObligationsRightsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block2_04_includeObligationsRightsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for member obligations and rights</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Member Obligations and Rights</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause204.split(/\n+/).map((line, idx) => {
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

            {/* Non-editable clause text pattern for 2.05 */}
            {subSection.id === '2.05' && (
              <>
                <p className="text-sm text-gray-700">Add any additional member details you want to record in the member register</p>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Membership Register Requirements</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause205_part1.split(/\n+/).map((line, idx) => {
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
                    
                    {(typedFormData.block2_05_additionalMemberInfo || []).map((item: AdditionalMemberInfoItem, index: number) => (
                      <div key={item.id} className="flex items-center space-x-2 mt-1 pl-4">
                        <span className="mr-1 text-violet-400">&bull;</span>
                        <Input
                          type="text"
                          placeholder="Additional member information to collect..."
                          value={item.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdditionalMemberInfoChange(index, e.target.value)}
                          className="flex-grow h-7 px-2 text-xs align-baseline bg-white border-gray-300 rounded-sm"
                        />
                        <Button variant="ghost" size="sm" onClick={() => removeAdditionalMemberInfo(item.id)} className="text-red-600 hover:text-red-700 h-6 p-1">
                          <Trash2Icon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <div className="mt-2 pl-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addAdditionalMemberInfo} 
                        className="flex items-center text-xs h-7 px-2"
                      >
                        <PlusCircleIcon className="w-3.5 h-3.5 mr-1.5" />
                        Add additional detail
                      </Button>
                    </div>
                    
                    {clause205_part2.split(/\n+/).map((line, idx) => {
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

            {/* Non-editable clause text pattern for 2.06 */}
            {subSection.id === '2.06' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block2_06_includeSubscriptionsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block2_06_includeSubscriptionsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for subscriptions and fees</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Subscription and Fee Requirements</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause206_part1.split(/\n+/).map((line, idx) => {
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
                    <Input type="number" value={formData.block2_06_unfinancialGracePeriodDays === undefined ? '' : formData.block2_06_unfinancialGracePeriodDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block2_06_unfinancialGracePeriodDays', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause206_part2.split(/\n+/).map((line, idx) => {
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
                    <Input type="number" value={formData.block2_06_terminationGracePeriodDays === undefined ? '' : formData.block2_06_terminationGracePeriodDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block2_06_terminationGracePeriodDays', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause206_part3.split(/\n+/).map((line, idx) => {
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

            {/* Non-editable clause text pattern for 2.07 */}
            {subSection.id === '2.07' && (
              <>
                <p className="text-sm text-gray-700">Modify and select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block2_07_includeCessationClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block2_07_includeCessationClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for cessation of membership</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Cessation of Membership</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause207_part1.split(/\n+/).map((line, idx) => {
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
                    <Input type="number" value={formData.block2_07_cessationGracePeriodDays === undefined ? '' : formData.block2_07_cessationGracePeriodDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block2_07_cessationGracePeriodDays', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause207_part2.split(/\n+/).map((line, idx) => {
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

            {/* Non-editable clause text pattern for 2.08 */}
            {subSection.id === '2.08' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block2_08_includeReinstatementClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block2_08_includeReinstatementClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for reinstatement of membership</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Reinstatement of Membership</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause208.split(/\n+/).map((line, idx) => {
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

            {!['2.01', '2.02', '2.03', '2.04', '2.05', '2.06', '2.07', '2.08'].includes(subSection.id) && (
              <p>Questions for {subSection.title} will be built here.</p>
            )}

            <div className="flex justify-end mt-4">
              <button onClick={() => console.log(`Update constitution for ${subSection.number}. Data:`, formData)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
            </div>
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
export default Block2Members; 