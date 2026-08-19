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
          ? "bg-violet-100 dark:bg-violet-400/15 font-semibold text-violet-700 dark:text-violet-300"
          : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5"
      }`}
    >
      {title}
    </button>
  );
}