"use client";

import { Button, Heading, Select, Input, Textarea } from "@/components/atoms";
import { FeedHeader } from "@/components/molecules";
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
          <FeedHeader
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
              <Heading title="Görev Bilgileri" />
              <div className="space-y-5">
                <Input
                  text="   Görev Başlığı"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="Örn. Dashboard tasarımını tamamla"
                  className="w-full h-[5vh] rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
                <Textarea
                  label="Açıklama"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Görev hakkında detaylı bilgi giriniz..."
                />
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
  <Heading title="Atama Bilgileri" />

  <div className="mt-5 grid grid-cols-1 items-center gap-5 md:grid-cols-2">
    <Input
      text="Etiket"
      type="text"
      name="label"
      value={form.label}
      onChange={handleChange}
      placeholder="Frontend"
     className=" w-full rounded-xl border text-gray-500 border-gray-300 p-2 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
    />

    <Select
      text="Atanan Kişi"
      name="assignee"
      value={form.assignee}
      onChange={handleChange}
      placeholder="Kullanıcı Seç"
      className="w-full"
      options={[
        { value: "Zeynep", label: "Zeynep" },
        { value: "Ahmet", label: "Ahmet" },
        { value: "Mehmet", label: "Mehmet" },
      ]}
    />
  </div>
</div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <Heading title="Görev Durumu" />
              <div className="grid grid-cols-2 gap-5">
                <Select
                  text="Öncelik"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  placeholder="Kullanıcı Seç"
                  options={[
                    { value: "Low", label: "🟢 Low" },
                    { value: "Medium", label: "🟡 Medium" },
                    { value: "High", label: "🟠 High" },
                    { value: "Critical", label: "🔴 Critical" },
                  ]}
                />

                <Select
                  name="status"
                  text="Durum"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border text-gray-200 border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  placeholder="Durum"
                  options={[
                    { value: "Todo", label: "🟣 Todo" },
                    { value: "In Progress", label: "🟠 In Progress" },
                    { value: "Review", label: "⚪ Review" },
                    { value: "Done", label: "🟢 Done" },
                  ]}
                />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Heading title="Planlama" />

              <div className="grid gap-2">
  
                  <Input
                    type="date"
                    text="Başlangıç Tarihi"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    placeholder="Tarih"
                    className="w-full  text-gray-500 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
           

                <Input
                  type="date"
                  text="Bitiş Tarihi"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  placeholder="Tarih"
                  className="w-full rounded-xl border text-gray-500 border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
         <Input
                  type="number"
                  text="Tahmini Süre (Saat)"
                  name="estimatedHours"
                  value={form.estimatedHours}
                  onChange={handleChange}
                  placeholder="8"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
</div>
  
       
   
            </div>

            <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
              <Button
                type="button"
                text="İptal"
                onClick={onClose}
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-100"
              />

              <Button
                type="submit"
                text="Görevi Oluştur"
                className="rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
