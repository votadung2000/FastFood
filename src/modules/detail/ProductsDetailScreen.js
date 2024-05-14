import React, {useState} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {observer} from 'mobx-react';
// import _uniqBy from 'lodash/uniqBy';

import {
  Text,
  Back,
  Button,
  FastImage,
  Notifer,
  ModalLoading,
  LoadingComponent,
} from '@components';
import {useStore} from '@context';
import {formatCurrency} from '@utils';

// import {ListExtraFood} from './components';
import styles from './styles';

const ProductsDetailScreen = () => {
  const {
    // productsDetailStore: {extraFood, productDetail},
    cartProductsStore: {fetchCartProduct},
    favoritesStore: {fetchApiCDFavorite},
    productsStore: {product, fetchApiDetailProducts},
    userStore: {user},
  } = useStore();

  const [loading, setLoading] = useState({isVisible: false});
  // const [extra, setExtra] = useState(null);

  const handleFavorite = async () => {
    setLoading({isVisible: true});
    try {
      let body = {
        user_id: user?.id,
        product_id: product?.id,
      };

      let response = await fetchApiCDFavorite(body);
      if (response) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            Notifer({
              alertType: 'success',
              title: product.is_favorite
                ? 'Delete Favorites Successfully!'
                : 'Create Favorites Successfully!',
            });
            await fetchApiDetailProducts(product?.id);
          },
        });
      }
    } catch ({response}) {
      setLoading({isVisible: false});
      if (!response) {
        Notifer({
          alertType: 'warn',
          title: 'Please check your network connection',
        });
      } else {
        Notifer({
          alertType: 'error',
          title: response?.data?.message || '',
        });
      }
    }
  };

  const handlePlusCart = () => {
    fetchCartProduct(product);
  };

  // const handleExtraFood = item => {
  //   if (extra && extra.length > 0) {
  //     if (findId(extra, item?.id)) {
  //       const newData = extra.filter(ext => ext?.id !== item?.id);
  //       setExtra(newData);
  //     } else {
  //       setExtra(_uniqBy([...extra, item], 'id'));
  //     }
  //   } else {
  //     setExtra([item]);
  //   }
  // };

  if (!product) {
    return (
      <View style={styles.layout}>
        <Back heart />
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.layout}>
      <ScrollView
        bounces={false}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{right: 1}}>
        <View style={styles.container}>
          <Back
            heart
            isFavorite={product?.is_favorite}
            handleFavorite={handleFavorite}
          />
          <View style={styles.header}>
            <FastImage
              isPath
              source={{uri: product?.image?.url}}
              style={styles.img}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.headerContent}>
              <Text bold style={styles.txtTitle}>
                {product?.name || ''}
              </Text>
              <Text bold style={[styles.txtTitle, styles.price]}>
                {`${formatCurrency(product?.price)} Đ`}
              </Text>
            </View>
            <Text style={styles.txtContent}>{product?.taste || ''}</Text>
            {/* <ListExtraFood
              data={extraFood}
              handleExtraFood={handleExtraFood}
              extra={extra}
            /> */}
            <Text style={styles.txtContent}>{product?.description || ''}</Text>
          </View>
        </View>
      </ScrollView>
      <Button onPress={handlePlusCart} style={styles.plus}>
        <View style={styles.vwImg}>
          <Image source={require('@images/cart.png')} style={styles.imgCart} />
        </View>
        <Text style={styles.txtAdd}>{'ADD TO CART'}</Text>
      </Button>
      <ModalLoading {...loading} />
    </View>
  );
};

export default observer(ProductsDetailScreen);
