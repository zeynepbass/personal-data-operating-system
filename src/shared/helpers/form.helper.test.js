import { toast } from "react-hot-toast";
import { describe, expect, it, vi } from "vitest";

import { handleActionResult } from "./form.helper";

vi.mock("react-hot-toast", () => ({ toast: { error: vi.fn() } }));

const fakeForm = () => ({ setError: vi.fn() });

describe("handleActionResult", () => {
  it("passes successful results through", () => {
    const form = fakeForm();
    expect(handleActionResult(form, { ok: true, data: 1 })).toBe(true);
    expect(handleActionResult(form, undefined)).toBe(true);
    expect(form.setError).not.toHaveBeenCalled();
  });

  it("maps field errors and focuses the first one without an extra toast", () => {
    const form = fakeForm();
    const ok = handleActionResult(form, {
      ok: false,
      code: "VALIDATION",
      error: "x",
      fieldErrors: { email: ["Geçersiz"], password: ["Kısa"], empty: [] },
    });

    expect(ok).toBe(false);
    expect(form.setError).toHaveBeenNthCalledWith(
      1,
      "email",
      { type: "server", message: "Geçersiz" },
      { shouldFocus: true },
    );
    expect(form.setError).toHaveBeenNthCalledWith(
      2,
      "password",
      { type: "server", message: "Kısa" },
      { shouldFocus: false },
    );
    expect(form.setError).toHaveBeenCalledTimes(2);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("toasts non-field errors such as rate limiting", () => {
    handleActionResult(fakeForm(), { ok: false, code: "RATE_LIMITED", error: "Çok fazla deneme" });
    expect(toast.error).toHaveBeenCalledWith("Çok fazla deneme");
  });
});
