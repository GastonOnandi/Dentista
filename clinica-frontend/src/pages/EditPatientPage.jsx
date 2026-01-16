import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Briefcase } from 'lucide-react';

import SectionHeader from '../components/SectionHeader';
import InputField from '../components/InputField';
import AllergyTag from '../components/AllergyTag';
import MedicationItem from '../components/MedicationItem';
import AddItemInput from '../components/AddItemInput';
import InfoAlert from '../components/InfoAlert';

const EditPatientPage = () => {
  const { cedula } = useParams();
  const navigate = useNavigate();

  // ======================
  // Estados
  // ======================
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState("");

  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState("");

  const [loading, setLoading] = useState(true);

  // ======================
  // CARGAR PACIENTE (GET)
  // ======================
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cliente/${cedula}/info`
        );

        if (!response.ok) {
          throw new Error("Error obteniendo paciente");
        }

        const data = await response.json();

        // 🔑 MAPEO CORRECTO SEGÚN BACKEND
        setFullName(data.nombre || "");
        setPhone(data.telefono ? data.telefono.toString() : "");
        setAddress(data.direccion || "");

        setAllergies(
          (data.alergias || []).map(a => a.detalle)
        );

        setMedications(
          (data.medicaciones || []).map(m => m.detalle)
        );
      } catch (error) {
        console.error("❌ Error:", error);
        alert("Error cargando datos del paciente");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [cedula]);

  // ======================
  // ALERGIAS
  // ======================
  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const removeAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  // ======================
  // MEDICACIONES
  // ======================
  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication("");
    }
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  // ======================
  // ACCIONES
  // ======================
  const handleCancel = () => {
    navigate(`/patients/${cedula}`);
  };

  const handleUpdate = async () => {
    // 🔑 PAYLOAD ADAPTADO AL BACKEND
    const payload = {
      nombre: fullName,
      telefono: Number(phone),
      direccion: address,
      alergias: allergies.map(detalle => ({
        tipo: "Alergia",
        detalle
      })),
      medicaciones: medications.map(detalle => ({
        tipo: "Medicamento",
        detalle
      }))
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/cliente/${cedula}/modificar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error("Error actualizando paciente");
      }

      navigate(`/patients/${cedula}`);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error actualizando paciente");
    }
  };

  // ======================
  // LOADING
  // ======================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Cargando paciente...</p>
      </div>
    );
  }

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <button
            onClick={() => navigate('/patients')}
            className="hover:text-cyan-600"
          >
            Pacientes
          </button>
          <span>›</span>
          <span className="text-gray-900">Editar paciente</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Editar datos del paciente
        </h1>
        <p className="text-gray-600">
          Actualizar información de {fullName}.
        </p>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border p-8 space-y-8">

          {/* Personal Info */}
          <div>
            <SectionHeader icon={User} title="Información personal" />
            <div className="grid grid-cols-2 gap-6">
              <InputField
                label="Nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <InputField
                label="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <InputField
                label="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
            </div>
          </div>

          {/* Medical */}
          <div className="border-t pt-8">
            <SectionHeader icon={Briefcase} title="Información médica" />

            {/* Alergias */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Alergias
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {allergies.map((a, i) => (
                  <AllergyTag
                    key={i}
                    allergy={a}
                    onRemove={() => removeAllergy(i)}
                  />
                ))}
              </div>
              <AddItemInput
                placeholder="Agregar alergia..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onAdd={addAllergy}
                buttonText="Agregar"
              />
            </div>

            {/* Medicaciones */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Medicaciones
              </label>
              <div className="space-y-2 mb-3">
                {medications.map((m, i) => (
                  <MedicationItem
                    key={i}
                    medication={m}
                    onRemove={() => removeMedication(i)}
                  />
                ))}
              </div>
              <AddItemInput
                placeholder="Agregar medicación..."
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                onAdd={addMedication}
                buttonText="Agregar"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="border-t pt-6 flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="px-6 py-3 border rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
            >
              Actualizar paciente
            </button>
          </div>
        </div>

        <div className="mt-6">
          <InfoAlert
            message="Los cambios en la información médica se reflejarán en futuras consultas del paciente."
          />
        </div>
      </div>
    </div>
  );
};

export default EditPatientPage;
