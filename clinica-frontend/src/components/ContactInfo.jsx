const ContactInfo = ({ patient }) => {
  if (!patient) return null;

  const alergias = patient.alergias ?? [];
  const medicaciones = patient.medicaciones ?? [];

  return (
    <div className="space-y-10">

      {/* Address / Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
          <p className="mt-1 text-gray-900">
            {patient.direccion ?? "—"}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
          <p className="mt-1 text-gray-900">
            {patient.telefono ?? "—"}
          </p>
        </div>
      </div>

      {/* Allergies / Medications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

        {/* Alergias */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Alergias
          </h3>

          {alergias.length === 0 && (
            <p className="text-sm text-gray-400">
              Sin alergias registradas
            </p>
          )}

          {alergias.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200"
            >
              ⚠️ <span>{item.detalle}</span>
            </div>
          ))}
        </div>

        {/* Medicaciones */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Medicaciones
          </h3>

          {medicaciones.length === 0 && (
            <p className="text-sm text-gray-400">
              No hay medicamentos
            </p>
          )}

          {medicaciones.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 px-4 py-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200"
            >
              💊 <span>{item.detalle}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContactInfo;