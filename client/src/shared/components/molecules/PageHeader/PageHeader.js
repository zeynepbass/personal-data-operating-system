export function PageHeader({ title, description, className }) {
  return (
    <div className="mb-4">
      <h1 className={`text-3xl font-bold text-gray-900 dark:text-gray-100 ${className}`}>{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
  );
}
