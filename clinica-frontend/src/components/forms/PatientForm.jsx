import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validatePatientForm, sanitizeNumericInput, preparePatientData } from '../../utils/validation';

const PatientForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    telefono: '',
    direccion: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    
    if (field === 'cedula' || field === 'telefono') {
      value = sanitizeNumericInput(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = validatePatientForm(formData);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const dataToSend = preparePatientData(formData);
      
      const response = await fetch('/api/pacientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert('¡Paciente registrado exitosamente!');
        
        setFormData({
          cedula: '',
          nombre: '',
          telefono: '',
          direccion: ''
        });
        
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } else {
        alert('Error al registrar paciente');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Input
        label="Cédula"
        type="text"
        placeholder="Ingrese la cédula"
        value={formData.cedula}
        onChange={handleChange('cedula')}
        error={errors.cedula}
      />

      <Input
        label="Nombre Completo"
        type="text"
        placeholder="Ingrese el nombre completo"
        value={formData.nombre}
        onChange={handleChange('nombre')}
        error={errors.nombre}
      />

      <Input
        label="Teléfono"
        type="tel"
        placeholder="Ingrese el teléfono"
        value={formData.telefono}
        onChange={handleChange('telefono')}
        error={errors.telefono}
      />

      <Input
        label="Dirección"
        type="text"
        placeholder="Ingrese la dirección"
        value={formData.direccion}
        onChange={handleChange('direccion')}
        error={errors.direccion}
      />

      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrar Paciente'}
      </Button>
    </div>
  );
};

export default PatientForm;
