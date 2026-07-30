"use client";

export default function Textarea({
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
    <div>
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
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100 ${className}`}
        {...props}
      />
    </div>
  );
};