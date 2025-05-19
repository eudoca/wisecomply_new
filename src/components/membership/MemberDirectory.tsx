import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import MemberCard from './MemberCard'; // Import from same directory
import { cn } from '../../utils/cn'; // Corrected path

interface Member {
  initials: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  duesPaid: boolean;
  lastActivity: string;
}

const tabs = [
  { id: 'all', label: 'All Members' },
  { id: 'active', label: 'Active' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'pending', label: 'Pending' },
];

// Sample data - replace with actual data fetching later
const members: readonly Member[] = [
  {
    initials: 'JS',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '021-555-7890',
    status: 'active',
    joinDate: '15/08/2022',
    duesPaid: true,
    lastActivity: '10/03/2025',
  },
  {
    initials: 'EW',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    phone: '021-555-1234',
    status: 'active',
    joinDate: '03/01/2023',
    duesPaid: true,
    lastActivity: '15/03/2025',
  },
  {
    initials: 'ML',
    name: 'Michael Lee',
    email: 'm.lee@example.com',
    phone: '021-555-5678',
    status: 'inactive',
    joinDate: '22/06/2022',
    duesPaid: false,
    lastActivity: '01/12/2024',
  },
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '021-555-9012',
    status: 'pending',
    joinDate: '10/03/2025',
    duesPaid: false,
    lastActivity: '10/03/2025',
  },
  {
    initials: 'RB',
    name: 'Robert Brown',
    email: 'r.brown@example.com',
    phone: '021-555-3456',
    status: 'active',
    joinDate: '05/04/2022',
    duesPaid: true,
    lastActivity: '08/03/2025',
  },
  {
    initials: 'AK',
    name: 'Alice Kim',
    email: 'a.kim@example.com',
    phone: '021-555-7891',
    status: 'active',
    joinDate: '12/09/2022',
    duesPaid: false,
    lastActivity: '05/03/2025',
  },
];

const MemberDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter((member) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearch = 
      member.name.toLowerCase().includes(lowerCaseQuery) ||
      member.email.toLowerCase().includes(lowerCaseQuery) ||
      member.phone.includes(searchQuery); // Assuming phone search is exact or part
      
    const matchesTab = activeTab === 'all' || member.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Member Directory ({filteredMembers.length})
        </h2>
        <div className="relative">
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'py-4 px-1 border-b-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-t-md',
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <MemberCard key={member.email} {...member} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No members found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default MemberDirectory; 