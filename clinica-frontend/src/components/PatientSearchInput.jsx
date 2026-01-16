import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const PatientSearchInput = ({ value, patients, onSelectPatient }) => {
  const [query, setQuery] = useState(value || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setShowDropdown(false);
      return;
    }

    const filtered = patients.filter((p) =>
      p.nombre.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPatients(filtered);
    setShowDropdown(true);
  }, [query, patients]);

  const handleSelect = (patient) => {
    setQuery(patient.nombre);
    setShowDropdown(false);
    onSelectPatient(patient);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Paciente
      </label>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar paciente"
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
        />
      </div>

      {showDropdown && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
          {filteredPatients.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No patients found</div>
          ) : (
            filteredPatients.map((patient) => (
              <button
                key={patient.cedula}
                type="button"
                onClick={() => handleSelect(patient)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                {patient.nombre}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PatientSearchInput;