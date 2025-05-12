import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { cn } from '../../utils/cn';
import { Trash2Icon, EditIcon, EyeIcon } from 'lucide-react';

// Define interest types with colors
const interestTypes = [
  { id: 'financial', label: 'Financial', color: 'bg-green-100 text-green-800' },
  { id: 'property', label: 'Property', color: 'bg-blue-100 text-blue-800' },
  { id: 'business', label: 'Business', color: 'bg-purple-100 text-purple-800' },
  { id: 'family', label: 'Family', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'gift', label: 'Gift', color: 'bg-pink-100 text-pink-800' },
  { id: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' },
];

// Define statuses with colors
const statuses = [
  { id: 'disclosed', label: 'Disclosed', color: 'bg-green-100 text-green-800' },
  { id: 'underReview', label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'pending', label: 'Pending', color: 'bg-orange-100 text-orange-800' },
  { id: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

// Sample data for interests
const sampleInterests = [
  {
    id: 1,
    officer: 'Jane Smith',
    position: 'Treasurer',
    nature: 'financial',
    details: '10% ownership in ABC Supplies Ltd, a potential vendor for office equipment',
    value: '$5,000',
    awareDate: '15/03/2025',
    disclosedDate: '16/03/2025',
    status: 'disclosed',
  },
  {
    id: 2,
    officer: 'Michael Johnson',
    position: 'Board Member',
    nature: 'family',
    details: 'Sister is employed as HR Director at XYZ Foundation, a potential grant partner',
    value: 'N/A',
    awareDate: '20/02/2025',
    disclosedDate: '21/02/2025',
    status: 'disclosed',
  },
  {
    id: 3,
    officer: 'Robert Lee',
    position: 'Program Director',
    nature: 'property',
    details: 'Owns building adjacent to proposed community center location',
    value: '$250,000',
    awareDate: '5/04/2025',
    disclosedDate: '10/04/2025',
    status: 'underReview',
  },
];

interface InterestDisclosure {
  id: string;
  officerName: string;
  position: string;
  natureOfInterest: string;
  extentOfInterest: string;
  monetaryValue: string;
  dateOfAwareness: string;
  additionalNotes: string;
  confirmationAccuracy: boolean;
  disclosureDate: string;
}

interface InterestsRegisterProps {
  interests: InterestDisclosure[];
  onDelete: (id: string) => void;
}

const InterestsRegister: React.FC<InterestsRegisterProps> = ({ interests, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [interestType, setInterestType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  // Simple filtering logic
  const filteredInterests = interests.filter(interest => {
    const matchesSearch = searchTerm === '' || 
      interest.officerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interest.extentOfInterest.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = interestType === '' || interest.natureOfInterest === interestType;
    
    // Date filtering logic
    let matchesDateRange = true;
    if (fromDate && toDate) {
      const disclosureDate = new Date(interest.disclosureDate);
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      matchesDateRange = disclosureDate >= fromDateObj && disclosureDate <= toDateObj;
    } else if (fromDate) {
      const disclosureDate = new Date(interest.disclosureDate);
      const fromDateObj = new Date(fromDate);
      matchesDateRange = disclosureDate >= fromDateObj;
    } else if (toDate) {
      const disclosureDate = new Date(interest.disclosureDate);
      const toDateObj = new Date(toDate);
      matchesDateRange = disclosureDate <= toDateObj;
    }
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  const getInterestTypeLabel = (typeId: string) => {
    const type = interestTypes.find(t => t.id === typeId);
    return type ? type.label : typeId;
  };
  
  const getInterestTypeColor = (typeId: string) => {
    const type = interestTypes.find(t => t.id === typeId);
    return type ? type.color : 'bg-gray-100 text-gray-800';
  };
  
  const getStatusColor = (statusId: string) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.color : 'bg-gray-100 text-gray-800';
  };
  
  const getStatusLabel = (statusId: string) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.label : statusId;
  };

  // If there are no interests to display
  if (interests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-10 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Interests Declared Yet</h3>
          <p className="text-sm text-gray-500 mb-6">
            When officers disclose their interests, they will appear here.
          </p>
          <div className="text-xs text-gray-400">
            <p>Use the "Add Interest" button to record a new disclosure.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Interests Register</h2>
            <p className="text-sm text-gray-600">Register of disclosed interests for all officers</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Export PDF</Button>
            <Button variant="outline" size="sm">Export CSV</Button>
          </div>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        
        {/* Search */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        {/* Interest Type */}
        <div className="mb-4">
          <label htmlFor="interestType" className="block text-sm font-medium text-gray-700 mb-1">Interest Type</label>
          <select
            id="interestType"
            value={interestType}
            onChange={(e) => setInterestType(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Types</option>
            {interestTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
        
        {/* Date Filters */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <Input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <Input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Officer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nature</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aware Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disclosed Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInterests.length > 0 ? (
              filteredInterests.map((interest) => (
                <tr key={interest.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interest.officerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interest.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getInterestTypeColor(interest.natureOfInterest))}>
                      {getInterestTypeLabel(interest.natureOfInterest)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{interest.extentOfInterest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interest.monetaryValue ? `$${interest.monetaryValue}` : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(interest.dateOfAwareness)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(interest.disclosureDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onDelete(interest.id)} title="Delete Interest" className="text-red-600 hover:text-red-800">
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No interests found matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination/Results Count */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-gray-500 text-sm">
          Showing {filteredInterests.length} of {interests.length} total records
        </div>
      </div>
    </div>
  );
};

// Helper to convert natureOfInterest code to human-readable label
function getNatureOfInterestLabel(code: string): string {
  const labels: Record<string, string> = {
    'financial': 'Financial Interest',
    'property': 'Property Interest',
    'business': 'Business Relationship',
    'family': 'Family Connection',
    'gift': 'Gift or Benefit',
    'other': 'Other'
  };
  
  return labels[code] || code;
}

// Helper to format dates
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
}

export default InterestsRegister; 