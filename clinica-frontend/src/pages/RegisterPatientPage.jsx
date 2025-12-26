import React, { useState } from 'react';
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from 'react-router-dom';
const RegisterPatientPage = () => {
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
      value = value.replace(/\D/g, '');
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cedula.trim()) {
      newErrors.cedula = 'La cédula es requerida';
    } else if (formData.cedula.length < 6) {
      newErrors.cedula = 'La cédula debe tener al menos 6 dígitos';
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (formData.telefono.length < 8) {
      newErrors.telefono = 'El teléfono debe tener al menos 8 dígitos';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (formData.direccion.trim().length < 10) {
      newErrors.direccion = 'La dirección debe ser más específica';
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    const dataToSend = {
      cedula: parseInt(formData.cedula),
      nombre: formData.nombre.trim(),
      telefono: parseInt(formData.telefono),
      direccion: formData.direccion.trim()
    };
      // Vinculo con el backend
    try {
      const response = await fetch('http://localhost:8080/api/cliente/registrar', {
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
      } else {
        alert('Error al registrar paciente');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registrar Nuevo Paciente
          </h1>
          <p className="text-cyan-600 text-sm">
            Ingrese los datos del paciente
          </p>
        </div>

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

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            <Link to="/dashboard" className="text-cyan-600 hover:text-cyan-700 font-medium">
              Volver al Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatientPage;