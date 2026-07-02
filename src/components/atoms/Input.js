
"use client";

export const Input = ({
  type,
  name,
  value,
  label,
  onChange,
  placeholder,
  checked,
  className,
  ...props
}) => {
  return (
<>
   {label &&  <label className="mb-2 block text-sm text-gray-300">
   {label}
  </label>}
    <input
      type={type}
      name={name}
      checked={checked}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      {...props}
  
    />    </>
  );
};