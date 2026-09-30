export default function filteredData(data = [], search = "", filter = "new") {
  const query = search.trim().toLocaleLowerCase("tr-TR");
  const result = query
    ? data.filter((item) => item.name.toLocaleLowerCase("tr-TR").includes(query))
    : [...data];

  const direction = filter === "old" ? 1 : -1;
  return result.sort((a, b) => direction * a.createdAt.localeCompare(b.createdAt));
}
