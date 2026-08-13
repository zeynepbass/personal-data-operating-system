
"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Heading,
  Select,
  Textarea,
} from "@/shared/components/atoms";

const initialForm = {

  name: "",
  title: "",
  color: "",
  meeting: "",
  meetingCalendar: "",
  meetingDetails: "",


  taskTitle: "",
  description: "",
  label: "",
  priority: "",
  date: "",
  startDate: "",
  dueDate: "",
  estimatedHours: "",
  storyPoints: "",
};
export default function TaskModal({
  open,
  setOpen,
  onSubmit,
  isCreating,
}) {
  const [form, setForm] = useState(initialForm);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCreating) return;
    const colorMap = {
      todo: "bg-green-50",
      done: "bg-orange-50",
      "in-progress": "bg-purple-50",
    };
    
    const payload = {

      name: form.name.trim(),
      title: form.title.trim(),
      color: colorMap[form.name?.toLowerCase()] ?? "gray",
      meeting: form.meeting.trim(),
      meetingCalendar: form.meetingCalendar || null,
      meetingDetails: form.meetingDetails.trim(),


      tasks: [
        {
          title: form.taskTitle.trim(),
          description: form.description.trim(),
          label: form.label.trim(),
          priority: form.priority,
          date: form.date || null,
          startDate: form.startDate || null,
          dueDate: form.dueDate || null,
          estimatedHours: Number(form.estimatedHours) || 0,
          storyPoints: Number(form.storyPoints) || 0,
        },
      ],
    };


    onSubmit(payload);
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
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Yeni Kolon Oluştur
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Yeni bir görev kolonu ve meeting bilgileri oluşturun.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isCreating}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✕
          </button>
        </div>


        <div className="max-h-[75vh] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <Heading title="Kolon Bilgileri" />

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Select
                  text="Başlık"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Örn. Todo"
                  options={[
                    {
                      value: "Todo",
                      label: "Todo",
                    },
                    {
                      value: "in-progress",
                      label: "In Progress",
                    },
              
                    {
                      value: "Done",
                      label: "Done",
                    },
                  ]}
                />

                <Select
                  text="Kolon Adı"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Örn. todo"
                  options={[
                    {
                      value: "todo",
                      label: "todo",
                    },
                    {
                      value: "progress",
                      label: "progress",
                    },
           
                    {
                      value: "done",
                      label: "done",
                    },
                  ]}
                />

    
              </div>
            </div>


            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Heading title="Meeting Bilgileri" />

              <div className="mt-5 space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    text="Meeting Saati"
                    name="meeting"
                    type="time"
                    value={form.meeting}
                    onChange={handleChange}
                    placeholder="Örn. 10:00"
                  />

                  <Input
                    text="Meeting Tarihi"
                    name="meetingCalendar"
                    type="date"
                    value={form.meetingCalendar}
                    onChange={handleChange}
                  />
                </div>

                <Textarea
                  label="Meeting Detayı"
                  name="meetingDetails"
                  value={form.meetingDetails}
                  onChange={handleChange}
                  placeholder="Örn. Team Lead daily"
                />
              </div>
            </div>

               <div className="rounded-xl border border-gray-200 bg-white p-6">
                 <Heading title="İlk Görev Bilgileri" />
     
                 <div className="mt-5 space-y-5">
                   <Input
                     text="Görev Başlığı"
                     name="taskTitle"
                     value={form.taskTitle}
                     onChange={handleChange}
                     type="text"
                     placeholder="Örn. Authentication ekranı tasarlanacak"
                     required
                   />
     
                   <Textarea
                     label="Görev Açıklaması"
                     name="description"
                     value={form.description}
                     onChange={handleChange}
                     placeholder="Örn. Login ve Register sayfalarının UI geliştirmesi."
                   />
                 </div>
               </div>
     

               <div className="rounded-xl border border-gray-200 bg-white p-6">
                 <Heading title="Görev Detayları" />
     
                 <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
                   <Input
                     text="Etiket"
                     type="text"
                     name="label"
                     value={form.label}
                     onChange={handleChange}
                     placeholder="Örn. Frontend"
                   />
     
                   <Select
                     text="Öncelik"
                     name="priority"
                     value={form.priority}
                     onChange={handleChange}
                     placeholder="Görev önceliğini seçin"
                     options={[
                       {
                         value: "Low",
                         label: "🟢 Low",
                       },
                       {
                         value: "Medium",
                         label: "🟡 Medium",
                       },
                       {
                         value: "High",
                         label: "🔴 High",
                       },
                     ]}
                   />
     
                   <Input
                     text="Görev Tarihi"
                     type="date"
                     name="date"
                     value={form.date}
                     onChange={handleChange}
                   />
     
                   <Input
                     text="Başlangıç Tarihi"
                     type="date"
                     name="startDate"
                     value={form.startDate}
                     onChange={handleChange}
                   />
     
                   <Input
                     text="Son Teslim Tarihi"
                     type="date"
                     name="dueDate"
                     value={form.dueDate}
                     onChange={handleChange}
                   />
     
                   <Input
                     text="Tahmini Süre (Saat)"
                     type="number"
                     name="estimatedHours"
                     value={form.estimatedHours}
                     onChange={handleChange}
                     placeholder="Örn. 8"
                     min="0"
                   />
     
                   <Input
                     text="Story Point"
                     type="number"
                     name="storyPoints"
                     value={form.storyPoints}
                     onChange={handleChange}
                     placeholder="Örn. 5"
                     min="0"
                   />
                 </div>
               </div>
     
 
               <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                 <Button
                   type="button"
                   text="İptal"
                   onClick={handleClose}
                   disabled={isCreating}
                   className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-800 transition hover:border-[rgb(125,120,206)] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                 />
     
                 <Button
                   type="submit"
                   disabled={isCreating}
                   text={
                     isCreating
                       ? "Oluşturuluyor..."
                       : "Kolon ve Görevi Oluştur"
                   }
                   className="rounded-xl bg-[#555A8A] px-6 py-3 text-gray-50 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                 />
               </div>
          </form>
        </div>
      </div>
    </div>
  );
}

