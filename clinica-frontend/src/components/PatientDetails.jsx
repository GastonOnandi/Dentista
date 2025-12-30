import { useNavigate } from 'react-router-dom';
import InfoField from './InfoField';

const PatientDetails = ({ patient }) => {
  const navigate = useNavigate();

  if (!patient) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Select a patient to view details</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            {patient.avatar ? (
              <img src={patient.avatar} alt={patient.name} className="w-20 h-20 rounded-full" />
            ) : (
              <span className="text-3xl text-gray-400">👤</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{patient.name}</h2>
            <p className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
            Edit
          </button>
          <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600">
            Save
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          <button className="pb-4 border-b-2 border-cyan-500 text-cyan-500 font-medium">
            Contact Info
          </button>
          <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
            Medical History
          </button>
          <button 
            className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            onClick={() => navigate(`/patients/${patient.id}`)}
          >
            Appointment History
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <InfoField label="Address" value={patient.address} />
          <InfoField label="Phone Number" value={patient.phone} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InfoField label="Email Address" value={patient.email} />
          <InfoField label="Emergency Contact" value={patient.emergency} />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;