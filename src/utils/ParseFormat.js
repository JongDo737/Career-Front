export const dateParse = (dateTimeString) => {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export const dateToStringParse = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  // console.log(`${year}${month}${day}`);
  return `${year}${month}${day}`;
};

export const StringToDateParse = (dateString) => {
  const hypenDate = `${dateString.slice(0, 4)}-${dateString.slice(
    4,
    6
  )}-${dateString.slice(6, 8)}`;
  return new Date(hypenDate);
};

export const dateTimeParse = (dateTimeString) => {
  const date = dateParse(dateTimeString.split("T")[0]);
  const time = dateTimeString.split("T")[1];
  const withoutSecond = time.slice(0, -3);
  return date + " " + withoutSecond;
};

export const timeParse = (dateTimeString) => {
  const time = dateTimeString.split("T")[1];
  const withoutSecond = time.slice(0, -3);
  return withoutSecond;
};

export const birthHypenParse = (birth) => {
  return `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`;
};

export const birthOnlyNumberParse = (birth) => {
  return birth.replace(/-/g, "");
};

export const phoneNumberParse = (phoneNumber) => {
  if (phoneNumber.length === 4 && phoneNumber[3] !== "-")
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 4)}`;
  else if (phoneNumber.length === 9 && phoneNumber[8] !== "-")
    return `${phoneNumber.slice(0, 8)}-${phoneNumber.slice(8, 9)}`;
  else return phoneNumber;
};

export const jsonParse = (data) => {
  return JSON.stringify(data);
};

export const middleNameParse = (name) => {
  return name.substring(0, 1) + "*" + name.substring(2);
};
