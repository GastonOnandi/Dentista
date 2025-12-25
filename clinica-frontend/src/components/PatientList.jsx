import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import PatientCard from './PatientCard';

const PatientList = ({ patients, activePatient, onSelectPatient, onAddPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm)
  );
  
  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-4 flex flex-col gap-4">
      <button 
        onClick={onAddPatient}
        className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add New Patient
      </button>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by Patient Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredPatients.map(patient => (
          <PatientCard
            key={patient.id}
            patient={patient}
            isActive={activePatient?.id === patient.id}
            onClick={() => onSelectPatient(patient)}
          />
        ))}
      </div>
    </aside>
  );
};

export default PatientList;