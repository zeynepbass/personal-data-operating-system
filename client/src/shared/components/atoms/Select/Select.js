"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export function Select({
  name,
  value,
  onChange,
  options = [],
  placeholder,
  label,
  text,
  className,
  disabled,
  autoWidth,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  );

  const selectValue = (nextValue) => {
    setOpen(false);
    onChange?.({ target: { name, value: nextValue } });
  };

  return (
    <div className="flex flex-col" ref={containerRef}>
      {(label || text) && (
        <label className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
          {label || text}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
          {...props}
          className={`
            flex
            w-full
            items-center
            justify-between
            gap-2
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            px-4
            py-3
            text-left
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-[#555A8A]
            focus:ring-2
            focus:ring-purple-100
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:border-white/10
            dark:bg-white/5
            dark:text-gray-100
            dark:focus:ring-[#555A8A]/30
            ${className || ""}
          `}
        >
          <span
            className={
              selectedOption
                ? "truncate"
                : "truncate text-gray-400 dark:text-gray-500"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <ChevronDown
            size={16}
            className={`shrink-0 text-gray-400 dark:text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && !disabled && (
          <div
            className={`scrollbar-thin absolute left-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a22] py-1 shadow-lg ${
              autoWidth ? "w-max min-w-full" : "w-full"
            }`}
          >
            {options.length === 0 && (
              <p className="px-4 py-2.5 text-sm text-gray-400 dark:text-gray-500">
                Seçenek yok
              </p>
            )}

            {options.map((option) => {
              const isSelected =
                String(option.value) === String(value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectValue(option.value)}
                  className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-violet-50 dark:bg-violet-400/10 font-medium text-[#555A8A] dark:text-[#a5a1e8]"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  <span className={autoWidth ? "whitespace-nowrap" : "truncate"}>
                    {option.label}
                  </span>

                  {isSelected && (
                    <Check size={14} className="shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
