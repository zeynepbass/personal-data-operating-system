export default function DashboardHeading ({ title, description, className })  {
    return (
      <div className="mb-4">
        <h3 className={`text-lg font-bold text-gray-900 dark:text-gray-100 ${className}`}>{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
    );
  };
  