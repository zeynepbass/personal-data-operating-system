"use client";

export function Select  ({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  className
})  {
  return (
<div className="flex flex-col">

{label && (
  <label className="mb-2 block text-sm text-gray-500">
    {label }
  </label>
)}
    <select
      name={name}
      value={value}
      required
      onChange={onChange}
      className={`
        w-full
        resize-none
        rounded-xl
        border
        text-gray-500
        border-gray-300
        bg-gray-50
        px-4
        py-3
        outline-none
        transition
        focus:border-[#555A8A]
        focus:ring-2
        focus:ring-purple-100
        ${className}
      `}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>    </div>
  );
};