import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';

import PatientSearchInput from '../components/PatientSearchInput';
import TreatmentTypeSelect from '../components/TreatmentTypeSelect';
import DateInput from '../components/DateInput';
import TimeInput from '../components/TimeInput';

const API_URL = 'http://localhost:8080/api';

const RegisterAppointmentPage = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    patientId: null,
    patientName: '',
    treatmentId: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
  });

  useEffect(() => {
    axios.get(`${API_URL}/cliente/mostrar`).then(r => setPatients(r.data));
    axios.get(`${API_URL}/tratamiento/listar`).then(r => setTreatments(r.data));
  }, []);

  const handleSelectPatient = (patient) => {
    setFormData(prev => ({
      ...prev,
      patientId: patient.cedula,
      patientName: patient.nombre,
    }));
  };

  const handleSubmit = async () => {
    setError(null);

    if (!formData.patientId) {
      return setError('Select a patient from the list');
    }

    if (!formData.treatmentId) {
      return setError('Select a treatment');
    }

    if (!formData.date) {
      return setError('Select a date');
    }

    const payload = {
      idCliente: formData.patientId,
      idTratamiento: formData.treatmentId,
      fecha: formData.date, // ← Enviar directamente en formato yyyy-MM-dd
      horaInicio: formData.startTime,
      horaFin: formData.endTime,
    };

    console.log('📤 Payload being sent:', payload);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/turno/agendar`, payload);
      console.log('✅ Response:', response.data);
      alert('Appointment scheduled successfully!');
      navigate('/appointments');
    } catch (e) {
      console.error('❌ Error completo:', e);
      console.error('❌ Error response data:', e.response?.data);
      
      const errorMessage = e.response?.data?.message || 
                          e.response?.data?.error || 
                          'Error scheduling appointment';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-xl font-bold">Register Appointment</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X />
          </button>
        </div>

        {error && (
          <div className="m-6 bg-red-50 border border-red-200 p-4 rounded text-red-600">
            {error}
          </div>
        )}

        <div className="p-6 space-y-6">
          <PatientSearchInput
            value={formData.patientName}
            patients={patients}
            onSelectPatient={handleSelectPatient}
          />

          <TreatmentTypeSelect
            value={formData.treatmentId}
            treatments={treatments}
            onChange={(v) =>
              setFormData(prev => ({ ...prev, treatmentId: v }))
            }
          />

          <DateInput
            value={formData.date}
            onChange={(v) =>
              setFormData(prev => ({ ...prev, date: v }))
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <TimeInput
              label="Start Time"
              value={formData.startTime}
              onChange={(v) =>
                setFormData(prev => ({ ...prev, startTime: v }))
              }
            />
            <TimeInput
              label="End Time"
              value={formData.endTime}
              onChange={(v) =>
                setFormData(prev => ({ ...prev, endTime: v }))
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Schedule'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAppointmentPage;