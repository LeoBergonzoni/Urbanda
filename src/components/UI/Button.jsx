export function Button({ children, onClick, variant = 'primary', className = '' }) {
  const baseStyle = 'px-4 py-2 rounded font-semibold transition';
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
    ghost: 'text-blue-600 hover:underline'
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}