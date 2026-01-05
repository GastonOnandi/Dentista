import { useState, useEffect } from "react";
import { Filter, Eye } from "lucide-react";
import DateRangePeaker from "./DateRangePeaker";
import Paginator from "./Paginator";

const AppointmentHistoryTable = ({ appointments = [] }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const itemsPerPage = 4;

  // 🔁 Sincronizar datos del backend
  useEffect(() => {
    if (Array.isArray(appointments)) {
      setFilteredAppointments(appointments);
      setCurrentPage(1);
    }
  }, [appointments]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  // ✅ Función para formatear fecha (soporta tanto strings como timestamps)
  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Sin fecha";
    }
    
    try {
      let date;
      
      // Si es un timestamp numérico
      if (typeof dateValue === 'number') {
        date = new Date(dateValue);
      } 
      // Si es un string de fecha
      else if (typeof dateValue === 'string') {
        if (dateValue === "1969-12-31" || dateValue === "1970-01-01") {
          return "Sin fecha";
        }
        date = new Date(dateValue + 'T00:00:00');
      } 
      else {
        return "Sin fecha";
      }
      
      // Verificar si la fecha es válida
      if (isNaN(date.getTime()) || date.getFullYear() < 1970) {
        return "Sin fecha";
      }
      
      return date.toLocaleDateString('es-UY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Sin fecha";
    }
  };

  // ✅ Función para formatear rango de horas
  const formatTimeRange = (horaInicio, horaFin) => {
    if (!horaInicio && !horaFin) {
      return "Sin hora";
    }
    if (!horaFin) {
      return horaInicio;
    }
    return `${horaInicio} - ${horaFin}`;
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredAppointments(appointments);
      setCurrentPage(1);
      return;
    }

    const filtered = appointments.filter((a) => {
      const appointmentDate = a.fecha || a.date;
      return appointmentDate >= startDate && appointmentDate <= endDate;
    });

    setFilteredAppointments(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Appointment History
        </h2>

        <div className="flex items-center gap-3">
          <DateRangePeaker
            startDate={startDate}
            endDate={endDate}
            onChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />

          <button
            onClick={handleFilter}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Treatment / Reason
              </th>
              <th className="px-6 py-3 w-16"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {currentAppointments.length > 0 ? (
              currentAppointments.map((a, index) => (
                <tr key={a.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {formatDate(a.fecha || a.date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {a.horaInicio && a.horaFin 
                        ? formatTimeRange(a.horaInicio, a.horaFin)
                        : (a.time || "Sin hora")}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {a.tratamiento || a.treatment || "—"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {a.nombreCliente || a.notes || ""}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredAppointments.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredAppointments.length)} of{" "}
            {filteredAppointments.length}
          </p>

          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default AppointmentHistoryTable;