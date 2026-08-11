"use client";

export function Select  ({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
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
      onChange={onChange}
      className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100 "
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