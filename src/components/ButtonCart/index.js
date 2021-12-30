import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text} from '../../components';
import {scale, wScale} from '../../utils/resolutions';
import {colors, fontSize} from '../../constant';
import {useStore} from '../../context';

const formatCount = value => {
  if (value && parseInt(value, 10) > 9) {
    return '9+';
  }
  return value;
};

const ButtonCart = ({focused}) => {
  const {
    cartProductsStore: {cartProducts},
  } = useStore();

  return (
    <View style={styles.container}>
      <Ionicons
        name="cart"
        size={scale(22)}
        color={focused ? colors.orange : colors.gray}
      />
      <Text
        bold={focused ? true : false}
        color={focused ? colors.orange : colors.gray}
        style={styles.label}>
        {'Cart'}
      </Text>
      {cartProducts?.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.counter}>
            {`${formatCount(cartProducts.length)}`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default observer(ButtonCart);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: fontSize.tiny,
    paddingBottom: scale(4),
  },
  badge: {
    borderRadius: scale(13),
    width: wScale(13),
    height: wScale(13),
    backgroundColor: colors.orange,
    position: 'absolute',
    top: -scale(5),
    left: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: fontSize.smaller,
    color: colors.white,
  },
});
