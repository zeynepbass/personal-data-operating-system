import { toast } from "react-hot-toast";

/**
 * @param {import("react-hook-form").UseFormReturn<any>} form
 * @param {{ ok: boolean, error?: string, fieldErrors?: Record<string, string[] | undefined> } | undefined} result
 * @returns {boolean}
 */
export function handleActionResult(form, result) {
  if (!result || result.ok) return true;

  const entries = Object.entries(result.fieldErrors ?? {}).filter(
    ([, messages]) => messages?.length,
  );
  entries.forEach(([field, messages], index) => {
    form.setError(field, { type: "server", message: messages[0] }, { shouldFocus: index === 0 });
  });

  if (!entries.length || result.code !== "VALIDATION") toast.error(result.error);
  return false;
}
