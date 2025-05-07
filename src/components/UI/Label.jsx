export function Label({ children, className = '' }) {
  return <label className={`block text-sm font-medium text-gray-700 mt-4 ${className}`}>{children}</label>;
}