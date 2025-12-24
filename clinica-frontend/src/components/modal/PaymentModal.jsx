// src/components/modal/PaymentModal.jsx
import React, { useState } from 'react';
import ModalBase from './ModalBase';
import PaymentInfoCard from './PaymentInfoCard';
import PaymentInput from './PaymentInput';
import PaymentActions from './PaymentActions';

const PaymentModal = ({ data, onClose }) => {
  const { name, totalAmount, amountPaid } = data;
  const owed = totalAmount - amountPaid;

  const [amountToPay, setAmountToPay] = useState(owed);

  const handlePay = () => {
    console.log("Pagando:", amountToPay);
    onClose();
  };

  return (
    <ModalBase title={`Payment for ${name}`} onClose={onClose}>
      {/* --- ÚNICO PaymentInfoCard --- */}
      <PaymentInfoCard
        label="Payment Summary"
        value={`
          Total: ${totalAmount}
          Paid: ${amountPaid}
          Owed: ${owed}
        `}
        bg="bg-gray-100"
      />

      <div className="mt-4">
        <PaymentInput value={amountToPay} onChange={setAmountToPay} />
      </div>

      <PaymentActions onPay={handlePay} />
    </ModalBase>
  );
};

export default PaymentModal;
