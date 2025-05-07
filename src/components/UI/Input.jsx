export function Input({ placeholder, type = 'text', onChange, value, className = '' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}