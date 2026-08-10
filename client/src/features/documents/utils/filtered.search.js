
export default function filteredData(data = [], search = "", filter = "new") {
  let result = [...data];

  if (search.trim()) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter === "new") {
    result.sort(
      (a, b) => b.date -a.date
    );
  }

  if (filter === "old") {
    result.sort(
      (a, b) => a.date - b.date
    );
  }

  return result;
}