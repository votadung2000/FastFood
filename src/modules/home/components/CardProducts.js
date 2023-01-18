import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text, Button, FastImage} from '@components';
import {colors, fontSize} from '@constant';
import {resolutions, formatCurrency} from '@utils';
import {useStore} from '@context';
import routes from '@routes';

const {width} = Dimensions.get('window');
const {scale} = resolutions;

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
      <FastImage source={{uri: data?.image}} style={styles.img} />
      <View style={styles.content}>
        <Text bold style={[styles.txtItem, styles.txtName]}>
          {data?.name}
        </Text>
        <Text style={[styles.txtItem, styles.txtTaste]}>{data?.taste}</Text>
        <Text bold style={styles.txtItem}>
          {`${formatCurrency(data?.price)} Đ`}
        </Text>
      </View>
      <Button onPress={() => handlePlusCart()} style={styles.plus}>
        <AntDesign name="pluscircle" size={scale(26)} color={colors.orange} />
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
    borderRadius: scale(15),
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
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
  },
});

export default observer(CardProducts);
