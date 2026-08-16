export default function NotesMenuList({
  title,
  isActive,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
        isActive
          ? "bg-violet-100 font-semibold text-violet-700"
          : "text-slate-600 hover:bg-gray-100"
      }`}
    >
      {title}
    </button>
  );
}