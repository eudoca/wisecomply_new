import React from 'react';
import { 
  Bell, 
  Shield, 
  Calendar, 
  Users, 
  ClipboardList,
  TrendingUp,
  ChevronRight,
  Clock,
  LayoutDashboard
} from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  secondaryValue?: string;
  trend?: string;
  status?: 'success' | 'warning' | 'info' | 'default';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  secondaryValue,
  trend,
  status = 'default' 
}) => {
  const statusColors = {
    success: 'text-green-600 bg-green-50',
    warning: 'text-orange-600 bg-orange-50',
    info: 'text-blue-600 bg-blue-50',
    default: 'text-purple-600 bg-purple-50'
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className={`w-10 h-10 rounded-lg ${statusColors[status]} flex items-center justify-center mb-3`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{value}</h3>
          {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
          {secondaryValue && <p className="text-xs font-medium text-gray-700 mt-1">{secondaryValue}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">{trend}</span>
            </div>
          )}
        </div>
        <div className="text-gray-400">
          <TrendingUp className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

interface TimelineItemProps {
  date: string;
  title: string;
  daysUntil?: number;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, daysUntil, status }) => {
  const statusStyles = {
    completed: 'bg-green-500 border-green-500',
    'in-progress': 'bg-purple-500 border-purple-500',
    upcoming: 'bg-blue-500 border-blue-500'
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`w-4 h-4 rounded-full ${statusStyles[status]} border-2`}></div>
      <div className="text-center mt-3">
        <p className="text-xs text-gray-500">{date}</p>
        <p className="text-sm font-medium text-gray-900 mt-1">{title}</p>
        {daysUntil !== undefined && (
          <p className="text-xs text-gray-600 mt-1">{daysUntil} days</p>
        )}
      </div>
    </div>
  );
};

interface ActivityRowProps {
  icon: React.ReactNode;
  activity: string;
  description: string;
  page: string;
  dueDate: string;
  daysUntilDue: number | string;
  status?: 'overdue' | 'due-soon' | 'complete';
}

const ActivityRow: React.FC<ActivityRowProps> = ({ 
  icon, 
  activity, 
  description, 
  page, 
  dueDate, 
  daysUntilDue,
  status 
}) => {
  const getDaysColor = () => {
    if (status === 'complete') return 'text-green-600';
    if (typeof daysUntilDue === 'number') {
      if (daysUntilDue < 0) return 'text-red-600';
      if (daysUntilDue <= 7) return 'text-orange-600';
      return 'text-blue-600';
    }
    return 'text-gray-600';
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-start gap-3">
          <div className="text-purple-600 mt-0.5">{icon}</div>
          <div>
            <p className="text-sm font-medium text-gray-900">{activity}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-900">{page}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-900">{dueDate}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`text-sm font-medium ${getDaysColor()}`}>
          {status === 'complete' ? 'Complete' : `${daysUntilDue} days`}
        </span>
      </td>
      <td className="px-6 py-4">
        <button className="text-purple-600 hover:text-purple-700 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export const DashboardPage: React.FC = () => {
  // Sample data - would come from API/state in real app
  const activities = [
    {
      icon: <Calendar className="w-5 h-5" />,
      activity: 'Annual General Meeting',
      description: 'Schedule and prepare for the annual general meeting with all society members',
      page: 'Meetings',
      dueDate: 'March 15, 2024',
      daysUntilDue: 28
    },
    {
      icon: <Clock className="w-5 h-5" />,
      activity: 'Financial Statement Review',
      description: 'Complete review of annual financial statements with treasurer',
      page: 'Finance',
      dueDate: 'March 1, 2024',
      daysUntilDue: 14
    },
    {
      icon: <Shield className="w-5 h-5" />,
      activity: 'Officer Details Update',
      description: 'Update registry with new officer appointments',
      page: 'Officers',
      dueDate: 'February 20, 2024',
      daysUntilDue: 'Complete',
      status: 'complete' as const
    },
    {
      icon: <Shield className="w-5 h-5" />,
      activity: 'Constitution Review',
      description: 'Annual review of constitution and bylaws',
      page: 'Documents',
      dueDate: 'February 10, 2024',
      daysUntilDue: 'Complete',
      status: 'complete' as const
    }
  ];

  const timelineItems = [
    { date: 'March 15, 2024', title: 'Annual General Meeting', daysUntil: 28, status: 'upcoming' as const },
    { date: 'March 1, 2024', title: 'Financial Statement Review', daysUntil: 14, status: 'in-progress' as const },
    { date: 'February 20, 2024', title: 'Officer Details Update', status: 'completed' as const },
    { date: 'February 10, 2024', title: 'Constitution Review', status: 'completed' as const }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-semibold text-purple-600">Dashboard</h1>
          </div>
          <p className="text-sm text-gray-600">Overview of your society's activities and compliance status</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="text-sm">4 Notifications</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          icon={<Shield className="w-6 h-6" />}
          title="Overall Compliance"
          value="Compliant"
          subtitle="Overall Compliance"
          secondaryValue="28 of 28 activities complete"
          status="success"
        />
        <MetricCard
          icon={<Calendar className="w-6 h-6" />}
          title="Key Dates"
          value="45"
          subtitle="Days to AGM"
          secondaryValue="120 Days to Re-registration"
          status="default"
        />
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          title="Active Members"
          value="156"
          subtitle="Active Members"
          trend="+12% from last month"
          status="default"
        />
        <MetricCard
          icon={<ClipboardList className="w-6 h-6" />}
          title="Pending Tasks"
          value="23"
          subtitle="Pending Tasks"
          secondaryValue="5 due this week"
          status="default"
        />
      </div>

      {/* Compliance Journey */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Compliance Journey</h2>
        <div className="relative">
          <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200"></div>
          <div className="relative grid grid-cols-4 gap-4">
            {timelineItems.map((item, index) => (
              <TimelineItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* My Activities Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">My Activities</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days until Due
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activities.map((activity, index) => (
                <ActivityRow key={index} {...activity} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 