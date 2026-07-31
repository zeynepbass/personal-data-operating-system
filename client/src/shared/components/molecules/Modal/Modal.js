"use client";

 import Button from "@/shared/components/atoms/Button";
 import Input from "@/shared/components/atoms/Input";
 import  Select  from "@/shared/components/atoms/Select";;
 import Textarea from "@/shared/components/atoms/Textarea";
import {  Heading} from "@/shared/components/molecules";
export const Modal = ({
  open,
  setOpen,
  onSubmit,
  handleChange,
  form,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <Heading
            title="Yeni Görev"
            description="Projeye yeni bir görev oluşturun."
          />

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <Heading title="Belge Bilgileri" />

              <div className="mt-5 space-y-5">
                <Input
                  text="Belge Adı"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="Örn. System Design.pdf"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100"
                />

                <Textarea
                  label="Açıklama"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Belge hakkında kısa bir açıklama..."
                />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Heading title="Dosya Bilgileri" />

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                  text="Etiket"
                  type="text"
                  name="label"
                  value={form.label}
                  onChange={handleChange}
                  placeholder="Frontend"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#555A8A] focus:ring-2 focus:ring-purple-100"
                />

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
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <Heading title="Belge Ayarları" />

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
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
                onClick={onClose}
                className="rounded-xl border border-gray-200
                 bg-white px-6 py-3 font-medium
                      text-gray-800
                   transition-all duration-200
                    hover:border-[#555A8A]
                     hover:bg-gray-50
                hover:text-gray-400
               "
              />
              <Button type="submit" text="Belgeyi Yükle" className=" hover:text-white" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
