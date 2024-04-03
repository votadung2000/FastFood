import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFastImage from 'react-native-fast-image';

import {Text, Button, FastImage} from '@components';
import {colors, fontSize, radius} from '@constant';
import {formatCurrency} from '@utils';
import {useStore} from '@context';
import {hScale, wScale, scale} from '@resolutions';
import routes from '@routes';

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

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return (
      <Button onPress={handleProduct} style={styles.card}>
        <FastImage
          isPath
          style={styles.img}
          source={{uri: item?.image?.url}}
          resizeMode={RNFastImage.resizeMode.stretch}
        />
        <View style={styles.content}>
          <Text bold style={styles.name}>
            {item?.name}
          </Text>
          <Text style={styles.txtTaste}>{item?.taste || ''}</Text>
        </View>
        <View style={styles.footer}>
          <Text bold style={styles.price}>
            {`${formatCurrency(item?.price)} Đ`}
          </Text>
          <Button style={styles.plus} onPress={() => handlePlusCart(item)}>
            <AntDesign name="plus" size={scale(18)} color={colors.white} />
          </Button>
        </View>
      </Button>
    );
  };

  return (
    <FlatList
      horizontal
      data={data?.products}
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      bounces={false}
      contentContainerStyle={styles.ccSt}
    />
  );
};

const styles = StyleSheet.create({
  ccSt: {
    padding: scale(1),
  },
  card: {
    marginRight: scale(15),
    backgroundColor: colors.white,
    borderRadius: radius.radius14,
    ...radius.shadow,
  },
  img: {
    width: wScale(266),
    height: hScale(136),
    backgroundColor: colors.white,
    borderRadius: radius.radius14,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(15),
    marginTop: scale(15),
  },
  name: {
    fontSize: fontSize.fontSize16,
  },
  txtTaste: {
    marginTop: scale(6),
    fontSize: fontSize.small,
    color: colors.gray,
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
