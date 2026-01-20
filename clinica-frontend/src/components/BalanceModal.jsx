import { useState } from "react";

export default function BalanceModal({ patient, onClose, onUpdate }) {
  const [tipo, setTipo] = useState("pago");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!monto || parseFloat(monto) <= 0) {
      setError("Ingrese un monto válido");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Obtener la cédula correctamente y convertir a número
      const cedulaCliente = Number(patient.cedula) || Number(patient.id);
      
      console.log('🔍 DEBUG COMPLETO:');
      console.log('📋 Objeto patient completo:', patient);
      console.log('📋 patient.cedula (original):', patient.cedula, typeof patient.cedula);
      console.log('📋 Cédula convertida a número:', cedulaCliente, typeof cedulaCliente);
      console.log('🌐 URL completa:', `http://localhost:8080/api/cliente/${cedulaCliente}/actualizar-deuda`);

      // Lógica correcta: pago reduce deuda, cargo aumenta deuda
      const cambio = tipo === "pago" 
        ? -parseFloat(monto)     // Pago: restar de la deuda
        : parseFloat(monto);     // Cargo: sumar a la deuda

      const response = await fetch(
        `http://localhost:8080/api/cliente/${cedulaCliente}/actualizar-deuda`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            monto: cambio,
            descripcion: descripcion || (tipo === "pago" ? "Pago registrado" : "Cargo agregado")
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', errorText);
        throw new Error(errorText || "Error al actualizar saldo");
      }

      console.log('✅ Saldo actualizado correctamente');
      
      // Primero actualizar los datos
      await onUpdate();
      
      // Luego cerrar el modal
      onClose();
    } catch (err) {
      console.error('❌ Error completo:', err);
      setError(err.message || "Error al procesar la operación");
    } finally {
      setLoading(false);
    }
  };

  const balanceActual = patient.deuda || 0;
  const montoNum = parseFloat(monto) || 0;
  const nuevoBalance = tipo === "pago" 
    ? balanceActual - montoNum 
    : balanceActual + montoNum;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Gestionar Saldo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Balance Actual */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Saldo actual:</p>
          <p className={`text-lg font-bold ${
            balanceActual > 0 ? "text-red-600" : 
            balanceActual < 0 ? "text-green-600" : 
            "text-gray-600"
          }`}>
            {balanceActual > 0 && "Deuda: "}
            {balanceActual < 0 && "Saldo a favor: "}
            {balanceActual === 0 && "Sin saldo: "}
            ${Math.abs(balanceActual).toLocaleString()}
          </p>
        </div>

        {/* Tipo de operación */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de operación
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTipo("pago")}
              className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                tipo === "pago"
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              💵 Registrar Pago
            </button>
            <button
              type="button"
              onClick={() => setTipo("cargo")}
              className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                tipo === "cargo"
                  ? "border-red-600 bg-red-50 text-red-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              🧾 Cargar Deuda
            </button>
          </div>
        </div>

        {/* Monto */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monto
          </label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción (opcional)
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej: Pago por tratamiento de ortodoncia"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Preview */}
        {monto && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Nuevo saldo:</p>
            <p className={`text-lg font-bold ${
              nuevoBalance > 0 ? "text-red-600" : 
              nuevoBalance < 0 ? "text-green-600" : 
              "text-gray-600"
            }`}>
              {nuevoBalance > 0 && "Deuda: "}
              {nuevoBalance < 0 && "Saldo a favor: "}
              {nuevoBalance === 0 && "Sin saldo: "}
              ${Math.abs(nuevoBalance).toLocaleString()}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex-1 px-4 py-2 rounded-lg text-white ${
              tipo === "pago"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } disabled:opacity-50`}
          >
            {loading ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}