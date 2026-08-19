
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
  <label className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
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
      className={`w-full resize-none rounded-xl border border-gray-300 text-gray-700 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:ring-[#555A8A]/30 ${className}`}
      disabled={disabled}

      {...props}
  
    />    </div>
  );
};