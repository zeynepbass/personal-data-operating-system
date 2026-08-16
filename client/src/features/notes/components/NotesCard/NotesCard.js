export default function NotesCard({ note }) {
  return (
    <article className="flex-1">
      <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
        {note.category} / {note.subCategory}
      </span>

      {note?.sections?.map((section) => (
        <div key={section.id}>
          <section id={String(section.id)} className="mt-14">
            <h2 className="text-2xl font-semibold">{section.title}</h2>

            {section.content && (
              <div className="mt-5 rounded-xl border border-violet-200 bg-violet-50 p-6">
                <p className="text-slate-700">{section.content}</p>
              </div>
            )}

            {section.items?.length > 0 && (
              <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-600">
                {section.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </section>

          <hr className="my-10" />
        </div>
      ))}
    </article>
  );
}
