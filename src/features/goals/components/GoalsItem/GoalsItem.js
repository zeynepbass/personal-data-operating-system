import { Input } from "@/shared/components/atoms";

export default function GoalItem({ title, value, isEditing, onChange }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4">
      <span aria-hidden="true" className="h-4 w-4 rounded-full border-2 border-indigo-500" />

      <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700">{title}</p>

      {isEditing ? (
        <Input
          type="number"
          min="0"
          max="100"
          aria-label={`${title} ilerlemesi`}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-20 text-center"
        />
      ) : (
        <div className="flex w-44 items-center gap-3">
          <div
            role="progressbar"
            aria-label={title}
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 flex-1 rounded-full bg-gray-100"
          >
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="w-10 text-right text-sm font-semibold text-gray-600">{value}%</span>
        </div>
      )}
    </div>
  );
}
