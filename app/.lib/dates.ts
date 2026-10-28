const convertDateToRfc3339 = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset() * 60_000;

  const result = new Date(date);
  result.setMilliseconds(result.getMilliseconds() - timezoneOffset);

  return result.toISOString().split("T")[0];
};

const getTodaysDate = () => {
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);
  return todaysDate;
};

const getPreviousDaysDate = (date: number | string | Date) => {
  const previousDaysDate = new Date(date);
  previousDaysDate.setDate(previousDaysDate.getDate() - 1);
  return previousDaysDate;
};

const getNextDaysDate = (date: number | string | Date) => {
  const nextDaysDate = new Date(date);
  nextDaysDate.setDate(nextDaysDate.getDate() + 1);
  return nextDaysDate;
};

export const getTodaysDateRfc3339 = () => {
  return convertDateToRfc3339(getTodaysDate());
};

export const getPreviousDaysDateRfc3339 = (date: number | string | Date) => {
  return convertDateToRfc3339(getPreviousDaysDate(date));
};

export const getNextDaysDateRfc3339 = (date: number | string | Date) => {
  return convertDateToRfc3339(getNextDaysDate(date));
};
