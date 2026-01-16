import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

// Forzar español y que la semana empiece el Lunes
moment.locale("es", { week: { dow: 1 } });

import ViewSelector from "../components/ViewSelector";
import CalendarGridDay from "../components/CalendarGridDay";
import CalendarGridWeek from "../components/CalendarGridWeek";
import CalendarGridMonth from "../components/CalendarGridMonth";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [activeView, setActiveView] = useState("Semana"); // Coincide con ViewSelector
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate, activeView]);

  const fetchAppointments = () => {
    setLoading(true);
    let inicio, fin;

    // Lógica limpia de fechas
    if (activeView === "Día") {
      inicio = currentDate.format("YYYY-MM-DD");
      fin = currentDate.format("YYYY-MM-DD");
    } else if (activeView === "Semana") {
      inicio = currentDate.clone().startOf("week").format("YYYY-MM-DD");
      fin = currentDate.clone().endOf("week").format("YYYY-MM-DD");
    } else if (activeView === "Mes") {
      inicio = currentDate.clone().startOf("month").format("YYYY-MM-DD");
      fin = currentDate.clone().endOf("month").format("YYYY-MM-DD");
    }

    fetch(`http://localhost:8080/api/turno/fechas?inicio=${inicio}&fin=${fin}`)
      .then(res => res.json())
      .then(data => {
        const mapped = {};
        if (Array.isArray(data)) {
          data.forEach(turno => {
            // IMPORTANTE: Asegúrate que turno.fecha y turno.horaInicio vengan correctos del back
            const fechaKey = moment(turno.fecha).format("YYYY-MM-DD");
            const timeFormatted = moment(turno.horaInicio, "HH:mm").format("HH:mm");
            const key = `${fechaKey}-${timeFormatted}`;

            mapped[key] = {
              patient: turno.nombreCliente || "Paciente desconocido",
              type: turno.nombreTratamiento || "General",
              color: turno.estado === "Confirmado" ? "green" : "yellow"
            };
          });
        }
        setAppointments(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  const previous = () => {
    const unit = activeView === "Día" ? "day" : activeView === "Semana" ? "week" : "month";
    setCurrentDate(prev => prev.clone().subtract(1, unit));
  };

  const next = () => {
    const unit = activeView === "Día" ? "day" : activeView === "Semana" ? "week" : "month";
    setCurrentDate(prev => prev.clone().add(1, unit));
  };

  const formattedTitle = {
    "Día": currentDate.format("dddd D [de] MMMM"),
    "Semana": `${currentDate.clone().startOf("week").format("D [de] MMM")} - ${currentDate.clone().endOf("week").format("D [de] MMM")}`,
    "Mes": currentDate.format("MMMM YYYY")
  }[activeView];

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
        <button onClick={previous} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft /></button>
        <h2 className="text-xl font-semibold capitalize">{formattedTitle}</h2>
        <button onClick={next} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight /></button>
      </div>

      <div className="flex justify-end">
        <ViewSelector activeView={activeView} onViewChange={setActiveView} />
      </div>

      {loading ? <div className="text-center p-20">Cargando...</div> : (
        activeView === "Día" ? <CalendarGridDay baseDate={currentDate} appointments={appointments} /> :
        activeView === "Semana" ? <CalendarGridWeek baseDate={currentDate} appointments={appointments} /> :
        <CalendarGridMonth baseDate={currentDate} appointments={appointments} />
      )}
    </div>
  );
};

export default CalendarPage;