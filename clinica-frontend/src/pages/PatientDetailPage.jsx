import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientList from '../components/PatientList';
import ContactInfo from '../components/ContactInfo';
import AppointmentHistoryTable from '../components/AppointmentHistoryTable';

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('contact');

  // === Pacientes ===
  const patients = [
    {
      id: '12345',
      name: 'John Doe',
      lastVisit: '12/03/2024',
      address: '123 Main St, Anytown, USA 12345',
      phone: '(555) 123-4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',

      // === Datos agregados ===
      allergies: [
        "Penicillin",
        "Latex",
        "Ibuprofen",
      ],
      medications: [
        "Lisinopril 10mg (1 tablet daily)",
        "Atorvastatin 20mg (1 tablet nightly)",
        "Metformin 500mg (with meals)",
      ],
    },

    {
      id: '67890',
      name: 'Jane Smith',
      lastVisit: '11/28/2024',
      address: '456 Oak Ave, Somewhere, USA 67890',
      phone: '(555) 234-5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },

    {
      id: '11223',
      name: 'Robert Johnson',
      lastVisit: '12/01/2024',
      address: '789 Pine Rd, Elsewhere, USA 11223',
      phone: '(555) 345-6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
    }
  ];

  // === Cargar paciente y turnos ===
  useEffect(() => {
    const mockAppointments = [
      { id: 1, date: 'Apr 24, 2025', time: '09:00 AM', treatment: 'Root Canal Therapy', notes: 'Follow-up session' },
      { id: 2, date: 'Mar 10, 2025', time: '02:30 PM', treatment: 'Dental Cleaning', notes: 'Routine Checkup' },
      { id: 3, date: 'Dec 05, 2024', time: '11:15 AM', treatment: 'Cavity Filling', notes: 'Molar #14' },
      { id: 4, date: 'Nov 12, 2024', time: '10:00 AM', treatment: 'Consultation', notes: 'Rescheduled by patient' },
      { id: 5, date: 'Oct 15, 2024', time: '03:00 PM', treatment: 'Teeth Whitening', notes: 'Cosmetic procedure' },
      { id: 6, date: 'Sep 22, 2024', time: '01:30 PM', treatment: 'X-Ray', notes: 'Annual checkup' }
    ];

    const patient = patients.find(p => p.id === id);
    if (patient) {
      setSelectedPatient(patient);
    } else {
      navigate('/patients');
    }

    setAppointments(mockAppointments);
  }, [id, navigate]);

  const handleSelectPatient = (patient) => {
    navigate(`/patients/${patient.id}`);
  };

  if (!selectedPatient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <PatientList
        patients={patients}
        activePatient={selectedPatient}
        onSelectPatient={handleSelectPatient}
        onAddPatient={() => navigate('/patients/register')}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Header */}
        <div className="bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedPatient.avatar}
                alt={selectedPatient.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {selectedPatient.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Last Visit: {selectedPatient.lastVisit}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Edit
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-4 text-sm font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Info
            </button>

            <button
              onClick={() => setActiveTab('appointment')}
              className={`py-4 text-sm font-medium transition-colors ${
                activeTab === 'appointment'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Appointment History
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div className="px-8 py-6">
          {activeTab === 'contact' && <ContactInfo patient={selectedPatient} />}

          {activeTab === 'appointment' && (
            <AppointmentHistoryTable appointments={appointments} />
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientDetailPage;
