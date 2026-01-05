import { Calendar } from "lucide-react";

const DateRangePeaker = ({ startDate, endDate, onChange }) => {
  const handleStartDateChange = (e) => {
    const value = e.target.value || null;
    onChange(value, endDate);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value || null;
    onChange(startDate, value);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
      <Calendar className="w-4 h-4 text-gray-500" />

      <input
        type="date"
        value={startDate ?? ""}
        onChange={handleStartDateChange}
        className="text-sm text-gray-700 outline-none bg-transparent"
      />

      <span className="text-gray-400">-</span>

      <input
        type="date"
        value={endDate ?? ""}
        onChange={handleEndDateChange}
        className="text-sm text-gray-700 outline-none bg-transparent"
      />
    </div>
  );
};

export default DateRangePeaker;
