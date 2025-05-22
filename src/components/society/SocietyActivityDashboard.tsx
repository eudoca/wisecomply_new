import React, { useState } from 'react';
import { ActivityGroup } from '../officers/compliance/ActivityGroup';
import { societyActivities } from '@/data/societyActivities';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PlusCircle, MinusCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

interface StatBoxProps {
  value: number;
  label: string;
  className?: string;
}

const StatBox: React.FC<StatBoxProps> = ({ value, label, className }) => {
  return (
    <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-sm", className)}>
      <span className="font-medium">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
};

export const SocietyActivityDashboard: React.FC = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total stats
  const totalStats = societyActivities.reduce(
    (acc, group) => ({
      completed: acc.completed + group.stats.completed,
      pending: acc.pending + group.stats.pending,
      ongoing: acc.ongoing + group.stats.ongoing,
    }),
    { completed: 0, pending: 0, ongoing: 0 }
  );

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue="" className="w-full">
        <AccordionItem value="todos" className="border rounded-lg bg-white shadow-sm">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className="flex flex-1 items-center px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center gap-3">
                {isOpen ? (
                  <MinusCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                ) : (
                  <PlusCircle className="h-5 w-5 text-gray-400 flex-shrink-0 group-hover:text-purple-600" />
                )}
                <h2 className="text-xl font-semibold text-gray-900">
                  To-dos
                </h2>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex gap-2">
                  <StatBox 
                    value={totalStats.completed} 
                    label="Completed"
                    className="bg-green-50 text-green-700"
                  />
                  <StatBox 
                    value={totalStats.pending} 
                    label="Action Required"
                    className="bg-red-50 text-red-700"
                  />
                  <StatBox 
                    value={totalStats.ongoing} 
                    label="Ongoing"
                    className="bg-blue-50 text-blue-700"
                  />
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <Switch
                    id="show-completed"
                    checked={showCompleted}
                    onCheckedChange={setShowCompleted}
                  />
                  <Label htmlFor="show-completed" className="text-sm">Show completed</Label>
                </div>
              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="px-6 pt-4 pb-6">
            <div className="space-y-4">
              {societyActivities.map((group) => (
                <ActivityGroup
                  key={group.id}
                  group={group}
                  showCompleted={showCompleted}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}; 