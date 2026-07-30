export default function Button({
  text,
  className = "",
  ...props
})  {
  return (
    <button
      className={`
        bg-indigo-50

        rounded-xl
        py-3
        px-3
        font-semibold
       text-[#555A8A]
        transition
       hover:opacity-70
     
        ${className}
      `}
      {...props}
    >
      {text}
    </button>
  );
};