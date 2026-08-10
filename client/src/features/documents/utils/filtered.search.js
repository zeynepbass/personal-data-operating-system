import {parseDate} from "@/shared/helpers/format.years"
export default function filteredData(data = [], search = "", filter = "new") {
  let result = [...data];

  if (search.trim()) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter === "new") {
    result.sort(
      (a, b) => parseDate(b.date) - parseDate(a.date)
    );
  }

  if (filter === "old") {
    result.sort(
      (a, b) => parseDate(a.date) - parseDate(b.date)
    );
  }

  return result;
}