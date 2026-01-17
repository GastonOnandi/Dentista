import React, { useState } from "react";
import { X } from "lucide-react";

const RegisterTreatmentModal = ({ isOpen, onClose, onSuccess }) => {
  const [treatmentName, setTreatmentName] = useState("");
  const [standardCost, setStandardCost] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!treatmentName.trim() || !standardCost) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      nombre: treatmentName.trim(),
      costo: Number(standardCost)
    };

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8080/api/tratamiento/registrar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        throw new Error("Error creating treatment");
      }

      // 🔁 refrescar lista si el padre quiere
      onSuccess?.();

      // reset + cerrar
      setTreatmentName("");
      setStandardCost("");
      onClose();
    } catch (err) {
      console.error("❌ Error creando tratamiento:", err);
      alert("Error creating treatment");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTreatmentName("");
    setStandardCost("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Register New Treatment
          </h2>
          <p className="text-sm text-cyan-600">
            Rapidly add a new procedure to your service catalog.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Treatment Name *
            </label>
            <input
              type="text"
              value={treatmentName}
              onChange={(e) => setTreatmentName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Standard Cost *
            </label>
            <input
              type="number"
              value={standardCost}
              onChange={(e) => setStandardCost(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save Treatment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterTreatmentModal;
