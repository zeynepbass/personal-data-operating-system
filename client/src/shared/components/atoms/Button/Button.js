export function Button({
  text,
  className = "",
  ...props
})  {
  return (
    <button
      className={`
 bg-[#555A8A] 
        rounded-xl
        py-3
        px-3
        font-semibold
       
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