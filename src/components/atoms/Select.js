"use client";

export const Select = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
}) => {
  return (
    <>

{label &&  <label className="mb-2 block text-sm font-medium text-gray-200">
    {label}
   </label>}
   
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border text-gray-500 border-gray-300 p-2 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>    </>
  );
};