const DateFormatter = date => {
  return new Date(date).toUTCString().slice(4, 16);
};

export default DateFormatter;
