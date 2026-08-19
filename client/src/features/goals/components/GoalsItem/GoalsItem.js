import { Input } from "@/shared/components/atoms";
import { useState } from "react";
export default function GoalItem({
  title,
  value,
  selectedValue,
  onChange
}) {
  const [localValue, setLocalValue] = useState(value ?? 0);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);

    setLocalValue(newValue);


    onChange?.(newValue);
  };
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-4">
      <div className="h-4 w-4 rounded-full border-2 border-indigo-500" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-200">{title}</p>
      </div>

      {selectedValue ? (
        <Input
  type="text"
  min="0"
  max="100"
  value={localValue}
  onChange={handleChange}
  placeholder="0"
  className="w-20 text-center"
/>
      ) : (
        <div className="flex w-44 items-center gap-3">
          <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="w-10 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
            {value}%
          </span>
</div>
        
      )}
    </div>
  );
}
