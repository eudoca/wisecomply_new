import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle, PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubSectionData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string;
  actReferenceLink?: string;
  helpText: string;
}

const subSectionsForBlock10: SubSectionData[] = [
  {
    id: '10.01',
    number: '10.01',
    title: 'Liquidation resolution',
    isS26Compulsory: true,
    actReferenceLabel: 'S216',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS101110.html?search=sw_096be8ed81dce6e4_assets_25_se&p=1&sr=10',
    helpText: `Sometimes, a society may reach the end of its life...`,
  },
  {
    id: '10.02',
    number: '10.02',
    title: 'Removal from register',
    isS26Compulsory: false,
    actReferenceLabel: 'S174-183',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS101066.html?search=sw_096be8ed81dce6e4_174_25_se&p=1&sr=1',
    helpText: `Not all societies choose formal liquidation...`,
  },
  {
    id: '10.03',
    number: '10.03',
    title: 'What happens to surplus assets',
    isS26Compulsory: true,
    actReferenceLabel: 'S216',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS101110.html?search=sw_096be8ed81dce6e4_assets_25_se&p=1&sr=10',
    helpText: `When a society winds up, it must decide what happens to any assets left over...`,
  },
];

const clause1001_part1 = `The Society may be liquidated in accordance with the provisions of Part 5 of the ACT.\nThe COMMITTEE shall give written NOTICE to all MEMBERs at least `;
const clause1001_part2 = ` WORKING DAYS before the GENERAL MEETING at which the resolution is to be considered and in accordance with section 228 of the Incorporated Societies Act 2022.\nThe notice must include - \n• the time and place of the meeting, and\n• the nature of the business to be transacted, and\n• the text of the proposed resolution, and\n• any proxy or postal/electronic voting rights (if allowed by this CONSTITUTION), and\n• any other information required by the CONSTITUTION or the ACT.\nAny resolution to put the Society into liquidation must be passed by a `;
const clause1001_part3 = ` majority of all MEMBERs present and voting.`;

const clause1002_part1 = `The Society may be removed from the Register of Incorporated Societies in accordance with the provisions of Part 5 of the ACT.\nThe COMMITTEE shall give written NOTICE to all MEMBERs at least `;
const clause1002_part2 = ` WORKING DAYS before the GENERAL MEETING at which the resolution is to be considered and in accordance with section 228 of the Incorporated Societies Act 2022.\nThe COMMITTEE shall also give written NOTICE to all MEMBERs of the GENERAL MEETING at which any such proposed resolution is to be considered. The NOTICE shall include all information as required by section 228(4) of the ACT.\nAny resolution to remove the Society from the Register of Incorporated Societies must be passed by a `;
const clause1002_part3 = ` majority of all MEMBERs present and voting.`;

const clause1003_part1 = `If the Society is liquidated or removed from the Register of Incorporated Societies, no distribution shall be made to any MEMBER, and if any property remains after the settlement of the Society's debts and liabilities, that property must be -\n• used to further a charitable purpose or purposes as defined in section 5(1) of the Charities Act 2005.\n• given or transferred to another organisation for a charitable purpose or purposes as defined in section 5(1) of the Charities Act 2005.\n• given or transferred to another organisation for a similar charitable purpose or purposes as defined in section 5(1) of the Charities Act 2005.\n• given or transferred to `;
const clause1003_part2 = ` for a charitable purpose or purposes as defined in section 5(1) of the Charities Act 2005.\nHowever, in any resolution under this rule, the Society may approve a different distribution to a different not-for-profit entity from that specified above, so long as the Society complies with this CONSTITUTION and the Act in all other respects.`;

