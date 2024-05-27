export default number => {
  if (!number) {
    return;
  }

  if (number > 9) {
    return number;
  }

  return `0${number}`;
};
