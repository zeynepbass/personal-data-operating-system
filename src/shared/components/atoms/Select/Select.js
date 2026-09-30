"use client";

import { useId } from "react";

export function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  text,
  className = "",
  required = false,
  error,
  ...props
}) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col">
      {(label || text) && (
        <label htmlFor={selectId} className="mb-2 block text-sm text-gray-500">
          {label || text}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-gray-500 outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-gray-300 focus:border-[#555A8A] focus:ring-purple-100"
        } ${className}`}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
