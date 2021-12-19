export default (idPr, heartProducts) => {
  return heartProducts.find(pr => pr?.id === idPr);
};
