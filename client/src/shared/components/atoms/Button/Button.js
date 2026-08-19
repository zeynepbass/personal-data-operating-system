const VARIANT_CLASSES = {
  default:
    "bg-[#555A8A] text-white hover:opacity-70 dark:bg-[#6f6bb3]",
  outline:
    "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/5",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  ghost:
    "bg-transparent hover:bg-gray-100 dark:hover:bg-white/10",
};

export function Button({
  text,
  className = "",
  variant = "default",
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
        ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.default}
        ${className}
      `}
      {...props}
    >
      {text}
    </button>
  );
};
