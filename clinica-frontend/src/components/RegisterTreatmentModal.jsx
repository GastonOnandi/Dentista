import React, { useState } from 'react';
import { X } from 'lucide-react';

const RegisterTreatmentModal = ({ isOpen, onClose, onSave }) => {
  const [treatmentName, setTreatmentName] = useState('');
  const [standardCost, setStandardCost] = useState('');

  const handleSave = () => {
    if (!treatmentName.trim() || !standardCost) {
      alert('Please fill in all fields');
      return;
    }

    const newTreatment = {
      nombre: treatmentName.trim(),
      costo: parseFloat(standardCost)
    };

    onSave(newTreatment);
    
    // Reset form
    setTreatmentName('');
    setStandardCost('');
  };

  const handleCancel = () => {
    setTreatmentName('');
    setStandardCost('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Register New Treatment
          </h2>
          <p className="text-sm text-cyan-600">
            Rapidly add a new procedure to your service catalog.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Treatment Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Treatment Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={treatmentName}
              onChange={(e) => setTreatmentName(e.target.value)}
              placeholder="e.g., Root Canal Therapy"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              The official name that will appear on invoices.
            </p>
          </div>

          {/* Standard Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Standard Cost <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                step="0.01"
                value={standardCost}
                onChange={(e) => setStandardCost(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                USD
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
          >
            Save Treatment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterTreatmentModal;