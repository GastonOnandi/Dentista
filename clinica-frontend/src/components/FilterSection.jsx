import React, { useState } from "react";
import { Search } from "lucide-react";

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    idCliente: "",
    fechaInicio: "",
    fechaFin: "",
    soloPendientes: true,
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const aplicarFiltros = () => {
    onFilterChange(filters);
  };

  const resetFiltros = () => {
    const reset = {
      idCliente: "",
      fechaInicio: "",
      fechaFin: "",
      soloPendientes: true,
    };
    setFilters(reset);
    onFilterChange(reset);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-4 gap-4 mb-4">

        {/* Solo pendientes */}
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={filters.soloPendientes}
              onChange={(e) =>
                handleChange("soloPendientes", e.target.checked)
              }
              className="w-4 h-4"
            />
            Solo pendientes
          </label>
        </div>

        {/* Cliente */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Cliente (ID / cédula)
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="number"
              value={filters.idCliente}
              onChange={(e) => handleChange("idCliente", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              placeholder="Ej: 12345678"
            />
          </div>
        </div>

        {/* Fecha inicio */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Fecha inicio
          </label>
          <input
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => handleChange("fechaInicio", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Fecha fin */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Fecha fin
          </label>
          <input
            type="date"
            value={filters.fechaFin}
            onChange={(e) => handleChange("fechaFin", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={resetFiltros}
          className="px-6 py-2 bg-gray-200 rounded-lg"
        >
          Resetear
        </button>

        <button
          onClick={aplicarFiltros}
          className="px-6 py-2 bg-cyan-500 text-white rounded-lg"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
