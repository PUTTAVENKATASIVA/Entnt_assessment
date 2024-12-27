import React from 'react';
import { Dialog } from '@headlessui/react';
import { useStore } from '../../store/useStore';
import { Communication } from '../../types';

interface CommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCompanyIds: string[];
}

export function CommunicationModal({
  isOpen,
  onClose,
  selectedCompanyIds,
}: CommunicationModalProps) {
  const { communicationMethods, addCommunication } = useStore();
  const [formData, setFormData] = React.useState({
    methodId: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    selectedCompanyIds.forEach((companyId) => {
      const communication: Communication = {
        id: Math.random().toString(36).substr(2, 9),
        companyId,
        ...formData,
      };
      addCommunication(communication);
    });
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <Dialog.Title className="text-lg font-medium mb-4">
            Log Communication
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Communication Type
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.methodId}
                onChange={(e) =>
                  setFormData({ ...formData, methodId: e.target.value })
                }
              >
                <option value="">Select a method</option>
                {communicationMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Log Communication
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}