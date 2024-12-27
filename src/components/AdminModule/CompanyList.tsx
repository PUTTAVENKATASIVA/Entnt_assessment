import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { useStore } from '../../store/useStore';
import { Company } from '../../types';

export function CompanyList() {
  const { companies, deleteCompany } = useStore();
  const [editingCompany, setEditingCompany] = React.useState<Company | null>(null);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Managed Companies</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {companies.map((company: { id: any; name: any; location: any; communicationPeriodicity: any; }) => (
            <li key={company.id}>
              <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{company.location}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Communication every {company.communicationPeriodicity} days
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setEditingCompany(company)}
                    className="p-2 text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteCompany(company.id)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}