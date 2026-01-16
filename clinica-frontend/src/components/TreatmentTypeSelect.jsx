import React from 'react';
import { ChevronDown } from 'lucide-react';

const TreatmentTypeSelect = ({ value, onChange, treatments, onAddTreatment }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "__add__") {
      onAddTreatment(); // acción para abrir modal o navegar
      return;
    }

    onChange(selectedValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tipo de tratamiento
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
        >
          <option value="">Seleccione tratamiento</option>

          {treatments.map((treatment) => (
            <option key={treatment.id} value={treatment.id}>
              {treatment.nombre}
            </option>
          ))}

          {/* 🔥 Opción para agregar uno nuevo */}
          <option value="__add__">➕Añadir nuevo tratamiento</option>
        </select>

        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
};

export default TreatmentTypeSelect;
