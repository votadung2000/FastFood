import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFastImage from 'react-native-fast-image';

import {Text, Button, ChangeQuantity, FastImage} from '@components';
import {colors, fontSize, radius} from '@constant';
import {formatCurrency} from '@utils';
import {useStore} from '@context';
import {scale, wScale} from '@resolutions';

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
      <FastImage
        isPath
        source={{uri: data?.image?.url}}
        style={styles.img}
        resizeMode={RNFastImage.resizeMode.stretch}
      />
      <View style={styles.bodyItem}>
        <View style={styles.headerItem}>
          <Text bold>{data?.name}</Text>
          <Button onPress={() => handleRemove(data)} style={styles.remove}>
            <MaterialCommunityIcons
              name="delete-sweep"
              color={colors.red_FF3600}
              size={scale(24)}
            />
          </Button>
        </View>
        <View style={styles.headerItem}>
          <View>
            <Text bold style={styles.priceItem}>
              {`${formatCurrency(data?.price)} `}
              <Text bold style={styles.unit}>
                {'Đ'}
              </Text>
            </Text>
          </View>
          <ChangeQuantity
            quantity={data?.quantity}
            handlePlus={() => handlePlus(data)}
            handleMinus={() => handleMinus(data)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
    marginBottom: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
    backgroundColor: colors.white,
    borderRadius: radius.radius14,
    ...radius.shadow,
  },
  vwImg: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  img: {
    width: wScale(82),
    height: wScale(82),
    borderRadius: radius.radius14,
  },
  bodyItem: {
    flexGrow: 1,
    marginLeft: scale(20),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remove: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceItem: {
    fontSize: fontSize.big,
  },
  unit: {
    color: colors.orange_FE724C,
  },
});

export default observer(CardCart);
