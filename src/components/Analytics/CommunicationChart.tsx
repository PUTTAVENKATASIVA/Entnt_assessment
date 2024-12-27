import React from 'react';
import { useStore } from '../../store/useStore';
import { groupBy } from '../../utils/array';

export function CommunicationChart() {
  const { communications, communicationMethods } = useStore();
  const groupedComms = groupBy(communications, 'methodId');

  const data = communicationMethods.map((method) => ({
    name: method.name,
    count: groupedComms[method.id]?.length || 0,
  }));

  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Communication Methods Usage</h3>
      <div className="space-y-4">
        {data.map(({ name, count }) => (
          <div key={name}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{name}</span>
              <span>{count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${(count / maxCount) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}