export function documentAdapter(document) {
  return {
    id: document._id,
    name: document.name,
    type: document.type,
    size: document.size,
    date: document.date,
    icon: document.icon,
    color: document.color,
    pdf: document.pdf,
    favorite: document.favorite,
    shared: document.shared,
  };
}