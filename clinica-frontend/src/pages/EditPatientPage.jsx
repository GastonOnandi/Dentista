import { useState } from 'react';
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

  // Estado para información personal
  const [fullName, setFullName] = useState("Johnathan Doe");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Dental Street, Suite 4B, New York, NY 10001");

  // Estado para alergias
  const [allergies, setAllergies] = useState(["Penicillin", "Latex"]);
  const [newAllergy, setNewAllergy] = useState("");

  // Estado para medicamentos
  const [medications, setMedications] = useState([
    "Warfarin (5mg daily)",
    "Lisinopril (10mg daily)"
  ]);
  const [newMedication, setNewMedication] = useState("");

  // Funciones para alergias
  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const removeAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  // Funciones para medicamentos
  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication("");
    }
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    navigate(`/patients/${cedula}`);
  };

  const handleUpdate = () => {
    // TODO: Aquí irá la llamada al backend
    console.log("Update Patient:", {
      cedula,
      fullName,
      phone,
      address,
      allergies,
      medications
    });
    
    // Después de actualizar, redirigir al detalle del paciente
    navigate(`/patients/${cedula}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <button 
            onClick={() => navigate('/patients')}
            className="hover:text-cyan-600 cursor-pointer"
          >
            Patients
          </button>
          <span>›</span>
          <span className="text-gray-900">Edit Patient Details</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Patient Details</h1>
        <p className="text-gray-600">
          Update demographics and medical history for {fullName}.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Personal Information Section */}
          <div>
            <SectionHeader icon={User} title="Personal Information" />
            <div className="grid grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
              />
              <InputField
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                type="tel"
              />
              <InputField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                fullWidth
              />
            </div>
          </div>

          {/* Medical Considerations Section */}
          <div className="border-t pt-8">
            <SectionHeader icon={Briefcase} title="Medical Considerations" />
            
            {/* Allergies */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Allergies
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {allergies.map((allergy, index) => (
                  <AllergyTag
                    key={index}
                    allergy={allergy}
                    onRemove={() => removeAllergy(index)}
                  />
                ))}
              </div>
              <AddItemInput
                placeholder="Add new allergy..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onAdd={addAllergy}
                buttonText="Add"
              />
            </div>

            {/* Current Medications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Current Medications
              </label>
              <div className="space-y-2 mb-3">
                {medications.map((medication, index) => (
                  <MedicationItem
                    key={index}
                    medication={medication}
                    onRemove={() => removeMedication(index)}
                  />
                ))}
              </div>
              <AddItemInput
                placeholder="Add new medication..."
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                onAdd={addMedication}
                buttonText="Add"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-6 flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              Update Patient
            </button>
          </div>
        </div>

        {/* Info Alert */}
        <div className="mt-6">
          <InfoAlert
            message="Updating medical considerations will automatically notify the treating dentist for the next scheduled appointment. Please ensure all medications are verified with the latest patient disclosure."
          />
        </div>
      </div>
    </div>
  );
};

export default EditPatientPage;