export const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

const toDateString = (date) => date.toISOString().split("T")[0];

export const getTomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return toDateString(date);
};

export const getWeekRange = () => {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    from: toDateString(monday),
    to: toDateString(sunday),
  };
};

export const getMonthRange = () => {
  const now = new Date();

  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    from: toDateString(first),
    to: toDateString(last),
  };
};

export const toDateTime = (dateString, timeString) => {
  if (!dateString) return null;

  const target = timeString
    ? new Date(`${dateString}T${timeString}`)
    : new Date(dateString);

  return Number.isNaN(target.getTime()) ? null : target;
};

export const isPastDateTime = (dateString, timeString) => {
  const target = toDateTime(dateString, timeString);

  return target ? target.getTime() < Date.now() : false;
};

export const getRelativeTime = (dateString, timeString) => {
  const target = toDateTime(dateString, timeString);

  if (!target) return null;

  const diffMs = target.getTime() - Date.now();
  const isPast = diffMs < 0;

  const minutes = Math.abs(Math.round(diffMs / 60000));
  const hours = Math.abs(Math.round(diffMs / 3600000));
  const days = Math.abs(Math.round(diffMs / 86400000));

  if (minutes < 1) return "Şimdi";

  let amount;

  if (minutes < 60) {
    amount = `${minutes} dakika`;
  } else if (hours < 24) {
    amount = `${hours} saat`;
  } else {
    amount = `${days} gün`;
  }

  return isPast ? `${amount} önce` : `${amount} sonra`;
};
