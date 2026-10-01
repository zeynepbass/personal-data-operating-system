"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef } from "react";

const SIZES = {
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

export function Modal({ open, onClose, title, description, size = "md", busy = false, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  const requestClose = useCallback(() => {
    if (!busy) onClose();
  }, [busy, onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const closeOnBackdrop = (event) => {
      if (event.target === dialog) requestClose();
    };
    dialog.addEventListener("click", closeOnBackdrop);
    return () => dialog.removeEventListener("click", closeOnBackdrop);
  }, [requestClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-busy={busy}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      className={`m-auto w-[calc(100%-2rem)] ${SIZES[size]} overflow-hidden rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm`}
    >
      {open && (
        <div className="flex max-h-[90vh] flex-col">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-100 px-6 py-4">
            <div>
              <h2 id={titleId} className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
              {description && (
                <p id={descriptionId} className="mt-1 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={requestClose}
              disabled={busy}
              aria-label="Kapat"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-5">{children}</div>
        </div>
      )}
    </dialog>
  );
}
