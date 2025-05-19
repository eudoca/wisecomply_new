import React from 'react';
import { ClockIcon, AlertTriangleIcon, RefreshCwIcon, GaugeIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { H4, SmallText } from '../ui/Typography';

const DashboardMetrics: React.FC = () => {
  const metrics = [
    {
      label: 'Overall Compliance',
      value: '85%',
      icon: <GaugeIcon className="w-5 h-5 text-purple-600" />,
      description: 'Current compliance score'
    },
    {
      label: 'Due This Week',
      value: '3',
      icon: <ClockIcon className="w-5 h-5 text-yellow-600" />,
      description: 'Tasks requiring attention'
    },
    {
      label: 'High Priority',
      value: '2',
      icon: <AlertTriangleIcon className="w-5 h-5 text-red-600" />,
      description: 'Critical items pending'
    },
    {
      label: 'Recent Updates',
      value: '5',
      icon: <RefreshCwIcon className="w-5 h-5 text-green-600" />,
      description: 'Changes in last 7 days'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map(metric => (
        <Card key={metric.label} padding="md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {metric.icon}
              <H4 className="ml-2 text-sm font-medium text-gray-500 mb-0">
                {metric.label}
              </H4>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              {metric.value}
            </span>
          </div>
          <SmallText className="mt-1">{metric.description}</SmallText>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics; 