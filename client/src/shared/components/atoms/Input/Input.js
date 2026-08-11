
"use client";

export function Input  ({
  type,
  name,
  value,
  label,
  disabled,
  onChange,
  placeholder,
  defaultChecked,
  text,
  checked,
  className,
  ...props
})  {
  return (
<div className="flex flex-col">
{(label || text) && (
  <label className="mb-2 block text-sm text-gray-500">
    {label || text}
  </label>
)}

    <input
      type={type}
      name={name}

      checked={checked}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100 ${className}`}
      disabled={disabled}

      {...props}
  
    />    </div>
  );
};