// src/components/modal/PaymentActions.jsx
import React from 'react';
import { CreditCard } from "lucide-react";

const PaymentActions = ({ onPay }) => {
  return (
    <button
      onClick={onPay}
      className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-cyan-600"
    >
      <CreditCard className="w-5 h-5" />
      Pagar
    </button>
  );
};

export default PaymentActions;
