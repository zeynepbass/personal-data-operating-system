const SUBTITLES = { day: "Son 7 gün", month: "Bu ay", year: "Bu yıl" };

export default function ActivityChart({ data, duration }) {
  const max = Math.max(...data.map((item) => item.count), 1);

  return (
    <figure className="mt-8">
      <figcaption className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">Aktivite</span>
        <span className="text-xs text-slate-400">{SUBTITLES[duration]}</span>
      </figcaption>

      <div className="overflow-x-auto">
        <ul className="flex min-w-105 items-end justify-between gap-3 px-2 pt-4">
          {data.map((item) => {
            const height = item.count === 0 ? 8 : Math.max((item.count / max) * 100, 15);
            return (
              <li
                key={item.label}
                aria-label={`${item.label}: ${item.count} görev`}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-purple-400">{item.count}</span>
                <span
                  aria-hidden="true"
                  className="block w-6 rounded-t-lg bg-purple-300 transition-all"
                  style={{ height: `${height}px` }}
                />
                <span className="text-xs font-medium text-slate-500">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}
