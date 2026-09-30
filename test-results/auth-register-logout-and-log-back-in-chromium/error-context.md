# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> register, logout and log back in
- Location: e2e/auth.spec.js:33:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /e2e kullanıcı/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - heading "This page couldn’t load" [level=1] [ref=e6]
    - paragraph [ref=e7]: A server error occurred. Reload to try again.
    - button "Reload" [ref=e10] [cursor=pointer]
  - paragraph [ref=e11]: ERROR 1221662747
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | import { waitForResetLink } from "./helpers/mailpit";
  4  | 
  5  | const unique = Date.now();
  6  | const account = {
  7  |   fullName: "E2E Kullanıcı",
  8  |   email: `e2e-${unique}@example.com`,
  9  |   password: "e2e-initial-pass",
  10 |   newPassword: "e2e-rotated-pass",
  11 | };
  12 | 
  13 | async function logout(page) {
> 14 |   await page.getByRole("button", { name: /e2e kullanıcı/i }).click();
     |                                                              ^ Error: locator.click: Test timeout of 30000ms exceeded.
  15 |   await page.getByRole("button", { name: "Çıkış Yap" }).click();
  16 |   await expect(page).toHaveURL(/\/login/);
  17 | }
  18 | 
  19 | async function login(page, password) {
  20 |   await page.goto("/login");
  21 |   await page.getByLabel("E-posta adresi").fill(account.email);
  22 |   await page.getByLabel("Şifre", { exact: true }).fill(password);
  23 |   await page.getByRole("button", { name: "Giriş Yap" }).click();
  24 | }
  25 | 
  26 | test.describe.configure({ mode: "serial" });
  27 | 
  28 | test("protected pages redirect to login", async ({ page }) => {
  29 |   await page.goto("/dashboard");
  30 |   await expect(page).toHaveURL(/\/login\?next=%2Fdashboard/);
  31 | });
  32 | 
  33 | test("register, logout and log back in", async ({ page }) => {
  34 |   await page.goto("/register");
  35 |   await page.getByLabel("Ad soyad").fill(account.fullName);
  36 |   await page.getByLabel("E-posta adresi").fill(account.email);
  37 |   await page.getByLabel("Şifre", { exact: true }).fill(account.password);
  38 |   await page.getByLabel("Şifre tekrarı").fill(account.password);
  39 |   await page.getByRole("button", { name: "Kayıt Ol" }).click();
  40 | 
  41 |   await expect(page).toHaveURL(/\/dashboard/);
  42 |   const cookies = await page.context().cookies();
  43 |   const session = cookies.find((cookie) => cookie.name.endsWith("pdos_session"));
  44 |   expect(session?.httpOnly).toBe(true);
  45 | 
  46 |   const storage = await page.evaluate(() => JSON.stringify(window.localStorage));
  47 |   expect(storage).not.toContain(account.email);
  48 | 
  49 |   await logout(page);
  50 |   await page.goto("/dashboard");
  51 |   await expect(page).toHaveURL(/\/login/);
  52 | 
  53 |   await login(page, account.password);
  54 |   await expect(page).toHaveURL(/\/dashboard/);
  55 |   await logout(page);
  56 | });
  57 | 
  58 | test("wrong password shows a generic error", async ({ page }) => {
  59 |   await login(page, "definitely-wrong");
  60 |   await expect(page.getByText("E-posta veya şifre hatalı.")).toBeVisible();
  61 |   await expect(page).toHaveURL(/\/login/);
  62 | });
  63 | 
  64 | test("password reset by email", async ({ page }) => {
  65 |   await page.goto("/forgot-password");
  66 |   await page.getByLabel("E-posta adresi").fill(account.email);
  67 |   await page.getByRole("button", { name: "Sıfırlama Bağlantısı Gönder" }).click();
  68 |   await expect(page.getByRole("status")).toContainText("şifre sıfırlama bağlantısı gönderildi");
  69 | 
  70 |   const link = await waitForResetLink(account.email);
  71 |   await page.goto(new URL(link).pathname);
  72 |   await page.getByLabel("Yeni şifre", { exact: true }).fill(account.newPassword);
  73 |   await page.getByLabel("Yeni şifre tekrarı").fill(account.newPassword);
  74 |   await page.getByRole("button", { name: "Şifreyi Güncelle" }).click();
  75 | 
  76 |   await expect(page).toHaveURL(/\/login\?reset=1/);
  77 | 
  78 |   await page.goto(new URL(link).pathname);
  79 |   await page.getByLabel("Yeni şifre", { exact: true }).fill("another-pass-123");
  80 |   await page.getByLabel("Yeni şifre tekrarı").fill("another-pass-123");
  81 |   await page.getByRole("button", { name: "Şifreyi Güncelle" }).click();
  82 |   await expect(page.getByText(/geçersiz veya süresi dolmuş/)).toBeVisible();
  83 | 
  84 |   await login(page, account.password);
  85 |   await expect(page.getByText("E-posta veya şifre hatalı.")).toBeVisible();
  86 | 
  87 |   await login(page, account.newPassword);
  88 |   await expect(page).toHaveURL(/\/dashboard/);
  89 | });
  90 | 
```