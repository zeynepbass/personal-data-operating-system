"use client";

export function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  className = "",
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
        </label>
      )}

      <textarea
        id={name}
        required
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100 ${className}`}
        {...props}
      />
    </div>
  );
};