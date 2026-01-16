import React, { useState, useEffect } from "react";
import { Search, Plus, Edit } from "lucide-react";
import PatientCard from "./PatientCard";

const PatientList = ({
  patients = [],
  activePatient,
  onSelectPatient,
  onAddPatient,
  onEditPatient,
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
    <aside className="w-80 bg-white border-r flex flex-col">
      <div className="p-4 flex flex-col gap-4">
        <button
          onClick={onAddPatient}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-cyan-600 transition-colors"
        >
          <Plus size={20} />
          Agregar paciente
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o cédula"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {patients.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-6">
            No se encontró el paciente
          </p>
        ) : (
          <div className="space-y-2">
            {patients.map((patient) => (
              <PatientCard
                key={patient.cedula}
                patient={patient}
                isActive={activePatient?.cedula === patient.cedula}
                onClick={() => onSelectPatient(patient)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Botón Editar Paciente - Solo se muestra si hay un paciente activo */}
      {activePatient && (
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={onEditPatient}
            className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Edit size={20} />
            Editar paciente
          </button>
        </div>
      )}
    </aside>
  );
};

export default PatientList;