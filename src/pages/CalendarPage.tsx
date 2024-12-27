import React from 'react';
import { CalendarGrid } from '../components/UserModule/CalendarView/CalendarGrid';
import { CommunicationModal } from '../components/UserModule/CommunicationModal';

export function CalendarPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCompanyIds, setSelectedCompanyIds] = React.useState<string[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendar View</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Log Communication
        </button>
      </div>
      <CalendarGrid />
      <CommunicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCompanyIds={selectedCompanyIds}
      />
    </div>
  );
}