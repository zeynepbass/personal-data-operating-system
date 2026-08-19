export function Heading({
  title,
  description,
  className,
  descriptionClassName,
}) {
  return (
    <div>
      <h3 className={`text-gray-900 dark:text-gray-100 ${className || ""}`}>
        {title}
      </h3>
      {description && (
        <p
          className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${
            descriptionClassName || ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
