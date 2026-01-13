const ContactInfo = ({ patient }) => {
  return (
    <div className="space-y-10">

      {/* Address / Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Address</h3>
          <p className="mt-1 text-gray-900">{patient.address}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
          <p className="mt-1 text-gray-900">{patient.phone}</p>
        </div>
      </div>

      {/* Allergies / Medications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

        {/* Allergies */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Allergies</h3>
          {(patient.allergies ?? []).length === 0 && (
            <p className="text-sm text-gray-400">No allergies registered</p>
          )}
          {(patient.allergies ?? []).map((item, index) => (
            <div
              key={index}
              className="flex gap-3 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200"
            >
              ⚠️ <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Medications */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Medications</h3>
          {(patient.medications ?? []).length === 0 && (
            <p className="text-sm text-gray-400">No medications registered</p>
          )}
          {(patient.medications ?? []).map((item, index) => (
            <div
              key={index}
              className="flex gap-3 px-4 py-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200"
            >
              💊 <span>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContactInfo;
