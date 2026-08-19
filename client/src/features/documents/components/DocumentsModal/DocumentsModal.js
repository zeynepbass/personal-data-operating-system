"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Heading,
  Select
} from "@/shared/components/atoms";

const initialForm = {
  name: "",
  type: "",
  color: "",
  shared: "false",
  pdf: null,
};

export default function DocumentsModal({
  open,
  setOpen,
  isCreating,
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pdf = form.pdf;

    if (!pdf) {
      return;
    }

    const formData = new FormData();

    formData.append("id", crypto.randomUUID());
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append(
      "size",
      `${(pdf.size / 1024 / 1024).toFixed(2)} MB`
    );
    formData.append(
      "date",
      new Date().toLocaleDateString("tr-TR")
    );
    formData.append("icon", "pdf");
    formData.append("color", form.color);
    formData.append("favorite", "false");
    formData.append("shared", form.shared);
    formData.append("pdf", pdf);

    onSubmit(formData);
  };

  const handleClose = () => {
    if (isCreating) return;

    setForm(initialForm);
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#1a1a22] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 p-6">
          <div>
            <Heading title="Yeni Belge" />

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Projeye yeni bir belge oluşturun.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isCreating}
            className="rounded-lg p-2 text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-white/10"
          >
            ✕
          </button>
        </div>


        <div className="scrollbar-thin max-h-[75vh] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <Heading title="Belge Bilgileri" />

              <div className="mt-5">
                <Input
                  text="Belge Adı"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Örn. System Design.pdf"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100"
                />
              </div>
            </div>


            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <Heading title="Dosya Bilgileri" />

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Select
                  text="Belge Türü"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  placeholder="Belge Türü"
                  options={[
                    {
                      value: "pdf",
                      label: "📄 PDF",
                    },
                  ]}
                />

                <Select
                  text="Renk"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  placeholder="Renk"
                  options={[
                    {
                      value: "red",
                      label: "🔴 Kırmızı",
                    },
                    {
                      value: "blue",
                      label: "🔵 Mavi",
                    },
                    {
                      value: "green",
                      label: "🟢 Yeşil",
                    },
                    {
                      value: "orange",
                      label: "🟠 Turuncu",
                    },
                    {
                      value: "purple",
                      label: "🟣 Mor",
                    },
                    {
                      value: "gray",
                      label: "⚪ Gri",
                    },
                  ]}
                />
              </div>
            </div>


            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <Heading title="Belge Ayarları" />

              <div className="mt-5">
                <Select
                  text="Paylaşım"
                  name="shared"
                  value={form.shared}
                  onChange={handleChange}
                  placeholder="Paylaşım"
                  options={[
                    {
                      value: "false",
                      label: "🔒 Özel",
                    },
                    {
                      value: "true",
                      label: "🌍 Paylaşıldı",
                    },
                  ]}
                />
              </div>
            </div>


            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <Heading title="Dosya Yükleme" />

              <div className="mt-5">
                <Input
                  text="PDF Seç"
                  type="file"
                  name="pdf"
                  accept="application/pdf,.pdf"
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-dashed text-gray-500 dark:text-gray-400 border-gray-300 dark:border-white/15 p-4"
                />
              </div>

              {form.pdf && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Seçilen dosya:{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {form.pdf.name}
                  </span>
                </p>
              )}
            </div>


            <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
              <Button
                type="button"
                variant="outline"
                text="İptal"
                onClick={handleClose}
                disabled={isCreating}
                className="rounded-xl px-6 py-3 hover:border-[rgb(125,120,206)] disabled:cursor-not-allowed disabled:opacity-60"
              />

              <Button
                type="submit"
                disabled={isCreating || !form.pdf}
                text={
                  isCreating
                    ? "Kaydediliyor..."
                    : "Belgeyi Yükle"
                }
                className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}