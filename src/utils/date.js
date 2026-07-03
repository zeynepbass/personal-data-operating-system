export const getRemainingMonthDates = (count = 12) => {
    const today = new Date();
  
    const format = (date) =>
      date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
  
    return Array.from({ length: count }, (_, index) => {
      const start =
        index === 0
          ? today
          : new Date(today.getFullYear(), today.getMonth() + index, 1);
  
      const end = new Date(
        start.getFullYear(),
        start.getMonth() + 1,
        0
      );
  
      return {
        value: `${start.toISOString().split("T")[0]}_${end
          .toISOString()
          .split("T")[0]}`,
        label: `${format(start)} - ${format(end)}`,
      };
    });
  };