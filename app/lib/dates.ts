export const getTodaysDateRfc3339 = () => {
  return convertDateToRfc3339(getTodaysDate());
};

export const getTodaysDate = () => {
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);
  return todaysDate;
};

export const convertDateToRfc3339 = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset() * 60_000;

  const result = new Date(date);
  result.setMilliseconds(result.getMilliseconds() - timezoneOffset);

  return result.toISOString().split("T")[0];
};
