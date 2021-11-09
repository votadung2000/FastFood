export default (data, extra_id) => {
  return extra_id.map(id => data.find(item => item.id === id));
};
