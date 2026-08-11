"use client";

export function Input({
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
}) {
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
        {...(type !== "file" && { value })}
        checked={checked}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}