import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';

// Importar componentes
import PatientSearchInput from '../components/PatientSearchInput';
import TreatmentTypeSelect from '../components/TreatmentTypeSelect';
import DateInput from '../components/DateInput';
import TimeInput from '../components/TimeInput';

const API_URL = 'http://localhost:8080/api';

const RegisterAppointmentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [slotsAvailable, setSlotsAvailable] = useState(0);

  const [formData, setFormData] = useState({
    patientId: null,
    patientName: '',
    treatmentId: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00'
  });

  // Cargar pacientes y tratamientos al montar
  useEffect(() => {
    fetchPatients();
    fetchTreatments();
  }, []);

  // Verificar slots disponibles cuando cambia la fecha
  useEffect(() => {
    if (formData.date) {
      checkAvailableSlots(formData.date);
    }
  }, [formData.date]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes`);
      setPatients(response.data);
    } catch (err) {
      console.error('Error loading patients:', err);
    }
  };

  const fetchTreatments = async () => {
    try {
      const response = await axios.get(`${API_URL}/tratamientos`);
      setTreatments(response.data);
    } catch (err) {
      console.error('Error loading treatments:', err);
    }
  };

  const checkAvailableSlots = async (date) => {
    try {
      const response = await axios.get(`${API_URL}/turnos/disponibles`, {
        params: { fecha: date }
      });
      setSlotsAvailable(response.data.disponibles || 0);
    } catch (err) {
      console.error('Error checking slots:', err);
      setSlotsAvailable(0);
    }
  };

  const handleSelectPatient = (patient) => {
    setFormData({
      ...formData,
      patientId: patient.id,
      patientName: `${patient.nombre} ${patient.apellido}`
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Validaciones
    if (!formData.patientId) {
      setError('Please select a patient');
      setLoading(false);
      return;
    }

    if (!formData.treatmentId) {
      setError('Please select a treatment type');
      setLoading(false);
      return;
    }

    if (!formData.date) {
      setError('Please select a date');
      setLoading(false);
      return;
    }

    if (formData.startTime >= formData.endTime) {
      setError('End time must be after start time');
      setLoading(false);
      return;
    }

    try {
      const appointmentData = {
        idCliente: formData.patientId,
        idTratamiento: formData.treatmentId,
        fecha: formData.date,
        horaInicio: formData.startTime,
        horaFin: formData.endTime,
        estado: 'Pendiente'
      };

      await axios.post(`${API_URL}/turnos`, appointmentData);
      
      alert('Appointment scheduled successfully!');
      navigate('/appointments');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error scheduling appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Register New Appointment</h1>
            <p className="text-sm text-gray-600 mt-1">Fill in the details to schedule a new visit.</p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Patient Search */}
            <PatientSearchInput
              value={formData.patientName}
              onChange={(value) => setFormData({ ...formData, patientName: value, patientId: null })}
              patients={patients}
              onSelectPatient={handleSelectPatient}
            />

            {/* Treatment Type */}
            <TreatmentTypeSelect
              value={formData.treatmentId}
              onChange={(value) => setFormData({ ...formData, treatmentId: value })}
              treatments={treatments}
            />

            {/* Date */}
            <DateInput
              value={formData.date}
              onChange={(value) => setFormData({ ...formData, date: value })}
              slotsAvailable={slotsAvailable}
            />

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <TimeInput
                label="Start Time"
                value={formData.startTime}
                onChange={(value) => setFormData({ ...formData, startTime: value })}
              />
              <TimeInput
                label="Estimated End Time"
                value={formData.endTime}
                onChange={(value) => setFormData({ ...formData, endTime: value })}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end mt-8 pt-6 border-t">
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-cyan-400 text-white rounded-lg font-medium hover:bg-cyan-500 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Scheduling...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Schedule Appointment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAppointmentPage;