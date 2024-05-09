import React, {useState} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {observer} from 'mobx-react';
import RNFastImage from 'react-native-fast-image';
// import _uniqBy from 'lodash/uniqBy';

import {
  Text,
  Back,
  Button,
  FastImage,
  Popup,
  LoadingComponent,
} from '@components';
import {useStore} from '@context';
import {formatCurrency, handleHeart} from '@utils';
import routes from '@routes';

// import {ListExtraFood} from './components';
import styles from './styles';

const ProductsDetailScreen = ({navigation}) => {
  const {
    // productsDetailStore: {extraFood, productDetail},
    cartProductsStore: {fetchCartProduct},
    heartProductsStore: {allHeartProducts, addHeartProduct},
    productsStore: {product},
    userStore: {user},
  } = useStore();

  // const [extra, setExtra] = useState(null);
  const [popup, setPopup] = useState(null);

  const handleFavorite = () => {
    if (user) {
      addHeartProduct(product);
    } else {
      setPopup({
        title: 'Attention',
        accept: 'Accept',
        content:
          'You need to login before adding products to favorites.\nSign in now!',
        handleAccept: handleAccept,
        handleCancel: handleCancel,
      });
    }
  };

  const handlePlusCart = () => {
    if (user) {
      fetchCartProduct(product);
    } else {
      setPopup({
        title: 'Attention',
        accept: 'Accept',
        content:
          'You need to login before adding products to cart.\nSign in now!',
        handleAccept: handleAccept,
        handleCancel: handleCancel,
      });
    }
  };

  const handleAccept = () => {
    setPopup(null);
    navigation.navigate(routes.LoginScreen);
  };

  const handleCancel = () => {
    setPopup(null);
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
            favorite={handleHeart(product?.id, allHeartProducts)}
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
      <Popup isVisible={Boolean(popup)} {...popup} />
    </View>
  );
};

export default observer(ProductsDetailScreen);
