export const Button = ({
  text,
  className = "",
  ...props
}) => {
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
       hover:bg-[#555A8A]
     
        ${className}
      `}
      {...props}
    >
      {text}
    </button>
  );
};