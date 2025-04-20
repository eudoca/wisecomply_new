import React, { useState, useEffect } from 'react';
import type { DisputeCase, CaseStatus, ActionLogEntry, Sanction } from '@/types/dispute';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, EditIcon, PaperclipIcon, SendIcon, SaveIcon, AlertTriangleIcon, CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

interface CaseDetailsProps {
  caseId: string;
  onBack: () => void;
  onUpdateCase: (updatedCase: Partial<DisputeCase>) => void;
}

// List of possible statuses based on the type definition
const possibleStatuses: CaseStatus[] = [
  'lodged',
  'initial_review',
  'info_gathering',
  'notification_sent',
  'response_received',
  'mediation_attempted',
  'hearing_scheduled',
  'hearing_held',
  'decision_pending',
  'decision_issued',
  'appeal_period_open',
  'appealed',
  'closed',
  'investigating'
];

// Helper to format date string (could be moved to utils)
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-NZ', { 
        year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'2-digit'
    });
  } catch (e) {
    return dateString; // Return original if formatting fails
  }
};

// Define possible sanction types for iteration
const sanctionTypes: Sanction['type'][] = ['warning', 'suspension', 'termination', 'fine', 'education', 'other'];

const CaseDetails: React.FC<CaseDetailsProps> = ({ caseId, onBack, onUpdateCase }) => {
  const [caseData, setCaseData] = useState<DisputeCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<CaseStatus | ''>('');
  const [newLogEntry, setNewLogEntry] = useState('');
  const [newDecision, setNewDecision] = useState('');
  const [isEditingDecision, setIsEditingDecision] = useState(false);

  // State for sanction inputs
  const [sanctionState, setSanctionState] = useState<{
    [key in Sanction['type']]?: { checked: boolean; details: string };
  }>({});

  // State for appeal inputs
  const [appealLodged, setAppealLodged] = useState<boolean | null>(null);
  const [appealDate, setAppealDate] = useState<Date | undefined>(undefined);
  const [appealedTo, setAppealedTo] = useState('');
  const [appealOutcome, setAppealOutcome] = useState('');
  const [appealDecisionDate, setAppealDecisionDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      // Simulate fetching data - replace with actual API call/data fetching logic
      const storedCasesString = localStorage.getItem('disputeCases');
      if (storedCasesString) {
        const storedCases: DisputeCase[] = JSON.parse(storedCasesString);
        const foundCase = storedCases.find(c => c.id === caseId);
        if (foundCase) {
          setCaseData(foundCase);
          setSelectedStatus(foundCase.status);
          setNewDecision(foundCase.decision || '');
          setIsEditingDecision(!foundCase.decision);
          if (foundCase) {
            // Initialize sanction state from caseData.sanctions
            const initialSanctions: typeof sanctionState = {};
            sanctionTypes.forEach(type => {
              const existing = foundCase.sanctions?.find(s => s.type === type);
              initialSanctions[type] = { 
                checked: !!existing,
                details: existing?.details || '' 
              };
            });
            setSanctionState(initialSanctions);
          }
          // Initialize appeal state
          setAppealLodged(foundCase.appealLodged ?? null); // Use null if undefined/null
          setAppealDate(foundCase.appealDate ? parseISO(foundCase.appealDate) : undefined);
          setAppealedTo(foundCase.appealedTo || '');
          setAppealOutcome(foundCase.appealOutcome || '');
          setAppealDecisionDate(foundCase.appealDecisionDate ? parseISO(foundCase.appealDecisionDate) : undefined);
        } else {
          setError(`Case with ID ${caseId} not found.`);
        }
      } else {
        setError('No dispute cases found in storage.');
      }
    } catch (err) {
      console.error("Error loading case details:", err);
      setError('Failed to load case details.');
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  if (loading) {
    return <div className="p-6 text-center">Loading case details...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  if (!caseData) {
    return <div className="p-6 text-center">Case details not available.</div>;
  }

  const renderDetailItem = (label: string, value: React.ReactNode) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || '-'}</dd>
    </div>
  );

  const renderList = (items: string[]) => (
    items && items.length > 0 ? (
      <ul className="list-disc list-inside">
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    ) : '-'
  );

  const handleEditClick = () => {
    console.log('Edit Case clicked for:', caseId);
    alert('Edit Case functionality not yet implemented.');
    // TODO: Implement opening an edit modal or navigating to an edit page
  };

  const handleStatusUpdate = () => {
    if (!selectedStatus || selectedStatus === caseData?.status) {
      // No change or nothing selected
      return; 
    }
    console.log(`Updating status for ${caseId} to ${selectedStatus}`);
    alert(`Status update to ${selectedStatus} functionality not yet implemented.`);
    // Call the prop function passed from the parent page
    // onUpdateCase({ id: caseId, status: selectedStatus }); 
    // TODO: Implement actual update logic (API call) via onUpdateCase prop
    // Consider adding loading/disabled state to the button
  };

  const handleAddLogEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const description = newLogEntry.trim();
    if (!description || !caseData) return;

    const newEntry: ActionLogEntry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      description: description,
    };

    const updatedLog = [newEntry, ...(caseData.actionLog || [])];
    
    console.log(`Adding log entry for ${caseId}:`, newEntry);
    alert(`Adding log entry (simulated): ${description}`);

    onUpdateCase({ id: caseId, actionLog: updatedLog });

    setNewLogEntry('');
  };

  const handleRecordDecision = (e: React.FormEvent) => {
    e.preventDefault();
    const decisionText = newDecision.trim();
    if (!decisionText || decisionText === (caseData?.decision || '')) {
      // No input or no change
      setIsEditingDecision(false); // Exit editing mode if no change
      return;
    }
    
    console.log(`Recording decision for ${caseId}:`, decisionText);
    alert(`Recording decision (simulated): ${decisionText}`);

    // Call the prop function to update the case data in the parent
    onUpdateCase({ id: caseId, decision: decisionText });
    // Optionally update status to 'decision_issued'? 
    // onUpdateCase({ id: caseId, decision: decisionText, status: 'decision_issued' });
    
    // TODO: Handle potential errors from the update
    setIsEditingDecision(false); // Exit editing mode after save
  };

  const handleSanctionChange = (type: Sanction['type'], field: 'checked' | 'details', value: boolean | string) => {
    setSanctionState(prev => ({
      ...prev,
      [type]: {
        ...(prev[type] || { checked: false, details: '' }), // Ensure object exists
        [field]: value,
      },
    }));
  };

  const handleSaveSanctions = (e: React.FormEvent) => {
    e.preventDefault();
    const newSanctions: Sanction[] = sanctionTypes
      .filter(type => sanctionState[type]?.checked)
      .map(type => ({
        type: type,
        details: sanctionState[type]?.details?.trim() || undefined,
      }));

    // Basic check if sanctions actually changed (more robust check needed for production)
    if (JSON.stringify(newSanctions) === JSON.stringify(caseData?.sanctions || [])) {
       alert("No changes detected in sanctions.");
       return;
    }

    console.log(`Saving sanctions for ${caseId}:`, newSanctions);
    alert(`Saving sanctions (simulated).`);

    onUpdateCase({ id: caseId, sanctions: newSanctions });
    // TODO: Handle potential errors
  };

  const handleSaveAppealDetails = (e: React.FormEvent) => {
      e.preventDefault();
      const updatePayload: Partial<DisputeCase> = {
          id: caseId,
          appealLodged: appealLodged,
          appealDate: appealLodged && appealDate ? format(appealDate, 'yyyy-MM-dd') : null,
          appealedTo: appealLodged && appealedTo.trim() ? appealedTo.trim() : null,
          appealOutcome: appealLodged && appealOutcome.trim() ? appealOutcome.trim() : null,
          appealDecisionDate: appealLodged && appealDecisionDate ? format(appealDecisionDate, 'yyyy-MM-dd') : null,
      };
      
      // Clear dependent fields if appealLodged is false or null
      if (!appealLodged) {
          updatePayload.appealDate = null;
          updatePayload.appealedTo = null;
          updatePayload.appealOutcome = null;
          updatePayload.appealDecisionDate = null;
      }

      // Basic change detection (improve if needed)
      const changed = 
        updatePayload.appealLodged !== (caseData?.appealLodged ?? null) ||
        updatePayload.appealDate !== caseData?.appealDate ||
        updatePayload.appealedTo !== caseData?.appealedTo ||
        updatePayload.appealOutcome !== caseData?.appealOutcome ||
        updatePayload.appealDecisionDate !== caseData?.appealDecisionDate;

      if (!changed) {
          alert("No changes detected in appeal details.");
          return;
      }

      console.log(`Saving appeal details for ${caseId}:`, updatePayload);
      alert(`Saving appeal details (simulated).`);
      onUpdateCase(updatePayload);
      // TODO: Handle potential errors
  };

  // Condition to show sanctions section
  const showSanctions = caseData && 
                        caseData.caseType === 'misconduct_allegation' && 
                        ['decision_issued', 'closed'].includes(caseData.status);

  // Condition to show appeal section
  const showAppealSection = !!caseData?.decision; // Show if a decision exists

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={onBack} leftIcon={<ArrowLeftIcon className="h-4 w-4" />}>
          Back to List
        </Button>
        <Button variant="secondary" size="sm" onClick={handleEditClick} leftIcon={<EditIcon className="h-4 w-4" />}>
          Edit Case
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Case Details - {caseData.id}
            </h3>
            <Badge variant={caseData.status === 'closed' ? 'outline' : 'default'} className="capitalize">
              {caseData.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        <dl className="divide-y divide-gray-200 px-4 py-5 sm:p-0 sm:px-6 sm:py-5">
          {renderDetailItem('Case Type', <span className="capitalize">{caseData.caseType.replace('_', ' ')}</span>)}
          {renderDetailItem('Date Lodged', formatDate(caseData.dateLodged))}
          {renderDetailItem('Complainant(s)', renderList(caseData.complainants))}
          {renderDetailItem('Respondent(s)', renderList(caseData.respondents))}
          {renderDetailItem('Summary of Issue', <p className="whitespace-pre-wrap">{caseData.summary}</p>)}
          {renderDetailItem('Relevant Rule/Clause', caseData.relevantRule)}
        </dl>
      </div>

      <div className="mt-6 p-6 bg-white shadow sm:rounded-lg border border-gray-200">
         <h4 className="text-lg font-medium text-gray-900 mb-4">Update Case Status</h4>
         <div className="flex items-end gap-4">
           <div className="flex-grow">
             <Label htmlFor="caseStatusUpdate" className="mb-1.5 block text-sm font-medium text-gray-700">
               New Status
             </Label>
             <Select value={selectedStatus} onValueChange={(value: string) => setSelectedStatus(value as CaseStatus)}>
               <SelectTrigger id="caseStatusUpdate" className="w-full">
                 <SelectValue placeholder="Select new status..." />
               </SelectTrigger>
               <SelectContent>
                 {possibleStatuses.map(status => (
                   <SelectItem key={status} value={status} className="capitalize">
                     {status.replace('_', ' ')}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>
           <Button 
             onClick={handleStatusUpdate} 
             disabled={!selectedStatus || selectedStatus === caseData?.status}
           >
             Update Status
           </Button>
         </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Action Log</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {caseData.actionLog && caseData.actionLog.length > 0 ? (
            <ul className="space-y-4">
              {caseData.actionLog.slice().reverse().map((entry) => (
                <li key={entry.id} className="border-l-4 border-gray-200 pl-4 py-2">
                  <p className="text-sm text-gray-800">{entry.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(entry.date)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No actions logged yet.</p>
          )}

          <form onSubmit={handleAddLogEntry} className="mt-6 pt-6 border-t border-gray-200">
            <Label htmlFor="newLogEntryText" className="block text-sm font-medium text-gray-700 mb-1.5">
              Add New Log Entry
            </Label>
            <div className="flex items-start gap-3">
              <Textarea
                id="newLogEntryText"
                rows={3}
                value={newLogEntry}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewLogEntry(e.target.value)}
                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                placeholder="Record an action taken, communication sent/received, or decision made..."
              />
              <Button type="submit" size="sm" className="mt-auto" disabled={!newLogEntry.trim()}>
                <SendIcon className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
           <h3 className="text-lg leading-6 font-medium text-gray-900">Uploaded Documents</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
           {caseData.uploadedDocuments && caseData.uploadedDocuments.length > 0 ? (
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
              {caseData.uploadedDocuments.map((doc) => (
                <li key={doc.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperclipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">{doc.fileName}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0 space-x-4">
                     <span className="text-xs text-gray-500">{formatDate(doc.uploadedDate)}</span>
                    {doc.url ? (
                       <a href={doc.url} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                      </a>
                    ) : (
                      <span className="font-medium text-gray-400 cursor-not-allowed">Download</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No documents uploaded yet.</p>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
           <h3 className="text-lg leading-6 font-medium text-gray-900">Decision</h3>
           {!isEditingDecision && caseData?.decision && (
              <Button variant="ghost" size="sm" onClick={() => setIsEditingDecision(true)} leftIcon={<EditIcon className="h-4 w-4"/>}>
                 Edit Decision
              </Button>
           )}
        </div>
        <div className="px-4 py-5 sm:p-6">
          {isEditingDecision ? (
            <form onSubmit={handleRecordDecision}>
              <Label htmlFor="caseDecisionText" className="block text-sm font-medium text-gray-700 mb-1.5">
                {caseData?.decision ? 'Edit Decision' : 'Record Decision'}
              </Label>
              <Textarea
                id="caseDecisionText"
                rows={5}
                value={newDecision}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDecision(e.target.value)}
                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md mb-3"
                placeholder="Enter the final decision for this case..."
              />
              <div className="flex justify-end gap-2">
                {caseData?.decision && ( // Show cancel only if editing existing decision
                   <Button type="button" variant="outline" onClick={() => { setIsEditingDecision(false); setNewDecision(caseData.decision || ''); }}>
                     Cancel
                   </Button>
                )}
                <Button type="submit" disabled={!newDecision.trim() || newDecision.trim() === (caseData?.decision || '')}>
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Decision
                </Button>
              </div>
            </form>
          ) : caseData?.decision ? (
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{caseData.decision}</p>
          ) : (
             <div className="text-center py-4">
               <p className="text-sm text-gray-500 mb-2">No decision has been recorded for this case yet.</p>
               <Button size="sm" onClick={() => setIsEditingDecision(true)}>
                 Record Decision
               </Button>
             </div>
          )}
        </div>
      </div>

      {/* Sanctions Section (Conditional) */} 
      {showSanctions && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Sanctions Applied</h3>
          </div>
          <form onSubmit={handleSaveSanctions} className="px-4 py-5 sm:p-6">
            <div className="space-y-5 mb-6">
              <p className="text-sm text-gray-600">Select the sanctions applied based on the misconduct finding.</p>
              {sanctionTypes.map(type => (
                <div key={type} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <Checkbox
                      id={`sanction-${type}`}
                      checked={sanctionState[type]?.checked || false}
                      onCheckedChange={(checked: boolean | 'indeterminate') => handleSanctionChange(type, 'checked', !!checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm flex-grow">
                    <Label htmlFor={`sanction-${type}`} className="font-medium text-gray-700 capitalize">
                      {type.replace('_', ' ')}
                    </Label>
                    {/* Add detail inputs where relevant */}
                    {type === 'suspension' && sanctionState[type]?.checked && (
                      <Input 
                        type="text" 
                        placeholder="Duration (e.g., 3 months)"
                        value={sanctionState[type]?.details || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSanctionChange(type, 'details', e.target.value)}
                        className="mt-1 text-xs p-1 h-7"
                      />
                    )}
                    {type === 'fine' && sanctionState[type]?.checked && (
                      <Input 
                        type="number" 
                        placeholder="Amount ($)" 
                        value={sanctionState[type]?.details || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSanctionChange(type, 'details', e.target.value)}
                        className="mt-1 text-xs p-1 h-7"
                      />
                    )}
                    {type === 'education' && sanctionState[type]?.checked && (
                      <Input 
                        type="text" 
                        placeholder="Details (e.g., Attend workshop)"
                        value={sanctionState[type]?.details || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSanctionChange(type, 'details', e.target.value)}
                        className="mt-1 text-xs p-1 h-7"
                      />
                    )}
                    {type === 'other' && sanctionState[type]?.checked && (
                      <Textarea 
                        rows={2}
                        placeholder="Describe other sanction"
                        value={sanctionState[type]?.details || ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleSanctionChange(type, 'details', e.target.value)}
                        className="mt-1 text-xs p-1"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
               <p className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded border border-yellow-200 flex items-center gap-2">
                 <AlertTriangleIcon className="h-4 w-4 flex-shrink-0"/>
                 <span>Sanctions must be consistent with your constitution and the severity of misconduct.</span>
               </p>
               <Button type="submit">
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Sanctions
               </Button>
            </div>
          </form>
        </div>
      )}

      {/* Appeal Details Section (Conditional) */} 
      {showAppealSection && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Appeal Details</h3>
              </div>
              <form onSubmit={handleSaveAppealDetails} className="px-4 py-5 sm:p-6 space-y-6">
                  {/* Appeal Lodged Radio */} 
                  <div>
                      <Label className="text-base font-medium text-gray-900">Was the decision appealed?</Label>
                      <RadioGroup 
                          value={appealLodged === null ? 'unknown' : (appealLodged ? 'yes' : 'no')}
                          onValueChange={(value) => {
                              if (value === 'yes') setAppealLodged(true);
                              else if (value === 'no') setAppealLodged(false);
                              else setAppealLodged(null); // Handle potential 'unknown' state if needed
                          }}
                          className="mt-2 flex gap-6"
                      >
                          <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="appeal-yes" />
                              <Label htmlFor="appeal-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="appeal-no" />
                              <Label htmlFor="appeal-no">No</Label>
                          </div>
                      </RadioGroup>
                  </div>

                  {/* Conditional Fields */} 
                  {appealLodged === true && (
                      <div className="space-y-4 pl-4 border-l-2 border-gray-200 ml-2">
                          {/* Appeal Date */} 
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="appealDate">Date Appeal Lodged</Label>
                              <Popover>
                                  <PopoverTrigger asChild>
                                  <Button
                                      id="appealDate"
                                      variant={"outline"}
                                      className={`w-full justify-start text-left font-normal ${!appealDate && "text-muted-foreground"}`}
                                  >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {appealDate ? format(appealDate, "PPP") : <span>Pick a date</span>}
                                  </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                  <Calendar
                                      mode="single"
                                      selected={appealDate}
                                      onSelect={setAppealDate}
                                      initialFocus
                                  />
                                  </PopoverContent>
                              </Popover>
                          </div>
                          
                          {/* Appealed To */} 
                          <div className="grid w-full items-center gap-1.5">
                              <Label htmlFor="appealedTo">Appealed To</Label>
                              <Input
                                  type="text"
                                  id="appealedTo"
                                  value={appealedTo}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppealedTo(e.target.value)}
                                  placeholder="e.g., Internal Panel, Sports Tribunal"
                              />
                          </div>

                          {/* Appeal Outcome */} 
                          <div className="grid w-full items-center gap-1.5">
                              <Label htmlFor="appealOutcome">Appeal Outcome</Label>
                              <Textarea
                                  id="appealOutcome"
                                  rows={4}
                                  value={appealOutcome}
                                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAppealOutcome(e.target.value)}
                                  placeholder="Describe the outcome of the appeal..."
                              />
                          </div>

                          {/* Appeal Decision Date */} 
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="appealDecisionDate">Date Appeal Decision Received</Label>
                               <Popover>
                                  <PopoverTrigger asChild>
                                  <Button
                                      id="appealDecisionDate"
                                      variant={"outline"}
                                      className={`w-full justify-start text-left font-normal ${!appealDecisionDate && "text-muted-foreground"}`}
                                  >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {appealDecisionDate ? format(appealDecisionDate, "PPP") : <span>Pick a date</span>}
                                  </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                  <Calendar
                                      mode="single"
                                      selected={appealDecisionDate}
                                      onSelect={setAppealDecisionDate}
                                      initialFocus
                                  />
                                  </PopoverContent>
                              </Popover>
                          </div>
                      </div>
                  )}

                  {/* Save Button */} 
                  <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                       <Button type="submit">
                           <SaveIcon className="h-4 w-4 mr-2" />
                           Save Appeal Details
                       </Button>
                  </div>
              </form>
          </div>
      )}

      {/* TODO: Add sections for Decisions, Sanctions etc. */}
    </div>
  );
};

export default CaseDetails; 