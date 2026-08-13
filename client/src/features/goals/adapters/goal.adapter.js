
export function goalAdapter (goal) {

  return {
    id: goal._id,
    status: goal.status,
    category: goal.category,
    title: goal.title,
    progress: goal.progress ?? 0,
    color: goal.color ?? null,

    items: (goal.items ?? []).map((item) => ({
      title: item.title,
      value: item.value ?? 0,
    })),

    createdAt: goal.createdAt ?? null,
    updatedAt: goal.updatedAt ?? null,
  };
};
