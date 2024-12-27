import React from 'react';
import { format } from 'date-fns';
import { Communication } from '../../../types';
import { useStore } from '../../../store/useStore';

interface CalendarDayProps {
  date: Date;
  communications: Communication[];
}

export function CalendarDay({ date, communications }: CalendarDayProps) {
  const { communicationMethods } = useStore();

  return (
    <div className="bg-white p-2 min-h-[100px] border-t">
      <div className="font-medium text-sm text-gray-500">
        {format(date, 'd')}
      </div>
      <div className="mt-1 space-y-1">
        {communications.map((comm) => {
          const method = communicationMethods.find((m) => m.id === comm.methodId);
          return (
            <div
              key={comm.id}
              className="text-xs p-1 rounded bg-blue-100 text-blue-800"
              title={comm.notes}
            >
              {method?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}