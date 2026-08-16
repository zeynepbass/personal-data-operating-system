export function noteAdapter(note) {
  return {
    id: note._id,
    title: note.title,
    description: note.description,
    category: note.category,
    subCategory: note.subCategory,

    sections: (note.sections ?? []).map((section) => ({
      id: section.id,
      title: section.title,
      type: section.type,
      content: section.content ?? "",
      language: section.language ?? null,
      items: section.items ?? [],
    })),
  };
}