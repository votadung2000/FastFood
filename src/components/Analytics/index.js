import analytics from '@react-native-firebase/analytics';

export const logAppOpen = async () => {
  await analytics().logAppOpen();
};

export const logViewItem = async data => {
  let body = {
    product_id: JSON.stringify(data?.id),
    product_name: data?.name,
    product_category: JSON.stringify(data?.category_id),
  };

  await analytics().logEvent('logViewItem', body);
};

export const logAddToWishlist = async data => {
  let body = {
    product_id: JSON.stringify(data?.id),
    product_name: data?.name,
    product_category: JSON.stringify(data?.category_id),
  };

  await analytics().logEvent('logAddToWishlist', body);
};

export const logAddToCart = async data => {
  let body = {
    product_id: JSON.stringify(data?.id),
    product_name: data?.name,
    product_category: JSON.stringify(data?.category_id),
  };

  await analytics().logEvent('logAddToCart', body);
};
