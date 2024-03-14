import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Text, Button, ChangeQuantity, FastImage} from '@components';
import {colors, fontSize, radius} from '@constant';
import {formatCurrency} from '@utils';
import {useStore} from '@context';
import {scale} from '@resolutions';

const CardCart = ({data}) => {
  const {
    cartProductsStore: {plusProducts, minusProducts, removeProducts},
  } = useStore();

  const handleRemove = item => {
    removeProducts(item);
  };

  const handlePlus = item => {
    plusProducts(item);
  };

  const handleMinus = item => {
    minusProducts(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.vwImg}>
        <FastImage isPath source={{uri: data?.image?.url}} style={styles.img} />
      </View>
      <View style={styles.bodyItem}>
        <View style={styles.headerItem}>
          <Text bold>{data?.name}</Text>
          <Button onPress={() => handleRemove(data)} style={styles.remove}>
            <MaterialCommunityIcons
              name="delete-sweep"
              color={colors.graySystem2}
              size={24}
            />
          </Button>
        </View>
        <View style={styles.headerItem}>
          <ChangeQuantity
            quantity={data?.quantity}
            handlePlus={() => handlePlus(data)}
            handleMinus={() => handleMinus(data)}
          />
          <View>
            <Text bold style={styles.priceItem}>{`${formatCurrency(
              data?.price,
            )} Đ`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    paddingVertical: scale(8),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: radius.radius14,
  },
  vwImg: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: scale(60),
    height: scale(60),
  },
  bodyItem: {
    flexDirection: 'column',
    width: '76%',
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: scale(6),
    alignItems: 'center',
  },
  remove: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceItem: {
    fontSize: fontSize.fontSize14,
  },
});

export default observer(CardCart);
