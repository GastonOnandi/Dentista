import React, { useState } from 'react';
import { Search, Plus, ChevronRight, User } from 'lucide-react';
import Button from '../components/ui/Button';
import InfoField from '../components/InfoField';

const PatientDetails = ({ patient }) => {
  const [activeTab, setActiveTab] = useState('contact');
  
  if (!patient) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <p className="text-gray-400 text-xl">Select a patient to view details</p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 bg-white p-8">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{patient.name}</h2>
            <p className="text-gray-500 mt-1">Last Visit: {patient.lastVisit}</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="secondary">Edit</Button>
            <Button>Save</Button>
          </div>
        </div>
        
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-4 font-medium transition-colors relative ${
                activeTab === 'contact' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Contact Info
              {activeTab === 'contact' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`pb-4 font-medium transition-colors ${
                activeTab === 'medical' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Medical History
            </button>
            <button
              onClick={() => setActiveTab('appointment')}
              className={`pb-4 font-medium transition-colors ${
                activeTab === 'appointment' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Appointment History
            </button>
          </div>
        </div>
        
        {activeTab === 'contact' && (
          <div className="grid grid-cols-2 gap-x-12">
            <InfoField label="Address" value={patient.address} />
            <InfoField label="Phone Number" value={patient.phone} />
            <InfoField label="Email Address" value={patient.email} />
            <InfoField label="Emergency Contact" value={patient.emergency} />
          </div>
        )}
        
        {activeTab === 'medical' && (
          <div className="text-gray-500">
            Medical history information would go here...
          </div>
        )}
        
        {activeTab === 'appointment' && (
          <div className="text-gray-500">
            Appointment history would go here...
          </div>
        )}
      </div>
    </div>
  );
};
export default PatientDetails;