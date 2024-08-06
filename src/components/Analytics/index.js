import analytics from '@react-native-firebase/analytics';

export const logAppOpen = async () => {
  await analytics().logAppOpen();
};

export const logViewItem = async data => {
  let body = {
    id: data?.id,
    name: data?.name,
    category_id: data?.category_id,
  };
  await analytics().logViewItem(body);
};

export const logAddToWishlist = async data => {
  let body = {
    id: data?.id,
    name: data?.name,
    category_id: data?.category_id,
  };
  await analytics().logAddToWishlist(body);
};

export const logAddToCart = async data => {
  let body = {
    id: data?.id,
    name: data?.name,
    category_id: data?.category_id,
  };
  await analytics().logAddToCart(body);
};
