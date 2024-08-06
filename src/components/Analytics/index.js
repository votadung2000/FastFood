import analytics from '@react-native-firebase/analytics';

export const logAppOpen = async () => {
  await analytics().logAppOpen();
};

export const logViewItem = async data => {
  let body = [
    {
      item_id: JSON.stringify(data?.id),
      item_name: data?.name,
      item_category: JSON.stringify(data?.category_id),
    },
  ];
  await analytics().logViewItem({items: body});
  // await analytics().logEvent('logViewItem', {
  //   product_id: JSON.stringify(data?.id),
  //   product_name: data?.name,
  //   product_category: JSON.stringify(data?.category_id),
  // });
};

export const logAddToWishlist = async data => {
  let body = [
    {
      item_id: JSON.stringify(data?.id),
      item_name: data?.name,
      item_category: JSON.stringify(data?.category_id),
    },
  ];
  await analytics().logAddToWishlist({items: body});
};

export const logAddToCart = async data => {
  let body = [
    {
      item_id: JSON.stringify(data?.id),
      item_name: data?.name,
      item_category: JSON.stringify(data?.category_id),
    },
  ];
  await analytics().logAddToCart({items: body});
};
