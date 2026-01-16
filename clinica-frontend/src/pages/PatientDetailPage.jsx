import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientList from "../components/PatientList";
import ContactInfo from "../components/ContactInfo";
import AppointmentHistoryTable from "../components/AppointmentHistoryTable";

const PatientDetailPage = () => {
  const { cedula } = useParams();
  const navigate = useNavigate();

  const [patientInfo, setPatientInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("appointment");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* =========================
     🔧 Normalizadores DEFINITIVOS
     ========================= */

  const normalizeDate = (value) => {
    // Backend YA manda yyyy-MM-dd
    return typeof value === "string" ? value : "";
  };

  const normalizeTime = (value) => {
    // Backend manda HH:mm
    return typeof value === "string" ? value.slice(0, 5) : "";
  };

  /* =========================
     🔍 Buscar pacientes
     ========================= */

  const buscarPacientes = useCallback(async (q) => {
    if (!q?.trim()) {
      setPatients([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/cliente/buscar?q=${encodeURIComponent(q)}`
      );
      if (!res.ok) throw new Error();
      setPatients(await res.json());
    } catch {
      setPatients([]);
    }
  }, []);

  /* =========================
     📡 Fetch paciente + turnos
     ========================= */

  useEffect(() => {
    if (!cedula) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [infoRes, turnosRes] = await Promise.all([
          fetch(`http://localhost:8080/api/cliente/${cedula}/info`),
          fetch(`http://localhost:8080/api/cliente/${cedula}/turnos`)
        ]);

        if (!infoRes.ok || !turnosRes.ok) throw new Error();

        const info = await infoRes.json();
        const turnosRaw = await turnosRes.json();

        console.log("🧪 TURNOS RAW:", turnosRaw);

        const turnosNormalizados = Array.isArray(turnosRaw)
          ? turnosRaw.map((t) => ({
              id: t.id,
              date: normalizeDate(t.fecha),
              time: normalizeTime(t.horaInicio),
              treatment: t.tratamiento ?? "—",
              notes: ""
            }))
          : [];

        console.table(turnosNormalizados);

        setPatientInfo(info);
        setAppointments(turnosNormalizados);
      } catch (err) {
        console.error("❌ Error cargando paciente:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cedula]);

  /* =========================
     ⏳ Estados
     ========================= */

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Cargando...
      </div>
    );
  }

  if (error || !patientInfo) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error al cargar paciente
      </div>
    );
  }

  /* =========================
     🖥 Render
     ========================= */

  return (
    <div className="flex h-screen bg-gray-50">
      <PatientList
        patients={patients}
        activePatient={{ cedula }}
        onSelectPatient={(p) => navigate(`/patients/${p.cedula}`)}
        onAddPatient={() => navigate("/patients/register")}
        onEditPatient={() => navigate(`/patients/${cedula}/edit`)}
        onSearch={buscarPacientes}
      />

      <main className="flex-1 overflow-y-auto bg-white">
        {/* Header */}
        <div className="px-8 py-6 flex items-center gap-4">
          <img
            src={
              patientInfo.avatarUrl ??
              "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
            }
            alt={patientInfo.nombre}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold">{patientInfo.nombre}</h1>
            <p className="text-sm text-gray-500">
              Ultimas visitas: {patientInfo.ultimaVisita ?? "Nunca"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("appointment")}
              className={`py-4 ${
                activeTab === "appointment"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Historial de citas
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`py-4 ${
                activeTab === "contact"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Info
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {activeTab === "appointment" && (
            <AppointmentHistoryTable appointments={appointments} />
          )}
          {activeTab === "contact" && (
            <ContactInfo patient={patientInfo} />
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientDetailPage;