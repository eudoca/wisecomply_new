import React, { useState } from 'react';
import { CalendarIcon, ClipboardIcon, CheckCircleIcon, ClockIcon, UserCheckIcon, EditIcon, MessageSquare } from 'lucide-react'; // Added icons
import { Button } from '@/components/ui/button'; // Standardized path
import { cn } from '../utils/cn'; // Import cn utility
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { PlusIcon, ListFilterIcon, CheckSquareIcon } from 'lucide-react';
import { Tabs, Tab } from '../components/ui/Tabs';
import { MeetingActivityDashboard } from '../components/meetings/MeetingActivityDashboard';

// Renamed component
export const MeetingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const tabs: Tab[] = [
    { id: 'upcoming', label: 'Upcoming Meetings' },
    { id: 'past', label: 'Past Meetings' },
    { id: 'decisions', label: 'Decisions' },
    { id: 'agm', label: 'AGM Planning' },
  ];

  // Sample data - replace with actual data fetching
  const meetings = [
    {
      id: 'm1',
      title: 'Monthly Committee Meeting',
      date: '2025-04-10',
      time: '18:00',
      location: 'Community Hall',
      type: 'Committee',
      status: 'upcoming',
    },
    {
      id: 'm2',
      title: 'Finance Subcommittee Meeting',
      date: '2025-04-15',
      time: '10:00',
      location: 'Zoom',
      type: 'Subcommittee',
      status: 'upcoming',
    },
     {
      id: 'm3',
      title: 'Special General Meeting',
      date: '2025-04-22',
      time: '19:00',
      location: 'Online',
      type: 'General',
      status: 'upcoming',
    },
    {
      id: 'm4',
      title: 'March Committee Meeting',
      date: '2025-03-10',
      time: '18:00',
      location: 'Community Hall',
      type: 'Committee',
      status: 'past',
      minutesUrl: '#',
      decisions: 3,
    },
  ];

  const decisions = [
     { id: 'd1', meetingId: 'm4', description: 'Approved budget for Q2', status: 'implemented', date: '2025-03-10' },
     { id: 'd2', meetingId: 'm4', description: 'Formed fundraising working group', status: 'in-progress', date: '2025-03-10' },
     { id: 'd3', meetingId: 'm4', description: 'Reviewed H&S policy updates', status: 'implemented', date: '2025-03-10' },
  ];

  // Placeholder handlers
  const handleScheduleMeeting = () => alert('Schedule Meeting functionality not implemented.');
  const handleViewMeeting = (id: string) => alert(`Viewing meeting ${id}`);
  const handleEditMeeting = (id: string) => alert(`Editing meeting ${id}`);
  const handleViewMinutes = (url: string) => alert(`Viewing minutes at ${url}`);

  const filteredMeetings = meetings.filter(m => {
     if (selectedTab === 'upcoming') return m.status === 'upcoming';
     if (selectedTab === 'past') return m.status === 'past';
     return true; // For other tabs, show all initially or implement specific logic
  });
  
  // Simple stats based on sample data
  const upcomingCount = meetings.filter(m => m.status === 'upcoming').length;
  const recentDecisionsCount = decisions.length;
  const implementedDecisions = decisions.filter(d => d.status === 'implemented').length;
  const inProgressDecisions = decisions.filter(d => d.status === 'in-progress').length;

  const getStatusBadge = (status: string) => {
     switch (status) {
       case 'upcoming': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><ClockIcon className="w-3 h-3 mr-1"/> Upcoming</span>;
       case 'past': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><CheckCircleIcon className="w-3 h-3 mr-1"/> Past</span>;
       default: return null;
     }
   };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header and Actions */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-semibold text-purple-600">Meetings and AGM</h1>
        </div>
        <Button size="sm" onClick={handleScheduleMeeting} leftIcon={<CalendarIcon className="h-4 w-4" />}>
          Schedule Meeting
        </Button>
      </div>

      {/* Blue information box */}
      <div className="mt-6 mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 flex">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
             </div>
        <div className="text-sm text-blue-700">
          <p>
            This page helps you manage all aspects of your society's meetings:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Schedule and plan committee, general, and special meetings</li>
            <li>Keep track of meeting attendance, minutes, and decisions</li>
            <li>Plan and prepare for your Annual General Meeting (AGM)</li>
            <li>Monitor implementation of decisions made in meetings</li>
          </ul>
         </div>
       </div>

      {/* Meeting Activity Dashboard */}
      <div className="mb-6">
        <MeetingActivityDashboard />
      </div>

      {/* Tabs and Content Area */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <Tabs
          activeTab={selectedTab}
          onTabChange={setSelectedTab}
          tabs={tabs}
        />
        <div className="p-6">
          {/* Conditional rendering based on tab */}
           {selectedTab === 'upcoming' && (
               <div className="divide-y divide-gray-100">
                 {filteredMeetings.map((meeting) => (
                     <div key={meeting.id} className="py-4 flex justify-between items-center flex-wrap gap-4">
                         <div>
                             <h3 className="text-sm font-medium text-gray-900">{meeting.title}</h3>
                             <p className="text-sm text-gray-500 mt-1">
                                 {new Date(meeting.date).toLocaleDateString('en-NZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {meeting.time}
                             </p>
                             <p className="text-sm text-gray-500">Location: {meeting.location}</p>
                         </div>
                         <div className="flex items-center space-x-2 flex-shrink-0">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                 {meeting.type}
                             </span>
                             {getStatusBadge(meeting.status)}
                             <Button variant="outline" size="sm" onClick={() => handleViewMeeting(meeting.id)}>View</Button>
                             <Button variant="ghost" size="sm" onClick={() => handleEditMeeting(meeting.id)}><EditIcon className="w-4 h-4"/></Button>
                         </div>
                     </div>
                 ))}
              </div>
            )}
            {selectedTab === 'past' && (
               <div className="divide-y divide-gray-100">
                 {filteredMeetings.map((meeting) => (
                     <div key={meeting.id} className="py-4 flex justify-between items-center flex-wrap gap-4">
                         <div>
                             <h3 className="text-sm font-medium text-gray-900">{meeting.title}</h3>
                             <p className="text-sm text-gray-500 mt-1">
                                {new Date(meeting.date).toLocaleDateString('en-NZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {meeting.time}
                             </p>
                             <p className="text-sm text-gray-500">Decisions Recorded: {meeting.decisions || 0}</p>
                         </div>
                         <div className="flex items-center space-x-2 flex-shrink-0">
                             {getStatusBadge(meeting.status)}
                             {meeting.minutesUrl && <Button variant="outline" size="sm" onClick={() => handleViewMinutes(meeting.minutesUrl!)}>View Minutes</Button>}
                             <Button variant="ghost" size="sm" onClick={() => handleViewMeeting(meeting.id)}>Details</Button>
                         </div>
                     </div>
                 ))}
               </div>
            )}
            {selectedTab === 'decisions' && <p className="text-gray-500 text-center py-8">Decision tracking coming soon.</p>}
            {selectedTab === 'agm' && <p className="text-gray-500 text-center py-8">AGM planning tools coming soon.</p>}
        </div>
      </div>
    </div>
  );
};

// export default MeetingsPage; // Optional default export 