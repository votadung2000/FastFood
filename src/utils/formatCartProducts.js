export default item => {
  return {
    id: item?.id,
    name: item?.name,
    img: item?.img,
    taste: item?.taste,
    price: item?.price,
    group_type: item?.group_type,
    quantity: 1,
  };
};
