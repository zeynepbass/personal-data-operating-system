export default function SettingsHeading ({ title, description, className }) {
    return (
      <div className="mb-4">
        <h3 className={`text-lg font-bold ${className}`}>{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    );
  };
  