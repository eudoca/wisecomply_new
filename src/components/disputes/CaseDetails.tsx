import React, { useState } from 'react';
import { ChevronLeftIcon, PaperclipIcon, SendIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { Button } from '../ui/Button';

interface CaseDetailsProps {
  caseId: string;
  onBack: () => void;
}

// Sample Data - replace with actual data fetching based on caseId
const sampleCase = {
  id: '1',
  title: 'Committee Election Process Complaint',
  type: 'complaint',
  priority: 'high',
  status: 'investigation',
  submittedBy: 'Robert Chen',
  submittedAgainst: 'Executive Committee',
  openedDate: '10/03/2025',
  description: 'Formal complaint about the recent committee election process, alleging inadequate notice of nominations and unequal access to voter information.',
  notes: [
    {
      id: '1',
      author: 'Emily Wilkinson',
      content: 'Initial assessment completed. This requires thorough investigation of election records and communications.',
      date: '13/03/2025',
    },
    {
      id: '2',
      author: 'Emily Wilkinson',
      content: 'Gathered all email communications and meeting minutes related to election process.',
      date: '16/03/2025',
    },
  ],
  attachments: [
     { id: 'att1', name: 'complaint_form.pdf', size: '128 KB' },
     { id: 'att2', name: 'election_notice.eml', size: '32 KB' },
  ]
};

const CaseDetails: React.FC<CaseDetailsProps> = ({ caseId, onBack }) => {
   // In a real app, fetch case details based on caseId
   const caseDetails = sampleCase;
   const [newNote, setNewNote] = useState('');

   const handleAddNote = (e: React.FormEvent) => {
     e.preventDefault();
     if (!newNote.trim()) return;
     // TODO: Add logic to save the new note (API call)
     console.log('Adding note:', newNote);
     alert(`Note added (simulated): ${newNote}`);
     setNewNote(''); 
     // Potentially refetch notes or update local state
   };
   
   const handleMarkResolved = () => {
     // TODO: Add logic to update case status (API call)
     console.log('Marking case as resolved:', caseId);
     alert(`Marking case ${caseId} as resolved (simulated).`);
     // Potentially navigate back or update UI
   };
   
   const handleEditCase = () => {
      // TODO: Add logic to open edit modal or navigate to edit page
      console.log('Editing case:', caseId);
      alert(`Editing case ${caseId} (simulated).`);
   };

  return (
    <div className="divide-y divide-gray-200">
      {/* Header and Actions */}
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 text-gray-600 hover:text-gray-900">
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back to cases
        </Button>
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 truncate">
              {caseDetails.title}
            </h2>
            <div className="mt-2 flex items-center space-x-4">
              <StatusBadge status={caseDetails.status} />
              {caseDetails.priority === 'high' && (
                 <span className="text-sm text-red-600 font-medium">
                   High Priority
                 </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={handleEditCase}>
              Edit Case
            </Button>
            {caseDetails.status !== 'resolved' && (
              <Button size="sm" onClick={handleMarkResolved}>
                Mark Resolved
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Case Information Grid */}
      <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Case Information</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
             <div className="sm:col-span-1">
               <dt className="text-sm font-medium text-gray-500">Submitted By</dt>
               <dd className="mt-1 text-sm text-gray-900">{caseDetails.submittedBy}</dd>
             </div>
             <div className="sm:col-span-1">
               <dt className="text-sm font-medium text-gray-500">Submitted Against</dt>
               <dd className="mt-1 text-sm text-gray-900">{caseDetails.submittedAgainst}</dd>
             </div>
              <div className="sm:col-span-1">
               <dt className="text-sm font-medium text-gray-500">Opened Date</dt>
               <dd className="mt-1 text-sm text-gray-900">{caseDetails.openedDate}</dd>
             </div>
             <div className="sm:col-span-3">
               <dt className="text-sm font-medium text-gray-500">Description</dt>
               <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{caseDetails.description}</dd>
             </div>
          </dl>
      </div>

      {/* Attachments */}
      <div className="p-6">
         <h3 className="text-lg font-medium text-gray-900 mb-4">Attachments</h3>
         {caseDetails.attachments.length > 0 ? (
             <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
               {caseDetails.attachments.map((attachment) => (
                 <li key={attachment.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                   <div className="w-0 flex-1 flex items-center">
                     <PaperclipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                     <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                   </div>
                   <div className="ml-4 flex-shrink-0">
                     <span className="text-gray-500 mr-4">{attachment.size}</span>
                     <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                       Download
                     </a>
                   </div>
                 </li>
               ))}
             </ul>
         ) : (
             <p className="text-sm text-gray-500">No attachments for this case.</p>
         )}
      </div>

      {/* Case Notes */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Case Notes</h3>
        <div className="space-y-6">
          {caseDetails.notes.map((note) => (
            <div key={note.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-700 text-xs font-medium">
                    {note.author.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">
                    {note.author}
                  </h4>
                  <span className="text-xs text-gray-500">{note.date}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">{note.content}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Add Note Form */}
         <form onSubmit={handleAddNote} className="mt-6 flex space-x-3">
             <textarea
                 rows={3}
                 value={newNote}
                 onChange={(e) => setNewNote(e.target.value)}
                 className="block w-full shadow-sm sm:text-sm focus:ring-purple-500 focus:border-purple-500 border border-gray-300 rounded-md"
                 placeholder="Add a new note..."
              />
             <Button type="submit" size="sm" className="self-end">
                 <SendIcon className="h-4 w-4 mr-2" />
                 Add Note
             </Button>
         </form>
      </div>
    </div>
  );
};

export default CaseDetails; 