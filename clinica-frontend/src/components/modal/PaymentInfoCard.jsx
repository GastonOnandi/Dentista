import React from "react";

const PaymentInfoCard = ({ amount = 0, discount = 0 }) => {
  const total = Number(amount) - Number(discount);

  return (
    <div className="p-4 bg-white rounded-xl shadow border">
      <h2 className="font-semibold text-lg mb-2">Resumen del Pago</h2>

      <div className="flex justify-between text-sm mb-1">
        <span>Monto:</span>
        <span>${Number(amount).toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm mb-1">
        <span>Descuento:</span>
        <span>-${Number(discount).toFixed(2)}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between font-medium">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
