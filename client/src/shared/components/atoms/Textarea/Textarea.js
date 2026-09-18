"use client";

export function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  className = "",
  required = false,
  error,
  ...props
})  {
  return (
<div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-gray-300 focus:border-[#555A8A] focus:ring-purple-100"
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="mt-1 text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};
