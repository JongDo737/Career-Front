export function dateParse(dateTimeString) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function dateTimeParse(dateTimeString) {
  const date = dateParse(dateTimeString.split("T")[0]);
  const time = dateTimeString.split("T")[1];
  const withoutSecond = time.slice(0, -3);
  return date + " " + withoutSecond;
}

export function timeParse(dateTimeString) {
  const time = dateTimeString.split("T")[1];
  const withoutSecond = time.slice(0, -3);
  return withoutSecond;
}
