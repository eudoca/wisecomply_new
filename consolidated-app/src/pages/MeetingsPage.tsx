import React, { useState } from 'react';
import { CalendarIcon, ClipboardIcon, CheckCircleIcon, ClockIcon, UserCheckIcon, EditIcon } from 'lucide-react'; // Added icons
import { Button } from '../components/ui/Button'; // Import shared Button
import { cn } from '../utils/cn'; // Import cn utility

// Renamed component
export const MeetingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const tabs = [
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
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Meetings & Decisions Management
          </h1>
          <p className="mt-1 text-gray-600">
            Schedule, organize, and track meetings and the decisions made in them
          </p>
        </div>
        <Button size="sm" onClick={handleScheduleMeeting} leftIcon={<CalendarIcon className="h-4 w-4" />}>
          Schedule Meeting
        </Button>
      </div>

      {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
           <div className="flex justify-between items-start">
             <div>
               <h2 className="text-sm font-medium text-gray-500">
                 Upcoming Meetings
               </h2>
               <p className="mt-2 text-3xl font-semibold text-gray-900">{upcomingCount}</p>
             </div>
             <div className="bg-blue-100 rounded-md p-2">
                 <CalendarIcon className="w-5 h-5 text-blue-600" />
             </div>
           </div>
           {/* Optional: Add next meeting details */} 
         </div>
         <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
                 <div>
                   <h2 className="text-sm font-medium text-gray-500">
                     AGM Status
                   </h2>
                   <p className="mt-2 text-3xl font-semibold text-gray-900">Planning</p> 
                   {/* Replace with dynamic date */} 
                   <p className="text-sm text-gray-500 mt-2">Target: May 15, 2025</p>
                 </div>
                 <div className="bg-purple-100 rounded-md p-2">
                     <UserCheckIcon className="w-5 h-5 text-purple-600" />
                 </div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
           <div className="flex justify-between items-start">
             <div>
               <h2 className="text-sm font-medium text-gray-500">
                 Recent Decisions
               </h2>
               <p className="mt-2 text-3xl font-semibold text-gray-900">{recentDecisionsCount}</p>
               <div className="text-sm text-gray-500 mt-2">
                 <span>{implementedDecisions} Implemented</span>
                 <span className="mx-1">•</span>
                 <span>{inProgressDecisions} In Progress</span>
               </div>
             </div>
              <div className="bg-green-100 rounded-md p-2">
                 <ClipboardIcon className="w-5 h-5 text-green-600" />
             </div>
           </div>
         </div>
       </div>

      {/* Tabs and Content Area */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Updated Tab Navigation */}
         <div className="px-4 py-3 border-b border-gray-200">
           <nav className="flex space-x-2 overflow-x-auto" aria-label="Tabs">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setSelectedTab(tab.id)}
                 className={cn(
                   'px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500',
                   selectedTab === tab.id
                     ? 'bg-brand-light text-brand-primary'
                     : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                 )}
                 aria-current={selectedTab === tab.id ? 'page' : undefined}
               >
                 {tab.label}
               </button>
             ))}
           </nav>
         </div>
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