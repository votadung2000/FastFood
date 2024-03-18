import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFastImage from 'react-native-fast-image';

import {Text, Button, FastImage} from '@components';
import {colors, fontSize, radius} from '@constant';
import {formatCurrency} from '@utils';
import {useStore} from '@context';
import {scale} from '@resolutions';
import routes from '@routes';

const {width} = Dimensions.get('window');

const CardProducts = ({data}) => {
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

  return (
    <Button onPress={() => handleProduct()} style={styles.container}>
      <FastImage
        isPath
        source={{uri: data?.image?.url}}
        style={styles.img}
        resizeMode={RNFastImage.resizeMode.stretch}
      />
      <View style={styles.content}>
        <Text bold style={styles.name}>
          {data?.name}
        </Text>
        <Text style={styles.txtTaste}>{data?.taste}</Text>
      </View>
      <View style={styles.footer}>
        <Text bold style={styles.price}>
          {`${formatCurrency(data?.price)} Đ`}
        </Text>
        <Button onPress={handlePlusCart} style={styles.plus}>
          <AntDesign name="plus" size={scale(18)} color={colors.white} />
        </Button>
      </View>
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
  },
  img: {
    width: width / 2.4,
    height: scale(120),
    borderRadius: radius.radius14,
  },
  name: {
    fontSize: fontSize.fontSize16,
  },
  txtTaste: {
    marginTop: scale(6),
    fontSize: fontSize.small,
    color: colors.gray,
  },
  content: {
    width: '100%',
    marginTop: scale(15),
    paddingHorizontal: scale(15),
  },
  footer: {
    marginTop: scale(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    flex: 1,
    marginLeft: scale(15),
    textAlign: 'auto',
    fontSize: fontSize.big,
  },
  plus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderBottomEndRadius: radius.radius14,
    borderTopStartRadius: radius.radius14,
    paddingVertical: scale(10),
    backgroundColor: colors.orange_FE724C,
  },
});

export default observer(CardProducts);
