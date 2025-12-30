const ContactInfo = ({ patient }) => {
  return (
    <div className="space-y-10">
      
      {/* Address / Phone Info */}
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


      {/* Allergies + Medications side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

        {/* Allergies */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Allergies</h3>
            <button className="text-blue-600 text-sm">Add New</button>
          </div>

          <div className="mt-2 space-y-2">
            {(patient.allergies ?? []).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200"
              >
                <span>⚠️</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Medications */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Medications</h3>
            <button className="text-blue-600 text-sm">Add New</button>
          </div>

          <div className="mt-2 space-y-2">
            {(patient.medications ?? []).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200"
              >
                <span>💊</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactInfo;
