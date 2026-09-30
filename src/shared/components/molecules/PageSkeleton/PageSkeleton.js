export function PageSkeleton({ label = "Yükleniyor", cards = 3, rows = 4 }) {
  return (
    <div role="status" aria-live="polite" className="animate-pulse space-y-6">
      <span className="sr-only">{label}…</span>
      <div className="h-8 w-48 rounded-lg bg-gray-200" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {Array.from({ length: cards }, (_, index) => (
          <div key={`card-${index}`} className="h-28 rounded-2xl bg-gray-100" />
        ))}
      </div>
      <div className="space-y-3 rounded-2xl bg-white p-6">
        {Array.from({ length: rows }, (_, index) => (
          <div key={`row-${index}`} className="h-4 rounded bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
