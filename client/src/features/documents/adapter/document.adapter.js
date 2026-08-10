export function documentAdapter(document) {
    return {
      id: document._id,
      name: document.name,
      type: document.type,
      size: document.size,
      date: document.date ?
      new Date(document.date).toISOString().split("T")[0] :
      null,
      icon: document.icon,
      color: document.color,
      favorite: document.favorite,
      shared: document.shared,
    };
  }