import { Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { Company } from '../../types';

interface CompanyFormProps {
  onSubmit: (company: Company) => void;
  initialData?: Company;
}

export function CompanyForm({ onSubmit, initialData }: CompanyFormProps) {
  const [formData, setFormData] = React.useState<Partial<Company>>(
    initialData || {
      name: '',
      location: '',
      linkedinProfile: '',
      emails: [''],
      phoneNumbers: [''],
      comments: '',
      communicationPeriodicity: 14,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Company);
  };

  const addField = (field: 'emails' | 'phoneNumbers') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ''],
    }));
  };

  const removeField = (field: 'emails' | 'phoneNumbers', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          LinkedIn Profile
        </label>
        <input
          type="url"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.linkedinProfile}
          onChange={(e) =>
            setFormData({ ...formData, linkedinProfile: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Emails</label>
        {formData.emails?.map((email, index) => (
          <div key={index} className="flex mt-1 gap-2">
            <input
              type="email"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={email}
              onChange={(e) => {
                const newEmails = [...(formData.emails || [])];
                newEmails[index] = e.target.value;
                setFormData({ ...formData, emails: newEmails });
              }}
            />
            <button
              type="button"
              onClick={() => removeField('emails', index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('emails')}
          className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Email
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Numbers
        </label>
        {formData.phoneNumbers?.map((phone, index) => (
          <div key={index} className="flex mt-1 gap-2">
            <input
              type="tel"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={phone}
              onChange={(e) => {
                const newPhones = [...(formData.phoneNumbers || [])];
                newPhones[index] = e.target.value;
                setFormData({ ...formData, phoneNumbers: newPhones });
              }}
            />
            <button
              type="button"
              onClick={() => removeField('phoneNumbers', index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('phoneNumbers')}
          className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Phone Number
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Communication Periodicity (days)
        </label>
        <input
          type="number"
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.communicationPeriodicity}
          onChange={(e) =>
            setFormData({
              ...formData,
              communicationPeriodicity: parseInt(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Company' : 'Add Company'}
        </button>
      </div>
    </form>
  );
}