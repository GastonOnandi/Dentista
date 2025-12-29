import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const PatientSearchInput = ({ value, onChange, patients, onSelectPatient }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = patients.filter(p => 
        `${p.nombre} ${p.apellido}`.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPatients(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  }, [value, patients]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Patient Name
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search or enter patient name"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      
      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => {
                onSelectPatient(patient);
                setShowDropdown(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              {patient.nombre} {patient.apellido}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientSearchInput;