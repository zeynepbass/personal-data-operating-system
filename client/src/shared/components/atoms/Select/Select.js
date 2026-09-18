"use client";

export function Select  ({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  text,
  className,
  required = false,
  error,
})  {
  return (
<div className="flex flex-col">

{(label || text) && (
  <label className="mb-2 block text-sm text-gray-500">
    {label || text}
    {required && <span className="ml-0.5 text-red-500">*</span>}
  </label>
)}
    <select
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      aria-invalid={!!error}
      className={`
        w-full
        resize-none
        rounded-xl
        border
        text-gray-500
        bg-gray-50
        px-4
        py-3
        outline-none
        transition
        focus:ring-2
        ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-gray-300 focus:border-[#555A8A] focus:ring-purple-100"
        }
        ${className}
      `}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <span className="mt-1 text-xs text-red-500">{error}</span>
    )}
    </div>
  );
};
