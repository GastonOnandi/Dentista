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

  useEffect(() => {
    setAmountToPay(deuda);
  }, [deuda]);

  const handlePay = async () => {
    if (amountToPay <= 0 || amountToPay > deuda) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/cliente/clientetratamiento/${data.id}/pagar`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(amountToPay),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar el pago");
      }

      onSuccess(); // refresca + cierra
    } catch (err) {
      console.error("Error pagando:", err);
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

      <PaymentActions
        onPay={handlePay}
        disabled={
          loading ||
          amountToPay <= 0 ||
          amountToPay > deuda
        }
      />
    </ModalBase>
  );
};

export default PaymentModal;
