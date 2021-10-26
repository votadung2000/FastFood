export default price => {
  if (price) {
    return Number(price)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  return 0;
};
