const ViewSelector = ({ activeView, onViewChange }) => {
  return (
    <div className="flex gap-2">
      {["Day", "Week", "Month"].map(view => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`px-4 py-2 rounded border ${
            activeView === view ? "bg-cyan-400 text-white" : ""
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
};

export default ViewSelector;
