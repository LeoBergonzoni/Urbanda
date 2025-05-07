import { useState } from 'react';

export function Select({ children, onValueChange, placeholder = 'Seleziona', className = '' }) {
  const [value, setValue] = useState('');
  return (
    <select
      className={`w-full border border-gray-300 rounded-md p-2 mt-1 bg-white ${className}`}
      onChange={(e) => {
        setValue(e.target.value);
        onValueChange(e.target.value);
      }}
      value={value}
    >
      <option value="" disabled>{placeholder}</option>
      {children}
    </select>
  );
}