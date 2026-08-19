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
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
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
        className={`w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-500 ${className}`}
        {...props}
      />
    </div>
  );
};