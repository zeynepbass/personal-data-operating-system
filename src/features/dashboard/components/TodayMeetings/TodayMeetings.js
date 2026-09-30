export default function TodayMeetings({ meetings }) {
  if (!meetings.length) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium text-slate-600">Bugün için toplantı yok</p>
          <p className="mt-2 text-sm italic text-slate-500">
            Takviminde planlanmış bir toplantı bulunmuyor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {meetings.map((item) => (
        <li
          key={item.id}
          className="flex overflow-hidden rounded-xl border border-slate-100 bg-slate-50 transition hover:border-indigo-100 hover:bg-white hover:shadow-sm"
        >
          <span className="flex min-w-20 items-center justify-center bg-purple-400 px-3 text-sm font-bold text-white">
            {item.meeting || "—"}
          </span>
          <div className="min-w-0 flex-1 px-4 py-3">
            <p className="truncate font-semibold text-slate-700">{item.title}</p>
            {item.meetingDetails && (
              <p className="mt-1 truncate text-xs text-slate-500">{item.meetingDetails}</p>
            )}
          </div>
          <span className="m-3 shrink-0 self-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            {item.tasks.length} görev
          </span>
        </li>
      ))}
    </ul>
  );
}
