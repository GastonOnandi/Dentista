import { Calendar } from 'lucide-react';

const DateRangePeaker = ({ startDate, endDate, onChange }) => {
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value ? new Date(e.target.value) : null;
    onChange(newStartDate, endDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value ? new Date(e.target.value) : null;
    onChange(startDate, newEndDate);
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
      <Calendar className="w-4 h-4 text-gray-500" />
      <input
        type="date"
        value={formatDateForInput(startDate)}
        onChange={handleStartDateChange}
        className="text-sm text-gray-700 outline-none bg-transparent"
        placeholder="Start date"
      />
      <span className="text-gray-400">-</span>
      <input
        type="date"
        value={formatDateForInput(endDate)}
        onChange={handleEndDateChange}
        className="text-sm text-gray-700 outline-none bg-transparent"
        placeholder="End date"
      />
    </div>
  );
};

export default DateRangePeaker;