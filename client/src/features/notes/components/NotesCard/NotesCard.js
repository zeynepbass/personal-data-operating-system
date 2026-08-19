

export default function NotesCard({ note }) {
  return (

    <article className="flex-1 bg-white dark:bg-[#1a1a22] p-4 rounded-2xl">
      <span className="rounded-full bg-violet-100 dark:bg-violet-400/15 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300">
        {note.category} / {note.subCategory}
      </span>

      {note?.sections?.map((section) => (
        <div key={section.id}>
          <section id={String(section.id)} className="mt-14">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{section.title}</h2>

            {section.content && (
              <div className="mt-5 rounded-xl border border-violet-200 dark:border-violet-400/20 bg-violet-50 dark:bg-violet-400/10 p-6">
                <p className="text-slate-700 dark:text-slate-300">{section.content}</p>
              </div>
            )}

            {section.items?.length > 0 && (
              <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-600 dark:text-slate-400">
                {section.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </section>

          <hr className="my-10 border-gray-200 dark:border-white/10" />
        </div>
      ))}
    </article>

  );
}
