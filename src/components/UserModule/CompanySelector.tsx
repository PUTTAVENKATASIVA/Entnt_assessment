import React from 'react';
import { Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface CompanySelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function CompanySelector({ selectedIds, onChange }: CompanySelectorProps) {
  const { companies } = useStore();

  const toggleCompany = (id: string) => {
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    onChange(newSelection);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium mb-4">Select Companies</h3>
      <div className="space-y-2">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
            onClick={() => toggleCompany(company.id)}
          >
            <div className={`w-5 h-5 border rounded-md mr-3 flex items-center justify-center
              ${selectedIds.includes(company.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
            >
              {selectedIds.includes(company.id) && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="text-sm">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}