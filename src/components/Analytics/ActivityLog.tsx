import React from 'react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';

export function ActivityLog() {
  const { communications, companies, communicationMethods } = useStore();

  const sortedActivities = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {sortedActivities.map((comm) => {
          const company = companies.find((c) => c.id === comm.companyId);
          const method = communicationMethods.find((m) => m.id === comm.methodId);

          return (
            <div key={comm.id} className="flex items-center space-x-4">
              <div className="w-24 flex-shrink-0 text-sm text-gray-500">
                {format(new Date(comm.date), 'MMM d, yyyy')}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {company?.name}
                </div>
                <div className="text-sm text-gray-500">
                  {method?.name} - {comm.notes}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}