import { expect, test } from "@playwright/test";

import { E2E_ADMIN } from "./global-setup.mjs";
import { waitForResetLink } from "./helpers/mailpit";

const stamp = Date.now();
const member = {
  fullName: "Akış Kullanıcı",
  email: `flow-${stamp}@example.com`,
  password: "flow-initial-pass",
  newPassword: "flow-rotated-pass",
};
const taskTitle = `E2E görevi ${stamp}`;
const noteTitle = `E2E notu ${stamp}`;
const today = new Date().toISOString().slice(0, 10);

const PDF = Buffer.from(
  "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF",
);

async function login(page, email, password) {
  await page.goto("/login");
  await page.getByLabel("E-posta adresi").fill(email);
  await page.getByLabel("Şifre", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Giriş Yap" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

async function logout(page, fullName) {
  await page.getByRole("button", { name: new RegExp(fullName, "i") }).click();
  await page.getByRole("button", { name: "Çıkış Yap" }).click();
  await expect(page).toHaveURL(/\/login/);
}

test.describe.configure({ mode: "serial" });

test("register → note → task move → upload → password reset → logout", async ({ page }) => {
  await test.step("register", async () => {
    await page.goto("/register");
    await page.getByLabel("Ad soyad").fill(member.fullName);
    await page.getByLabel("E-posta adresi").fill(member.email);
    await page.getByLabel("Şifre", { exact: true }).fill(member.password);
    await page.getByLabel("Şifre tekrarı").fill(member.password);
    await page.getByRole("button", { name: "Kayıt Ol" }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    await logout(page, member.fullName);
  });

  await test.step("admin assigns a task", async () => {
    await login(page, E2E_ADMIN.email, E2E_ADMIN.password);
    await page.goto("/tasks");
    await page.getByRole("button", { name: "+ Yeni Görev" }).click();

    const dialog = page.getByRole("dialog", { name: "Yeni görev" });
    await dialog.getByLabel(/Toplantı başlığı/).fill("E2E toplantısı");
    await dialog.getByLabel(/Görev başlığı/).fill(taskTitle);
    await dialog.getByLabel(/Atanacak kullanıcı/).selectOption(member.email);
    await dialog.getByLabel("Görev tarihi").fill(today);
    await dialog.getByRole("button", { name: "Toplantı ve görevi oluştur" }).click();

    await expect(dialog).toBeHidden();
    await expect(page.getByText("Görev oluşturuldu.")).toBeVisible();
    await logout(page, E2E_ADMIN.fullName);
  });

  await test.step("log in and see the notification", async () => {
    await login(page, member.email, member.password);
    await expect(page.getByRole("button", { name: /Bildirimler \(1 okunmamış\)/ })).toBeVisible();
  });

  await test.step("create and edit a note", async () => {
    await page.getByRole("link", { name: "Notlar" }).click();
    await page.getByRole("button", { name: "+ Yeni not" }).click();

    const dialog = page.getByRole("dialog", { name: "Yeni not oluştur" });
    await dialog.getByLabel(/^Başlık/).fill(noteTitle);
    await dialog.getByLabel(/^Açıklama/).fill("Playwright ile oluşturuldu");
    await dialog.getByLabel(/^Kategori/).fill("Test");
    await dialog.getByLabel(/^Alt kategori/).fill("E2E");
    await dialog.getByRole("button", { name: "+ Bölüm ekle" }).click();
    await dialog.getByLabel("Bölüm başlığı").fill("Giriş");
    await dialog.getByLabel("İçerik").fill("İlk bölüm");
    await dialog.getByRole("button", { name: "Notu oluştur" }).click();
    await expect(dialog).toBeHidden();

    await expect(page.getByRole("heading", { name: "Giriş" })).toBeVisible();

    await page.getByRole("button", { name: "Notu düzenle" }).click();
    const editor = page.getByRole("dialog", { name: "Notu düzenle" });
    await editor.getByLabel("Bölüm başlığı").fill("Güncellenmiş giriş");
    await editor.getByRole("button", { name: "Değişiklikleri kaydet" }).click();
    await expect(page.getByRole("heading", { name: "Güncellenmiş giriş" })).toBeVisible();
  });

  await test.step("move the task to done on the kanban board", async () => {
    await page.getByRole("link", { name: "Görevler" }).click();
    await expect(page.getByText(taskTitle)).toBeVisible();
    await page.getByRole("button", { name: "Kanban", exact: true }).click();

    const card = page.locator("article", { hasText: taskTitle });
    await card.focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Space");

    const doneColumn = page.getByRole("region", { name: "Done sütunu" });
    await expect(doneColumn.getByText(taskTitle)).toBeVisible();
    await expect(page.getByRole("button", { name: "Bildirimler", exact: true })).toBeVisible();

    await page.reload();
    await page.getByRole("button", { name: "Kanban", exact: true }).click();
    await expect(
      page.getByRole("region", { name: "Done sütunu" }).getByText(taskTitle),
    ).toBeVisible();
  });

  await test.step("upload a document", async () => {
    await page.getByRole("link", { name: "Dökümanlar" }).click();
    await page.getByRole("button", { name: "+ Belge yükle" }).click();

    const dialog = page.getByRole("dialog", { name: "Yeni belge" });
    await dialog.getByLabel(/Belge adı/).fill("E2E raporu");
    await dialog.getByLabel(/PDF dosyası/).setInputFiles({
      name: "rapor.pdf",
      mimeType: "application/pdf",
      buffer: PDF,
    });
    await dialog.getByRole("button", { name: "Belgeyi yükle" }).click();

    await expect(dialog).toBeHidden();
    await expect(page.getByText("E2E raporu")).toBeVisible();

    const fileUrl = await page.evaluate(async () => {
      const response = await fetch("/api/documents");
      const { items } = await response.json();
      return items.find((item) => item.name === "E2E raporu")?.pdf;
    });
    const download = await page.request.get(fileUrl);
    expect(download.status()).toBe(200);
    expect(download.headers()["content-type"]).toBe("application/pdf");
  });

  await test.step("reset the password by email", async () => {
    await logout(page, member.fullName);
    await page.goto("/forgot-password");
    await page.getByLabel("E-posta adresi").fill(member.email);
    await page.getByRole("button", { name: "Sıfırlama Bağlantısı Gönder" }).click();
    await expect(page.getByRole("status")).toBeVisible();

    const link = await waitForResetLink(member.email);
    await page.goto(new URL(link).pathname);
    await page.getByLabel("Yeni şifre", { exact: true }).fill(member.newPassword);
    await page.getByLabel("Yeni şifre tekrarı").fill(member.newPassword);
    await page.getByRole("button", { name: "Şifreyi Güncelle" }).click();
    await expect(page).toHaveURL(/\/login\?reset=1/);
  });

  await test.step("log in with the new password and log out", async () => {
    await login(page, member.email, member.newPassword);
    await logout(page, member.fullName);
    await page.goto("/notes");
    await expect(page).toHaveURL(/\/login/);
  });
});

test("anonymous requests cannot download documents", async ({ page, request }) => {
  await login(page, member.email, member.newPassword);
  const fileUrl = await page.evaluate(async () => {
    const response = await fetch("/api/documents");
    const { items } = await response.json();
    return items[0]?.pdf;
  });
  expect(fileUrl).toMatch(/^\/api\/files\//);

  const anonymous = await request.get(fileUrl);
  expect(anonymous.status()).toBe(401);
});
