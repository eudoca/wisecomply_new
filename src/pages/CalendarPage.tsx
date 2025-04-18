import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, FilterIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getDaysInMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let days = [];
    
    // Get the Monday before the first day
    let start = new Date(firstDay);
    start.setDate(firstDay.getDate() - (firstDay.getDay() + 6) % 7);
    
    // Get the Sunday after the last day
    let end = new Date(lastDay);
    end.setDate(lastDay.getDate() + (7 - lastDay.getDay()));
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentDate);
  
  const events = [
    {
      date: '2025-04-15',
      title: 'Annual Return Deadline',
      type: 'deadline'
    },
    {
      date: '2025-04-10',
      title: 'Committee Meeting',
      type: 'meeting'
    },
    {
      date: '2025-04-25',
      title: 'Privacy Officer Training',
      type: 'training'
    }
  ];
  
  const getEventForDate = (date: Date) => {
    return events.find(event => event.date === date.toISOString().split('T')[0]);
  };
  
  const getEventColor = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-50 text-red-700';
      case 'meeting':
        return 'bg-blue-50 text-blue-700';
      case 'training':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };
  
  const filterOptions = [
    { value: null, label: 'All Events' },
    { value: 'deadline', label: 'Deadlines' },
    { value: 'meeting', label: 'Meetings' },
    { value: 'training', label: 'Training' }
  ];
  
  const getMonthYearString = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  const handlePreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Calendar Management</h1>
        <p className="mt-1 text-gray-600">
          Schedule and track important events, deadlines, and meetings
        </p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<ChevronLeftIcon className="w-4 h-4" />}
              onClick={handlePreviousMonth}
            >
              Previous
            </Button>
            <h2 className="text-lg font-medium">{getMonthYearString(currentDate)}</h2>
            <Button 
              variant="outline" 
              size="sm" 
              rightIcon={<ChevronRightIcon className="w-4 h-4" />}
              onClick={handleNextMonth}
            >
              Next
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <FilterIcon className="w-4 h-4 text-gray-500" />
            <select 
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary p-2"
              value={selectedFilter || ''}
              onChange={(e) => setSelectedFilter(e.target.value || null)}
            >
              {filterOptions.map((option) => (
                <option key={option.value || 'all'} value={option.value || ''}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-sm font-medium text-gray-500 text-center">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {days.map((day, idx) => {
              const event = getEventForDate(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();
              
              // Filter events if a filter is selected
              const showEvent = event && (!selectedFilter || event.type === selectedFilter);
              
              return (
                <div 
                  key={idx} 
                  className={`min-h-[100px] bg-white p-2 ${
                    !isCurrentMonth ? 'text-gray-400' : ''
                  } ${
                    isToday ? 'bg-brand-light' : ''
                  }`}
                >
                  <span className={`text-sm ${isToday ? 'font-semibold' : ''}`}>
                    {day.getDate()}
                  </span>
                  
                  {showEvent && (
                    <div className={`mt-1 p-1 rounded-md text-xs ${getEventColor(event.type)}`}>
                      {event.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Deadlines</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Meetings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Training</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};