export default function NotesNavbar({ note }) {
  if (!note) {
    return null;
  }

  return (
    <div className="sticky top-24 rounded-2xl bg-white dark:bg-[#1a1a22] p-6 shadow-md">
      <h3 className="mb-5 font-semibold text-gray-900 dark:text-gray-100">
        Bu Sayfada
      </h3>

      <nav className="space-y-3 text-sm">
        {note.sections?.map((section) => (
          <a
          key={section.id}
          href={`#${section.id}`}
            className="block text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  );
}