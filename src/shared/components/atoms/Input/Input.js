"use client";

import { useId } from "react";

export function Input({
  id,
  type,
  name,
  value,
  label,
  disabled,
  onChange,
  placeholder,
  text,
  checked,
  className,
  required = false,
  error,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col">
      {(label || text) && (
        <label htmlFor={inputId} className="mb-2 block text-sm text-gray-500">
          {label || text}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        name={name}
        required={required}
        checked={checked}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full resize-none rounded-xl border text-gray-500 bg-gray-50 px-4 py-3 outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-gray-300 focus:border-[#555A8A] focus:ring-purple-100"
        } ${className}`}
        disabled={disabled}
        {...props}
      />
      {error && (
        <span id={errorId} role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
