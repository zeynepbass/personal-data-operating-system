
"use client";

export default function Input  ({
  type,
  name,
  value,
  label,
  disabled,
  onChange,
  placeholder,
  defaultChecked,
  checked,
  className,
  ...props
})  {
  return (
<>
   {label &&  <label className="mb-2 block text-sm text-gray-500">
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
      disabled={disabled}
      defaultChecked={!disabled} 
      {...props}
  
    />    </>
  );
};