const Block10WindingUpOrRemoval: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => { updateFormData(field, checked === true); };
  const handleTextInputChange = (field: keyof typeof formData, value: string) => { updateFormData(field, value); };
  const handleNumberInputChange = (field: keyof typeof formData, value: string) => { const num = parseInt(value, 10); updateFormData(field, isNaN(num) ? undefined : num); };

  const handleRecipientChange = (index: number, value: string) => {
    const existingRecipients = formData.block10_03_surplusAssetRecipients || [];
    const updatedRecipients = existingRecipients.map((item, i) => i === index ? { ...item, name: value } : item);
    updateFormData('block10_03_surplusAssetRecipients', updatedRecipients);
  };
  const addRecipient = () => {
    const existingRecipients = formData.block10_03_surplusAssetRecipients || [];
    if (existingRecipients.length < 20) {
      updateFormData('block10_03_surplusAssetRecipients', [...existingRecipients, { id: Date.now().toString(), name: '' }]);
    }
  };
  const removeRecipient = (idToRemove: string) => {
    const existingRecipients = formData.block10_03_surplusAssetRecipients || [];
    updateFormData('block10_03_surplusAssetRecipients', existingRecipients.filter(r => r.id !== idToRemove));
  };

  // Add handlers for the new dropdowns
  const handleLiquidationMajorityChange = (value: string) => {
    updateFormData('block10_01_liquidationMajority', value);
  };

  const handleRemovalMajorityChange = (value: string) => {
    updateFormData('block10_02_removalMajority', value);
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock10.map((subSection) => (
        <div key={subSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
          {/* Header & Help Accordion */}
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

            {subSection.id === '10.01' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block10_01_includeLiquidationClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block10_01_includeLiquidationClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Liquidation Resolution</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause1001_part1.split(/\n+/).map((line, idx) => {
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
                    <Input type="number" placeholder="20" value={formData.block10_01_liquidationNoticeDays === undefined ? '' : formData.block10_01_liquidationNoticeDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block10_01_liquidationNoticeDays', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause1001_part2.split(/\n+/).map((line, idx) => {
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
                    <Select
                      value={formData.block10_01_liquidationMajority || ""}
                      onValueChange={handleLiquidationMajorityChange}
                    >
                      <SelectTrigger className="inline-block w-auto min-w-[150px] h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm">
                        <SelectValue placeholder="Select majority type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">simple</SelectItem>
                        <SelectItem value="two-thirds">two-thirds</SelectItem>
                      </SelectContent>
                    </Select>
                    {clause1001_part3.split(/\n+/).map((line, idx) => {
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
            {subSection.id === '10.02' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block10_02_includeRemovalClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block10_02_includeRemovalClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Removal from Register</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause1002_part1.split(/\n+/).map((line, idx) => {
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
                    <Input type="number" placeholder="20" value={formData.block10_02_removalNoticeDays === undefined ? '' : formData.block10_02_removalNoticeDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block10_02_removalNoticeDays', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause1002_part2.split(/\n+/).map((line, idx) => {
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
                    <Select
                      value={formData.block10_02_removalMajority || ""}
                      onValueChange={handleRemovalMajorityChange}
                    >
                      <SelectTrigger className="inline-block w-auto min-w-[150px] h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm">
                        <SelectValue placeholder="Select majority type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">simple</SelectItem>
                        <SelectItem value="two-thirds">two-thirds</SelectItem>
                      </SelectContent>
                    </Select>
                    {clause1002_part3.split(/\n+/).map((line, idx) => {
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
            {subSection.id === '10.03' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block10_03_includeSurplusAssetsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block10_03_includeSurplusAssetsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Surplus Assets Distribution</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause1003_part1.split(/\n+/).map((line, idx) => {
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
                    <div className="my-2 space-y-2">
                      {(formData.block10_03_surplusAssetRecipients || []).map((recipient, index) => (
                        <div key={recipient.id} className="flex items-center space-x-2">
                          <Input 
                            type="text" 
                            placeholder="Enter legal name, class or description..." 
                            value={recipient.name} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRecipientChange(index, e.target.value)} 
                            className="flex-grow p-2 border-gray-300 rounded-md placeholder-gray-400 placeholder:italic text-sm bg-white min-w-[350px]" 
                          />
                          <Button variant="ghost" size="sm" onClick={() => removeRecipient(recipient.id)} className="text-red-600 hover:text-red-700"><Trash2Icon className="w-4 h-4" /></Button>
                        </div>
                      ))}
                      {(formData.block10_03_surplusAssetRecipients || []).length < 20 && (
                        <Button type="button" variant="outline" size="sm" onClick={addRecipient} className="mt-1 text-xs"><PlusCircleIcon className="w-3.5 h-3.5 mr-1.5" />Add Recipient Entity</Button>
                      )}
                    </div>
                    {clause1003_part2.split(/\n+/).map((line, idx) => {
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

            {!['10.01', '10.02', '10.03'].includes(subSection.id) && (<p>Questions for {subSection.title} will be built here.</p>)}
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
export default Block10WindingUpOrRemoval; 