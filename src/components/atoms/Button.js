export const Button = ({ text }) => {
  return (
    <button className="bg-indigo-50 h-10 hover:bg-indigo-400 hover:text-white text-indigo-700 font-bold g py-2 px-4 border border-none  rounded">
    {text}
  </button>
  );
};
