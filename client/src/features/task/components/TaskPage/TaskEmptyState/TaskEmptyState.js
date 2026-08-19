import { ClipboardList, SearchX } from "lucide-react";

export default function TaskEmptyState({ hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-white/5 px-6 py-12 text-center">
      {hasFilters ? (
        <SearchX size={28} className="text-gray-400 dark:text-gray-500" />
      ) : (
        <ClipboardList size={28} className="text-gray-400 dark:text-gray-500" />
      )}

      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {hasFilters
          ? "Filtrenize uygun kayıt bulunamadı."
          : "Aktif göreviniz yok."}
      </p>

      {hasFilters && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Farklı bir filtre deneyin veya filtreleri temizleyin.
        </p>
      )}
    </div>
  );
}
