import React, { useState, useEffect } from "react";
import { 
  format, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths,
  parse
} from "date-fns";
import { es } from "date-fns/locale";

import ViewSelector from "../components/ViewSelector";
import CalendarGridDay from "../components/CalendarGridDay";
import CalendarGridWeek from "../components/CalendarGridWeek";
import CalendarGridMonth from "../components/CalendarGridMonth";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState("Semana");
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate, activeView]);

  const fetchAppointments = () => {
    setLoading(true);
    let inicio, fin;

    // weekStartsOn: 1 = Lunes
    const weekOptions = { locale: es, weekStartsOn: 1 };

    if (activeView === "Día") {
      inicio = format(currentDate, "yyyy-MM-dd");
      fin = format(currentDate, "yyyy-MM-dd");
    } else if (activeView === "Semana") {
      inicio = format(startOfWeek(currentDate, weekOptions), "yyyy-MM-dd");
      fin = format(endOfWeek(currentDate, weekOptions), "yyyy-MM-dd");
    } else if (activeView === "Mes") {
      inicio = format(startOfMonth(currentDate), "yyyy-MM-dd");
      fin = format(endOfMonth(currentDate), "yyyy-MM-dd");
    }

    fetch(`http://localhost:8080/api/turno/fechas?inicio=${inicio}&fin=${fin}`)
      .then(res => res.json())
      .then(data => {
        const mapped = {};
        if (Array.isArray(data)) {
          data.forEach(turno => {
            const fechaKey = format(new Date(turno.fecha), "yyyy-MM-dd");
            const timeFormatted = format(parse(turno.horaInicio, "HH:mm", new Date()), "HH:mm");
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
    if (activeView === "Día") {
      setCurrentDate(prev => subDays(prev, 1));
    } else if (activeView === "Semana") {
      setCurrentDate(prev => subWeeks(prev, 1));
    } else {
      setCurrentDate(prev => subMonths(prev, 1));
    }
  };

  const next = () => {
    if (activeView === "Día") {
      setCurrentDate(prev => addDays(prev, 1));
    } else if (activeView === "Semana") {
      setCurrentDate(prev => addWeeks(prev, 1));
    } else {
      setCurrentDate(prev => addMonths(prev, 1));
    }
  };

  const weekOptions = { locale: es, weekStartsOn: 1 };

  const formattedTitle = (() => {
    const titleMap = {
      "Día": format(currentDate, "EEEE d 'de' MMMM", { locale: es }),
      "Semana": `${format(startOfWeek(currentDate, weekOptions), "d 'de' MMM", { locale: es })} - ${format(endOfWeek(currentDate, weekOptions), "d 'de' MMM", { locale: es })}`,
      "Mes": format(currentDate, "MMMM yyyy", { locale: es })
    };
    // Capitalizar primera letra
    const title = titleMap[activeView];
    return title.charAt(0).toUpperCase() + title.slice(1);
  })();

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
        <button onClick={previous} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-semibold capitalize">{formattedTitle}</h2>
        <button onClick={next} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronRight />
        </button>
      </div>

      <div className="flex justify-end">
        <ViewSelector activeView={activeView} onViewChange={setActiveView} />
      </div>

      {loading ? (
        <div className="text-center p-20">Cargando...</div>
      ) : (
        activeView === "Día" ? <CalendarGridDay baseDate={currentDate} appointments={appointments} /> :
        activeView === "Semana" ? <CalendarGridWeek baseDate={currentDate} appointments={appointments} /> :
        <CalendarGridMonth baseDate={currentDate} appointments={appointments} />
      )}
    </div>
  );
};

export default CalendarPage;