import React from 'react';
import { Download } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function ExportButton() {
  const { companies, communications, communicationMethods } = useStore();

  const exportData = () => {
    const data = communications.map(comm => {
      const company = companies.find(c => c.id === comm.companyId);
      const method = communicationMethods.find(m => m.id === comm.methodId);
      
      return {
        date: comm.date,
        company: company?.name,
        method: method?.name,
        notes: comm.notes
      };
    });

    const csv = [
      ['Date', 'Company', 'Method', 'Notes'],
      ...data.map(row => [
        row.date,
        row.company,
        row.method,
        row.notes
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `communications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportData}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      <Download className="w-4 h-4 mr-2" />
      Export Report
    </button>
  );
}