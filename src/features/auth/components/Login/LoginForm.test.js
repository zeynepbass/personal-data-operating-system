import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { loginAction } from "@/features/auth/actions/auth.actions";

import LoginForm from "./LoginForm";

vi.mock("@/features/auth/actions/auth.actions", () => ({ loginAction: vi.fn() }));
vi.mock("react-hot-toast", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

const fill = async (user, { email, password }) => {
  if (email) await user.type(screen.getByLabelText("E-posta adresi"), email);
  if (password) await user.type(screen.getByLabelText("Şifre", { exact: true }), password);
  await user.click(screen.getByRole("button", { name: "Giriş Yap" }));
};

beforeEach(() => {
  vi.mocked(loginAction).mockReset();
});

describe("LoginForm", () => {
  it("validates on the client before calling the server", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await fill(user, { email: "not-an-email" });

    expect(await screen.findByText("Geçerli bir e-posta adresi girin.")).toBeInTheDocument();
    expect(screen.getByText("Şifre gereklidir.")).toBeInTheDocument();
    expect(screen.getByLabelText("E-posta adresi")).toHaveAttribute("aria-invalid", "true");
    expect(loginAction).not.toHaveBeenCalled();
  });

  it("sends normalized values and the redirect target to the action", async () => {
    vi.mocked(loginAction).mockResolvedValue({ ok: true, data: {} });
    const user = userEvent.setup();
    render(<LoginForm next="/notes" />);

    await fill(user, { email: "  Ada@Example.com ", password: "secret-pass" });

    await waitFor(() =>
      expect(loginAction).toHaveBeenCalledWith({
        email: "ada@example.com",
        password: "secret-pass",
        next: "/notes",
      }),
    );
  });

  it("shows server-side field errors next to the fields", async () => {
    vi.mocked(loginAction).mockResolvedValue({
      ok: false,
      code: "VALIDATION",
      error: "Lütfen formdaki hataları düzeltin.",
      fieldErrors: { password: ["Şifre hatalı."] },
    });
    const user = userEvent.setup();
    render(<LoginForm />);

    await fill(user, { email: "ada@example.com", password: "wrong-pass" });

    expect(await screen.findByText("Şifre hatalı.")).toBeInTheDocument();
  });

  it("toggles password visibility accessibly", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const input = screen.getByLabelText("Şifre", { exact: true });
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Şifreyi göster" }));
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Şifreyi gizle" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("confirms a completed password reset", () => {
    render(<LoginForm resetDone />);
    expect(screen.getByRole("status")).toHaveTextContent("Şifreniz güncellendi");
  });
});
