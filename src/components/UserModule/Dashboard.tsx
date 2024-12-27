import React from 'react';
import { useStore } from '../../store/useStore';
import { format, isToday, isPast } from 'date-fns';
import { Calendar, Bell } from 'lucide-react';

export function Dashboard() {
  const { companies, communications, communicationMethods } = useStore();

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getNextScheduledCommunication = (companyId: string) => {
    const lastComm = communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!lastComm) return null;

    const company = companies.find((c) => c.id === companyId);
    if (!company) return null;

    const nextDate = new Date(lastComm.date);
    nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);

    return {
      date: nextDate,
      method: communicationMethods[0], // Next in sequence
    };
  };

  const getRowHighlight = (nextComm: { date: Date; method: any } | null) => {
    if (!nextComm) return '';
    if (isPast(nextComm.date) && !isToday(nextComm.date)) return 'bg-red-100';
    if (isToday(nextComm.date)) return 'bg-yellow-100';
    return '';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Communication Dashboard</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span className="text-lg">Today's Overview</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {
                communications.filter(
                  (comm) =>
                    isPast(new Date(comm.date)) && !isToday(new Date(comm.date))
                ).length
              }
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Five Communications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Scheduled
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => {
              const lastFive = getLastFiveCommunications(company.id);
              const nextComm = getNextScheduledCommunication(company.id);
              const highlight = getRowHighlight(nextComm);

              return (
                <tr key={company.id} className={highlight}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {company.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {lastFive.map((comm) => (
                        <div
                          key={comm.id}
                          className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded"
                          title={comm.notes}
                        >
                          {
                            communicationMethods.find(
                              (m) => m.id === comm.methodId
                            )?.name
                          }{' '}
                          ({format(new Date(comm.date), 'MMM d')})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {nextComm && (
                      <div className="text-sm text-gray-900">
                        {nextComm.method.name} (
                        {format(nextComm.date, 'MMM d, yyyy')})
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}