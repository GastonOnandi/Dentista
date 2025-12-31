import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientList from "../components/PatientList";
import ContactInfo from "../components/ContactInfo";
import AppointmentHistoryTable from "../components/AppointmentHistoryTable";

const PatientDetailPage = () => {
  const { idCliente } = useParams();
  const navigate = useNavigate();

  const [patientInfo, setPatientInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]); 
  const [activeTab, setActiveTab] = useState("appointment"); // 👈 por defecto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        // === Datos del cliente ===
        const resInfo = await fetch(`http://localhost:8080/api/cliente/${idCliente}/info`);
        if (!resInfo.ok) throw new Error(`Error cargando info del cliente (${resInfo.status})`);
        const info = await resInfo.json();

        // === Turnos del cliente ===
        const resTurnos = await fetch(`http://localhost:8080/api/cliente/${idCliente}/turnos`);
        if (!resTurnos.ok) throw new Error(`Error cargando turnos del cliente (${resTurnos.status})`);
        const turnos = await resTurnos.json();

        setPatientInfo(info);
        setAppointments(Array.isArray(turnos) ? turnos : []);
      } catch (err) {
        console.error("Error cargando datos del cliente:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idCliente]);

  // === Vista de carga ===
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  // === Vista de error ===
  if (error || !patientInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          Error: No se pudo cargar la información del paciente
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* === Sidebar === */}
      <PatientList
        patients={patients}
        activePatient={{ idCliente, name: patientInfo.nombre }}
        onSelectPatient={(p) => navigate(`/patients/${p.idCliente}`)}
        onAddPatient={() => navigate("/patients/register")}
      />

      {/* === Main === */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* === Header === */}
        <div className="bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={
                  patientInfo.avatarUrl ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                }
                alt={patientInfo.nombre}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {patientInfo.nombre}
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Last Visit: {patientInfo.ultimaVisita ?? "Nunca"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* === Tabs === */}
        <div className="border-b border-gray-200 px-8">
          <nav className="flex gap-8">

            {/* 🟦 Appointment History primero */}
            <button
              onClick={() => setActiveTab("appointment")}
              className={`py-4 text-sm font-medium transition-colors ${
                activeTab === "appointment"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Appointment History
            </button>

            <button
              onClick={() => setActiveTab("contact")}
              className={`py-4 text-sm font-medium transition-colors ${
                activeTab === "contact"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Info
            </button>

          </nav>
        </div>

        {/* === Contenido === */}
        <div className="px-8 py-6">
          {activeTab === "appointment" && (
            <AppointmentHistoryTable appointments={appointments} />
          )}
          {activeTab === "contact" && <ContactInfo patient={patientInfo} />}
        </div>
      </main>
    </div>
  );
};

export default PatientDetailPage;
