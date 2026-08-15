export const getRemainingMonthDates = (count = 12) => {
  const today = new Date();

  const format = (date) =>
    date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return Array.from({ length: count }, (_, index) => {
    const start =
      index === 0
        ? new Date(today)
        : new Date(
            today.getFullYear(),
            today.getMonth() + index,
            1
          );

    const end = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      0
    );

    return {
      value: `${formatDate(start)}_${formatDate(end)}`,
      label: `${format(start)} - ${format(end)}`,
    };
  });
};