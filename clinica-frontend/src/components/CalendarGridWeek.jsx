import React, { useMemo } from "react";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { es } from "date-fns/locale";
import AppointmentCard from "./AppointmentCard";

const CalendarGridWeek = ({ appointments = {}, baseDate }) => {
  const days = useMemo(() => {
    // weekStartsOn: 1 garantiza que empezamos en LUNES
    const startOfWeekDate = startOfWeek(baseDate, { weekStartsOn: 1 });

    return Array.from({ length: 7 }).map((_, i) => {
      const fecha = addDays(startOfWeekDate, i);
      return {
        // "EEE" devuelve abreviado (lun, mar, mié), "EEEE" completo (lunes, martes, miércoles)
        name: format(fecha, "EEE", { locale: es }), 
        date: format(fecha, "d"),
        keyDate: format(fecha, "yyyy-MM-dd"),
        isToday: isToday(fecha),
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