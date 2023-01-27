import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, Button, FastImage} from '@components';
import {colors, fontSize} from '@constant';
import {useStore} from '@context';
import {formatCurrency, limitedString, resolutions} from '@utils';
import routes from '@routes';

const {scale} = resolutions;

const CardFavorite = ({data}) => {
  const navigation = useNavigation();

  const {
    productsStore: {fetchApiDetailProducts},
  } = useStore();

  const handleProduct = () => {
    fetchApiDetailProducts(data?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const handlePlusCart = () => {
    // fetchCartProduct(item);
  };

  const handleRemoveHeart = () => {
    // addHeartProduct(item);
  };

  return (
    <Button onPress={() => handleProduct()} style={styles.container}>
      <FastImage source={{uri: data?.image}} style={styles.img} />
      <View style={styles.content}>
        <Text bold style={[styles.txtItem, styles.txtName]}>
          {limitedString(data?.name, 10)}
        </Text>
        <Text style={[styles.txtItem, styles.txtTaste]}>{data?.taste}</Text>
        <Text bold style={styles.txtItem}>{`${formatCurrency(
          data?.price,
        )} Đ`}</Text>
      </View>
      <View style={styles.footer}>
        <Button onPress={() => handleRemoveHeart()} style={styles.plus}>
          <Ionicons name={'heart'} size={scale(26)} color={colors.heart} />
        </Button>
        <Button onPress={() => handlePlusCart()} style={styles.plus}>
          <AntDesign name="pluscircle" size={scale(26)} color={colors.orange} />
        </Button>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
    backgroundColor: colors.white,
    borderRadius: scale(15),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  img: {
    width: scale(70),
    height: scale(70),
  },
  txtItem: {
    textAlign: 'auto',
    fontSize: fontSize.fontSize14,
  },
  content: {
    width: '50%',
    paddingHorizontal: scale(5),
  },
  txtTaste: {
    fontSize: fontSize.small,
    color: colors.gray,
    marginBottom: scale(6),
  },
  txtName: {
    fontSize: fontSize.fontSize16,
    marginBottom: scale(6),
  },
  plus: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
    zIndex: 999,
  },
  footer: {
    alignItems: 'center',
  },
});

export default observer(CardFavorite);
