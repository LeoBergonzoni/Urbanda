export function CardContent({ children, className = '' }) {
  return <div className={`mt-2 ${className}`}>{children}</div>;
}