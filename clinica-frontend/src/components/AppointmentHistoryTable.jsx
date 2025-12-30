import { useState } from "react";
import { Filter, Eye } from "lucide-react";
import DateRangePeaker from "./DateRangePeaker";
import Paginator from "./Paginator";

const AppointmentHistoryTable = ({ appointments = [] }) => { // ✅ Default value
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // ✅ IMPORTANTE: Validar que appointments sea un array
  const validAppointments = Array.isArray(appointments) ? appointments : [];
  const [filteredAppointments, setFilteredAppointments] = useState(validAppointments);
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  // Calcular los items de la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredAppointments(validAppointments);
      return;
    }

    const filtered = validAppointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= startDate && appointmentDate <= endDate;
    });

    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset a la primera página después de filtrar
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // ✅ Actualizar filteredAppointments cuando cambian las appointments
  useState(() => {
    setFilteredAppointments(validAppointments);
  }, [appointments]);

  return (
    <div className="bg-white">
      {/* Header con título y filtros */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Appointment History</h2>
        
        <div className="flex items-center gap-3">
          {/* DateRangePicker */}
          <DateRangePeaker
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateRangeChange}
          />
          
          {/* Botón Filter */}
          <button 
            onClick={handleFilter}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white transition-colors"
          >
            <Filter className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Filter</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Treatment / Reason
              </th>
              <th className="px-6 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.date}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.treatment}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.notes}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  No appointments found for the selected date range
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredAppointments.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAppointments.length)} of {filteredAppointments.length} results
          </p>
          
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AppointmentHistoryTable;