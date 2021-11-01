export default (data, id) => {
  return data.find(item => parseInt(item?.id, 10) === parseInt(id, 10));
};
