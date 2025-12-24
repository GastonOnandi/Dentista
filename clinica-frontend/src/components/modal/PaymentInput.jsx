// src/components/modal/PaymentInput.jsx
import React, { useState } from 'react';

const PaymentInput = ({ value, onChange }) => {
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Cuando borra, dejamos string vacío (placeholder visible)
    if (inputValue === "") {
      setTouched(false);
      onChange(0);
      return;
    }

    setTouched(true);
    onChange(Number(inputValue));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Amount to Pay
      </label>
      <input
        type="number"
        value={touched ? value : ""}      // <-- clave: si no tocó, mostrar vacío
        onChange={handleChange}
        onFocus={() => setTouched(true)} // <-- al hacer click desaparece el 0
        placeholder="Enter amount"
        className="w-full px-3 py-2 border rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-cyan-500
                   [appearance:textfield]
                   [&::-webkit-outer-spin-button]:appearance-none
                   [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
};

export default PaymentInput;
