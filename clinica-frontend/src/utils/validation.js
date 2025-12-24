export const validatePatientForm = (formData) => {
  const errors = {};

  if (!formData.cedula.trim()) {
    errors.cedula = 'La cédula es requerida';
  } else if (formData.cedula.length < 6) {
    errors.cedula = 'La cédula debe tener al menos 6 dígitos';
  }

  if (!formData.nombre.trim()) {
    errors.nombre = 'El nombre es requerido';
  } else if (formData.nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!formData.telefono.trim()) {
    errors.telefono = 'El teléfono es requerido';
  } else if (formData.telefono.length < 8) {
    errors.telefono = 'El teléfono debe tener al menos 8 dígitos';
  }

  if (!formData.direccion.trim()) {
    errors.direccion = 'La dirección es requerida';
  } else if (formData.direccion.trim().length < 10) {
    errors.direccion = 'La dirección debe ser más específica';
  }

  return errors;
};

export const sanitizeNumericInput = (value) => {
  return value.replace(/\D/g, '');
};

export const preparePatientData = (formData) => {
  return {
    cedula: parseInt(formData.cedula),
    nombre: formData.nombre.trim(),
    telefono: parseInt(formData.telefono),
    direccion: formData.direccion.trim()
  };
};

