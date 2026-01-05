import React, { useEffect, useState } from 'react';

const PaymentInput = ({ value, onChange, max }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (Number.isFinite(value) && value > 0) {
      setInputValue(String(value));
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (val === "") {
      onChange(0);
      return;
    }

    const num = Number(val);
    if (!Number.isFinite(num)) return;
    if (max && num > max) return;

    onChange(num);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Monto a pagar
      </label>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        placeholder="Ingrese monto"
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
