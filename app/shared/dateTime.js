export const getFormattedDate = (dateString) => {
  if (!dateString) return null;
  date = new Date(dateString);
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  return `${putZeroIfRequires(dateDate)}-${putZeroIfRequires(
    dateMonth
  )}-${date.getFullYear()}`;
};

export const getFormattedTime = (dateString) => {
  if (!dateString) return null;
  date = new Date(dateString);
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  return `${putZeroIfRequires(dateHours)}:${putZeroIfRequires(dateMinutes)}`;
};

const putZeroIfRequires = (number) => {
  return number < 10 ? "0" + number : number
}