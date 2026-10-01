/**
 * @param {Date} [date]
 * @returns {string}
 */
export const toLocalDay = (date = new Date()) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

export const getToday = () => toLocalDay();
