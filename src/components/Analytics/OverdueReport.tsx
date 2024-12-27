import React from 'react';
import { useStore } from '../../store/useStore';
import { isPast, isToday } from 'date-fns';

export function OverdueReport() {
  const { companies, communications } = useStore();

  const overdueByCompany = companies.map((company) => {
    const companyComms = communications.filter(
      (comm) => comm.companyId === company.id
    );
    const overdueCount = companyComms.filter(
      (comm) => isPast(new Date(comm.date)) && !isToday(new Date(comm.date))
    ).length;

    return {
      companyName: company.name,
      overdueCount,
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Overdue Communications</h3>
      <div className="space-y-4">
        {overdueByCompany.map(({ companyName, overdueCount }) => (
          <div key={companyName} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{companyName}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                overdueCount > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}
            >
              {overdueCount} overdue
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}