const DateFormatter = date => {
  return new Date(date).toUTCString().slice(4, 22);
};

export default DateFormatter;
