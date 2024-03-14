import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text, Button, FastImage} from '@components';
import {colors, fontSize, radius} from '@constant';
import {resolutions, formatCurrency} from '@utils';
import {useStore} from '@context';
import routes from '@routes';

const {width} = Dimensions.get('window');
const {scale} = resolutions;

const CardProducts = ({data}) => {
  const navigation = useNavigation();

  const {
    productsStore: {fetchApiDetailProducts},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  const handleProduct = () => {
    fetchApiDetailProducts(data?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const handlePlusCart = () => {
    fetchCartProduct(data);
  };

  return (
    <Button onPress={() => handleProduct()} style={styles.container}>
      <FastImage isPath style={styles.img} source={{uri: data?.image?.url}} />
      <View style={styles.content}>
        <Text bold style={[styles.txtItem, styles.txtName]}>
          {data?.name || ''}
        </Text>
        <Text style={[styles.txtItem, styles.txtTaste]}>
          {data?.taste || ''}
        </Text>
        <Text bold style={styles.txtItem}>
          {`${formatCurrency(data?.price)} Đ`}
        </Text>
      </View>
      <Button onPress={() => handlePlusCart()} style={styles.plus}>
        <AntDesign name="plus" size={scale(18)} color={colors.white} />
      </Button>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(25),
    marginTop: scale(5),
    backgroundColor: colors.white,
    borderRadius: radius.radius14,
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
    width: scale(80),
    height: scale(80),
  },
  content: {
    width: '100%',
    marginTop: scale(25),
  },
  txtItem: {
    textAlign: 'auto',
    fontSize: fontSize.fontSize14,
    marginBottom: scale(6),
  },
  txtName: {
    fontSize: fontSize.fontSize16,
    textAlign: 'center',
  },
  txtTaste: {
    fontSize: fontSize.small,
    color: colors.gray,
  },
  plus: {
    width: '50%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: radius.radius14,
    borderTopStartRadius: radius.radius14,
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
    backgroundColor: colors.orange_FE724C,
  },
});

export default observer(CardProducts);
