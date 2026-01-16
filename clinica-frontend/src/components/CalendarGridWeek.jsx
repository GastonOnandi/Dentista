import React, { useMemo } from "react";
import moment from "moment";
import "moment/locale/es"; // Importante: cargar el idioma
import AppointmentCard from "./AppointmentCard";

const CalendarGridWeek = ({ appointments = {}, baseDate }) => {
  // Seteamos el idioma español localmente para este componente
  moment.locale("es");

  const days = useMemo(() => {
    // .startOf("isoWeek") garantiza que empezamos en LUNES
    const startOfWeek = moment(baseDate).startOf("isoWeek");

    return Array.from({ length: 7 }).map((_, i) => {
      const fecha = moment(startOfWeek).add(i, "days");
      return {
        // "dddd" devuelve el nombre completo, "ddd" abreviado
        name: fecha.format("ddd"), 
        date: fecha.format("D"),
        keyDate: fecha.format("YYYY-MM-DD"),
        isToday: fecha.isSame(moment(), "day"),
      };
    });
  }, [baseDate]);

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Header de días */}
      <div className="grid grid-cols-8 border-b bg-gray-50">
        <div className="p-4 border-r"></div>
        {days.map((day, i) => (
          <div key={i} className={`p-4 text-center border-r last:border-0 ${day.isToday ? "bg-cyan-400 text-white" : ""}`}>
            {/* capitalize para que salga 'Lun' y no 'lun.' */}
            <div className="text-sm font-medium capitalize">{day.name.replace(".", "")}</div>
            <div className="text-2xl font-bold">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Celdas */}
      <div className="grid grid-cols-8">
        <div className="border-r bg-gray-50">
          {timeSlots.map(time => (
            <div key={time} className="p-4 text-sm text-gray-500 border-b h-24 flex items-center justify-center font-medium">
              {time}
            </div>
          ))}
        </div>

        {days.map(day => (
          <div key={day.keyDate} className="border-r last:border-0">
            {timeSlots.map(time => {
              const appointment = appointments[`${day.keyDate}-${time}`];
              return (
                <div key={time} className="p-1 border-b h-24 hover:bg-gray-50">
                  {appointment && <AppointmentCard {...appointment} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGridWeek;