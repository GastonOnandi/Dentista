import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import PatientCard from "./PatientCard";

const PatientList = ({
  patients = [],
  activePatient,
  onSelectPatient,
  onAddPatient,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 🔥 si está vacío → limpiar resultados
    if (!searchTerm || searchTerm.trim() === "") {
      onSearch(""); // <-- CLAVE
      return;
    }

    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm, onSearch]);

  return (
    <aside className="w-80 bg-white border-r p-4 flex flex-col gap-4">
      <button
        onClick={onAddPatient}
        className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add New Patient
      </button>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Patient Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 pl-10 pr-4 border rounded-lg"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {patients.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-6">
            No patients found
          </p>
        ) : (
          patients.map((patient) => (
            <PatientCard
              key={patient.cedula}
              patient={patient}
              isActive={activePatient?.cedula === patient.cedula}
              onClick={() => onSelectPatient(patient)}
            />
          ))
        )}
      </div>
    </aside>
  );
};

export default PatientList;
