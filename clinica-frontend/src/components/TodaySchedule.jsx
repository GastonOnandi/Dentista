import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

const TodaySchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener fecha local correctamente
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    fetch(`http://localhost:8080/api/turno/fechas?inicio=${today}&fin=${today}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data received:", data); // Para debug
        // Asegurarse de que data sea un array
        const appointmentsArray = Array.isArray(data) ? data : [];
        
        // Filtrar solo los turnos de la hora actual en adelante
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const futureAppointments = appointmentsArray.filter(apt => {
          return apt.horaInicio >= currentTime;
        });
        
        setAppointments(futureAppointments);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading schedule:", err);
        setError(err.message);
        setAppointments([]); // Establecer array vacío en caso de error
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Agenda del día</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Agenda del día</h2>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Agenda del día</h2>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay citas para el día de hoy</p>
        ) : (
          appointments.map((appointment, index) => (
            <div key={appointment.id || index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="bg-cyan-50 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {appointment.nombreCliente} - {appointment.nombreTratamiento}
                </h3>
                <p className="text-sm text-gray-500">
                  {appointment.horaInicio} - {appointment.horaFin}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                appointment.estado === 'Confirmado' ? 'bg-green-100 text-green-700' :
                appointment.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {appointment.estado}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;