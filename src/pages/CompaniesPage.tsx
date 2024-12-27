import React from 'react';
import { CompanyForm } from '../components/AdminModule/CompanyForm';
import { CompanyList } from '../components/AdminModule/CompanyList';
import { useStore } from '../store/useStore';

export function CompaniesPage() {
  const { addCompany } = useStore();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Company</h1>
        <CompanyForm
          onSubmit={(company) => {
            addCompany({
              ...company,
              id: Math.random().toString(36).substr(2, 9),
            });
          }}
        />
      </div>
      <CompanyList />
    </div>
  );
}