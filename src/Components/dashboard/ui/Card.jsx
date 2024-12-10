/* eslint-disable react/prop-types */
export function Card({ className = "", children, title }) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm p-6 ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
}
