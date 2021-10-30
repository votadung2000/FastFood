export default data => {
  if (data.length % 2 !== 0) {
    return [...data, {}];
  }
  return data;
};
