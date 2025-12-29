import React, { useEffect, useState } from 'react';

const UpcomingAppointments = () => {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    obtenerTurnos();
  }, []);

  const obtenerTurnos = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/turno/proximos");

    if (!response.ok) {
      console.error("Error HTTP:", response.status);
      setSecciones([]); // evita romper map
      return;
    }

    const data = await response.json();
    setSecciones(Array.isArray(data) ? data : []);
    
  } catch (error) {
    console.error("Fallo el fetch:", error);
    setSecciones([]); // evita error en map
  }
};

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming</h2>
      <div className="space-y-6">

        {secciones.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            
            {/* section.dia viene del mapper */}
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{section.dia}</h3>
            
            <div className="space-y-3">
              {section.turnos.map((t, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  
                  {/* Iniciales */}
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {t.iniciales}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Nombre */}
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {t.nombreCliente}
                    </h4>
                    
                    {/* Hora - Tratamiento */}
                    <p className="text-xs text-gray-500">
                      {t.hora} - {t.tratamiento}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default UpcomingAppointments;
