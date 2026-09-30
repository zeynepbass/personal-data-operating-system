import { expect, test } from "@playwright/test";

import { waitForResetLink } from "./helpers/mailpit";

const unique = Date.now();
const account = {
  fullName: "E2E Kullanıcı",
  email: `e2e-${unique}@example.com`,
  password: "e2e-initial-pass",
  newPassword: "e2e-rotated-pass",
};

async function logout(page) {
  await page.getByRole("button", { name: /e2e kullanıcı/i }).click();
  await page.getByRole("button", { name: "Çıkış Yap" }).click();
  await expect(page).toHaveURL(/\/login/);
}

async function login(page, password) {
  await page.goto("/login");
  await page.getByLabel("E-posta adresi").fill(account.email);
  await page.getByLabel("Şifre", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Giriş Yap" }).click();
}

test.describe.configure({ mode: "serial" });

test("protected pages redirect to login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login\?next=%2Fdashboard/);
});

test("register, logout and log back in", async ({ page }) => {
  await page.goto("/register");
  await page.getByLabel("Ad soyad").fill(account.fullName);
  await page.getByLabel("E-posta adresi").fill(account.email);
  await page.getByLabel("Şifre", { exact: true }).fill(account.password);
  await page.getByLabel("Şifre tekrarı").fill(account.password);
  await page.getByRole("button", { name: "Kayıt Ol" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  const cookies = await page.context().cookies();
  const session = cookies.find((cookie) => cookie.name.endsWith("pdos_session"));
  expect(session?.httpOnly).toBe(true);

  const storage = await page.evaluate(() => JSON.stringify(window.localStorage));
  expect(storage).not.toContain(account.email);

  await logout(page);
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login/);

  await login(page, account.password);
  await expect(page).toHaveURL(/\/dashboard/);
  await logout(page);
});

test("wrong password shows a generic error", async ({ page }) => {
  await login(page, "definitely-wrong");
  await expect(page.getByText("E-posta veya şifre hatalı.")).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});

test("password reset by email", async ({ page }) => {
  await page.goto("/forgot-password");
  await page.getByLabel("E-posta adresi").fill(account.email);
  await page.getByRole("button", { name: "Sıfırlama Bağlantısı Gönder" }).click();
  await expect(page.getByRole("status")).toContainText("şifre sıfırlama bağlantısı gönderildi");

  const link = await waitForResetLink(account.email);
  await page.goto(new URL(link).pathname);
  await page.getByLabel("Yeni şifre", { exact: true }).fill(account.newPassword);
  await page.getByLabel("Yeni şifre tekrarı").fill(account.newPassword);
  await page.getByRole("button", { name: "Şifreyi Güncelle" }).click();

  await expect(page).toHaveURL(/\/login\?reset=1/);

  await page.goto(new URL(link).pathname);
  await page.getByLabel("Yeni şifre", { exact: true }).fill("another-pass-123");
  await page.getByLabel("Yeni şifre tekrarı").fill("another-pass-123");
  await page.getByRole("button", { name: "Şifreyi Güncelle" }).click();
  await expect(page.getByText(/geçersiz veya süresi dolmuş/)).toBeVisible();

  await login(page, account.password);
  await expect(page.getByText("E-posta veya şifre hatalı.")).toBeVisible();

  await login(page, account.newPassword);
  await expect(page).toHaveURL(/\/dashboard/);
});
