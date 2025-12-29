import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

import ViewSelector from "../components/ViewSelector";
import CalendarGridDay from "../components/CalendarGridDay";
import CalendarGridWeek from "../components/CalendarGridWeek";
import CalendarGridMonth from "../components/CalendarGridMonth";
import StaffFilter from "../components/StaffFilter";

import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [activeView, setActiveView] = useState("Week");
  const [selectedStaff, setSelectedStaff] = useState("All Staff");
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate, activeView]);

  const fetchAppointments = () => {
    setLoading(true);
    let inicio, fin;

    if (activeView === "Day") {
      inicio = currentDate.format("YYYY-MM-DD");
      fin = currentDate.format("YYYY-MM-DD");
    } else if (activeView === "Week") {
      inicio = currentDate.clone().startOf("week").add(1, "day").format("YYYY-MM-DD");
      fin = currentDate.clone().endOf("week").add(1, "day").format("YYYY-MM-DD");
    } else if (activeView === "Month") {
      inicio = currentDate.clone().startOf("month").format("YYYY-MM-DD");
      fin = currentDate.clone().endOf("month").format("YYYY-MM-DD");
    }

    fetch(`http://localhost:8080/api/turnos/fechas?inicio=${inicio}&fin=${fin}`)
      .then(res => {
        if (!res.ok) throw new Error('Error loading appointments');
        return res.json();
      })
      .then(data => {
        const mapped = {};

        if (Array.isArray(data)) {
          data.forEach(turno => {
            const fechaKey = moment(turno.fecha).format("YYYY-MM-DD");
            const timeFormatted = moment(turno.horaInicio, "HH:mm").format("HH:mm");
            const key = `${fechaKey}-${timeFormatted}`;

            mapped[key] = {
              patient: turno.nombreCliente || "Unknown Patient",
              type: turno.nombreTratamiento || "General",
              color: turno.estado === "Confirmado" ? "green" : "yellow"
            };
          });
        }

        setAppointments(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching appointments:", err);
        setAppointments({});
        setLoading(false);
      });
  };

  const previous = () => {
    if (activeView === "Day") setCurrentDate(prev => prev.clone().subtract(1, "day"));
    if (activeView === "Week") setCurrentDate(prev => prev.clone().subtract(1, "week"));
    if (activeView === "Month") setCurrentDate(prev => prev.clone().subtract(1, "month"));
  };

  const next = () => {
    if (activeView === "Day") setCurrentDate(prev => prev.clone().add(1, "day"));
    if (activeView === "Week") setCurrentDate(prev => prev.clone().add(1, "week"));
    if (activeView === "Month") setCurrentDate(prev => prev.clone().add(1, "month"));
  };

  const renderView = () => {
    const commonProps = {
      baseDate: currentDate,
      appointments: appointments
    };

    if (activeView === "Day") return <CalendarGridDay {...commonProps} />;
    if (activeView === "Week") return <CalendarGridWeek {...commonProps} />;
    if (activeView === "Month") return <CalendarGridMonth {...commonProps} />;
  };

  const formattedTitle = {
    Day: currentDate.format("MMMM D, YYYY"),
    Week: `${currentDate.clone().startOf("week").add(1,"day").format("MMM D")} - ${currentDate.clone().endOf("week").add(1,"day").format("D, YYYY")}`,
    Month: currentDate.format("MMMM YYYY")
  }[activeView];

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Appointments</h1>
        <p className="text-gray-600">
          Manage your daily, weekly, and monthly schedule.
        </p>
      </div>

      {/* Barra de navegación */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
        <button 
          onClick={previous}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={loading}
        >
          <ChevronLeft size={22} />
        </button>
        
        <h2 className="text-xl font-semibold">
          {formattedTitle}
        </h2>

        <button 
          onClick={next}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={loading}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between">
        <StaffFilter
          selectedStaff={selectedStaff}
          onStaffChange={setSelectedStaff}
        />
        
        <ViewSelector activeView={activeView} onViewChange={setActiveView} />
      </div>

      {/* Vista del calendario */}
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading appointments...</div>
        </div>
      ) : (
        renderView()
      )}
    </div>
  );
};

export default CalendarPage;