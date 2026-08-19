export function goalCategoryAdapter(category) {
  return {
    id: category._id,
    name: category.name,
  };
};
