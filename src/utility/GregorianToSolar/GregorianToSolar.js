const GregorianToSolar = (date) => {
  const year = date && date.slice(0, 4);
  const month = date && date.slice(5, 7);
  const day = date && date.slice(8, 10);
  const newDate = new Date(year, month, day);
  return date && new Intl.DateTimeFormat("fa-IR").format(newDate);
};
export default GregorianToSolar;
