import React, { useState, useEffect } from "react";
import ModalBase from "./ModalBase";
import PaymentInfoCard from "./PaymentInfoCard";
import PaymentInput from "./PaymentInput";
import PaymentActions from "./PaymentActions";

const PaymentModal = ({ data, onClose, onSuccess }) => {
  if (!data) return null;

  const total = Number(data.total ?? 0);
  const pagado = Number(data.pago ?? 0);
  const deuda = Number(data.deuda ?? total - pagado);

  const [amountToPay, setAmountToPay] = useState(deuda);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAmountToPay(deuda);
  }, [deuda]);

  const handlePay = async () => {
    if (amountToPay <= 0 || amountToPay > deuda) {
      setError("Monto inválido");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log("💰 Enviando pago:", amountToPay); // Solo el número
      
      const response = await fetch(
        `http://localhost:8080/api/cliente/clientetratamiento/${data.id}/pagar`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(amountToPay), // 🔥 SOLO el número, no un objeto
        }
      );

      if (!response.ok) {
        let errorMsg = `Error ${response.status}`;
        try {
          const errorData = await response.json();
          console.error("❌ Error del servidor:", errorData);
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          errorMsg = await response.text();
        }
        throw new Error(errorMsg);
      }

      console.log("✅ Pago registrado exitosamente");
      
      // Cierra modal y recarga datos
      onSuccess();
      
    } catch (err) {
      console.error("❌ Error pagando:", err);
      setError(err.message || "Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBase
      title={`Pago – ${data.nombrePaciente}`}
      onClose={onClose}
    >
      <PaymentInfoCard
        label="Resumen"
        value={`
Tratamiento: ${data.nombreTratamiento}
Total: $${total}
Pagado: $${pagado}
Deuda: $${deuda}
        `}
      />

      <PaymentInput
        value={amountToPay}
        onChange={setAmountToPay}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p className="text-sm font-semibold">Error al procesar el pago</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      )}

      <PaymentActions
        onPay={handlePay}
        disabled={
          loading ||
          amountToPay <= 0 ||
          amountToPay > deuda
        }
      />

      {loading && (
        <div className="text-center text-gray-500 text-sm mt-2">
          Procesando pago...
        </div>
      )}
    </ModalBase>
  );
};

export default PaymentModal;