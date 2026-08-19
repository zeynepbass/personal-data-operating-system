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
  id: "",
  title: "",
  description: "",
  category: "",
  subCategory: "",

  sections: [],
};

export default function NotesModal({
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

  const handleSectionChange = (index, field, value) => {
    setForm((prev) => {
      const sections = [...prev.sections];

      sections[index] = {
        ...sections[index],
        [field]: value,
      };

      return {
        ...prev,
        sections,
      };
    });
  };


  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `section-${Date.now()}`,
          title: "",
          type: "text",
          content: "",
          language: "",
          items: [],
        },
      ],
    }));
  };


  const removeSection = (index) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter(
        (_, sectionIndex) => sectionIndex !== index
      ),
    }));
  };

  const addListItem = (sectionIndex) => {
    setForm((prev) => {
      const sections = [...prev.sections];

      sections[sectionIndex] = {
        ...sections[sectionIndex],
        items: [
          ...(sections[sectionIndex].items || []),
          "",
        ],
      };

      return {
        ...prev,
        sections,
      };
    });
  };

  const handleListItemChange = (
    sectionIndex,
    itemIndex,
    value
  ) => {
    setForm((prev) => {
      const sections = [...prev.sections];

      const items = [
        ...(sections[sectionIndex].items || []),
      ];

      items[itemIndex] = value;

      sections[sectionIndex] = {
        ...sections[sectionIndex],
        items,
      };

      return {
        ...prev,
        sections,
      };
    });
  };

  const removeListItem = (
    sectionIndex,
    itemIndex
  ) => {
    setForm((prev) => {
      const sections = [...prev.sections];

      sections[sectionIndex] = {
        ...sections[sectionIndex],
        items: sections[sectionIndex].items.filter(
          (_, index) => index !== itemIndex
        ),
      };

      return {
        ...prev,
        sections,
      };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCreating) return;

    const payload = {
      id: form.id.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      subCategory: form.subCategory.trim(),

      sections: form.sections.map((section) => ({
        id: section.id,
        title: section.title.trim(),
        type: section.type,
        content: section.content?.trim() || "",
        language:
          section.type === "code"
            ? section.language || null
            : null,

        items:
          section.type === "list"
            ? (section.items || []).filter(
                (item) => item.trim() !== ""
              )
            : [],
      })),
    };
    console.log(payload)
  

    onSubmit(payload);
  };


  const handleClose = () => {
    if (isCreating) return;

    setForm(initialForm);
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a22] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >


        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Yeni Not Oluştur
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Yeni bir not ve içerik bölümleri oluşturun.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isCreating}
            className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✕
          </button>
        </div>



        <div className="scrollbar-thin max-h-[75vh] overflow-y-auto p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6">
              <Heading title="Not Bilgileri" />

              <div className="mt-5 space-y-5">
                <Input
                  text="ID"
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                  placeholder="Örn. usememo"
                  required
                />

                <Input
                  text="Başlık"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Örn. useMemo Nedir?"
                  required
                />

                <Textarea
                  label="Açıklama"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Örn. React'te performans optimizasyonu için kullanılan Hook."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    text="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Örn. React"
                    required
                  />

                  <Input
                    text="Sub Category"
                    name="subCategory"
                    value={form.subCategory}
                    onChange={handleChange}
                    placeholder="Örn. Performance"
                    required
                  />
                </div>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* SECTIONS */}
            {/* -------------------------------- */}

            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <Heading title="Sections" />

                <Button
                  type="button"
                  text="+ Section Ekle"
                  onClick={addSection}
                  className="rounded-xl px-4 py-2 text-sm"
                />
              </div>

              <div className="mt-5 space-y-6">
                {form.sections.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-300 dark:border-white/15 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Henüz section eklenmedi.
                  </div>
                )}

                {form.sections.map(
                  (section, sectionIndex) => (
                    <div
                      key={section.id}
                      className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5"
                    >
                      {/* SECTION HEADER */}

                      <div className="mb-5 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                          Section {sectionIndex + 1}
                        </h3>

                        <button
                          type="button"
                          onClick={() =>
                            removeSection(sectionIndex)
                          }
                          className="rounded-lg px-3 py-1 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          Sil
                        </button>
                      </div>

                      <div className="space-y-5">
                        {/* TITLE */}

                        <Input
                          text="Section Başlığı"
                          value={section.title}
                          onChange={(e) =>
                            handleSectionChange(
                              sectionIndex,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Örn. Neden useMemo Kullanılır?"
                          required
                        />

                        {/* TYPE */}

                        <Select
                          text="Section Tipi"
                          value={section.type}
                          onChange={(e) =>
                            handleSectionChange(
                              sectionIndex,
                              "type",
                              e.target.value
                            )
                          }
                          options={[
                            {
                              value: "text",
                              label: "Text",
                            },
                            {
                              value: "code",
                              label: "Code",
                            },
                            {
                              value: "list",
                              label: "List",
                            },
                          ]}
                        />

                        {/* CODE LANGUAGE */}

                        {section.type === "code" && (
                          <Input
                            text="Programlama Dili"
                            value={section.language}
                            onChange={(e) =>
                              handleSectionChange(
                                sectionIndex,
                                "language",
                                e.target.value
                              )
                            }
                            placeholder="Örn. javascript"
                          />
                        )}

                        {/* CONTENT */}

                        {section.type !== "list" && (
                          <Textarea
                            label={
                              section.type === "code"
                                ? "Kod"
                                : "İçerik"
                            }
                            value={section.content}
                            onChange={(e) =>
                              handleSectionChange(
                                sectionIndex,
                                "content",
                                e.target.value
                              )
                            }
                            placeholder={
                              section.type === "code"
                                ? "const value = useMemo(...)"
                                : "Section içeriğini yazın..."
                            }
                          />
                        )}

                        {/* LIST */}

                        {section.type === "list" && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Liste Elemanları
                              </label>

                              <button
                                type="button"
                                onClick={() =>
                                  addListItem(
                                    sectionIndex
                                  )
                                }
                                className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300"
                              >
                                + Madde Ekle
                              </button>
                            </div>

                            {section.items?.map(
                              (
                                item,
                                itemIndex
                              ) => (
                                <div
                                  key={itemIndex}
                                  className="flex gap-2"
                                >
                                  <Input
                                    value={item}
                                    onChange={(e) =>
                                      handleListItemChange(
                                        sectionIndex,
                                        itemIndex,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Liste maddesi"
                                  />

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeListItem(
                                        sectionIndex,
                                        itemIndex
                                      )
                                    }
                                    className="rounded-lg px-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                                  >
                                    ✕
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* -------------------------------- */}
            {/* BUTTONS */}
            {/* -------------------------------- */}

            <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
              <Button
                type="button"
                variant="outline"
                text="İptal"
                onClick={handleClose}
                disabled={isCreating}
                className="rounded-xl px-6 py-3 hover:border-[rgb(125,120,206)] disabled:cursor-not-allowed disabled:opacity-50"
              />

              <Button
                type="submit"
                disabled={isCreating}
                text={
                  isCreating
                    ? "Oluşturuluyor..."
                    : "Notu Oluştur"
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