const variantClasses = {
  primary: "bg-[#555A8A] text-white hover:opacity-90",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  outline:
    "border border-gray-200 bg-white text-gray-800 hover:border-[rgb(125,120,206)] hover:bg-gray-50",
  ghost: "bg-transparent text-gray-500 hover:text-[rgb(125,120,206)]",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

export function Button({
  text,
  variant = "primary",
  className = "",
  ...props
})  {
  return (
    <button
      className={`
        rounded-xl
        py-3
        px-3
        font-semibold
        transition
        ${variantClasses[variant] ?? variantClasses.primary}
        ${className}
      `}
      {...props}
    >
      {text}
    </button>
  );
};
