"use client";

import { useState } from "react";
import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";
import Heading from "@/shared/components/atoms/Heading";
import Select from "@/shared/components/atoms/Select";

const initialForm = {
  name: "",
  type: "",
  color: "",
  shared: false,
  file: null,
};

export default function Modal({
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
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = form.file;

    const document = {
      id: crypto.randomUUID(),
      name: form.name,
      type: form.type,
      size: file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "0 MB",
      date: new Date().toLocaleDateString("tr-TR"),
      icon: form.type,
      color: form.color,
      favorite: false,
      shared: form.shared === "true",
    };

    onSubmit(document);
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
        className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
  
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <Heading title="Yeni Belge" />
            <p className="mt-1 text-sm text-gray-500">
              Projeye yeni bir belge oluşturun.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            ✕
          </button>
        </div>


        <div className="max-h-[75vh] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <Heading title="Belge Bilgileri" />

              <div className="mt-5 space-y-5">
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


            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Heading title="Dosya Bilgileri" />

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Select
                  text="Belge Türü"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  placeholder="Belge Türü"
                  options={[
                    { value: "pdf", label: "📄 PDF" },
                    { value: "doc", label: "📝 Word" },
                    { value: "ppt", label: "📊 PowerPoint" },
                    { value: "image", label: "🖼️ Resim" },
                    { value: "json", label: "💻 JSON" },
                    { value: "zip", label: "🗂️ ZIP" },
                  ]}
                />

                <Select
                  text="Renk"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  placeholder="Renk"
                  options={[
                    { value: "red", label: "🔴 Kırmızı" },
                    { value: "blue", label: "🔵 Mavi" },
                    { value: "green", label: "🟢 Yeşil" },
                    { value: "orange", label: "🟠 Turuncu" },
                    { value: "purple", label: "🟣 Mor" },
                    { value: "gray", label: "⚪ Gri" },
                  ]}
                />
              </div>
            </div>


            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <Heading title="Belge Ayarları" />

              <div className="mt-5">
                <Select
                  text="Paylaşım"
                  name="shared"
                  value={String(form.shared)}
                  onChange={handleChange}
                  placeholder="Paylaşım"
                  options={[
                    { value: "false", label: "🔒 Özel" },
                    { value: "true", label: "🌍 Paylaşıldı" },
                  ]}
                />
              </div>
            </div>


            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Heading title="Dosya Yükleme" />

              <div className="mt-5">
                <Input
                  text="PDF / Belge Seç"
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.json,.zip"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-dashed border-gray-300 p-4"
                />
              </div>
            </div>


            <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
              <Button
                type="button"
                text="İptal"
                onClick={handleClose}
                disabled={isCreating}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-800 transition-all duration-200 hover:border-[#555A8A] hover:bg-gray-50"
              />

              <Button
                type="submit"
                disabled={isCreating}
                text={isCreating ? "Kaydediliyor..." : "Belgeyi Yükle"}
                className="hover:text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}