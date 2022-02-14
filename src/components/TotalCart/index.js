import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '..';
import {scale, wScale} from '../../utils/resolutions';
import {colors, fontSize} from '../../constant';
import {useStore} from '../../context';

const formatCount = value => {
  if (value && parseInt(value, 10) > 9) {
    return '9+';
  }
  return value;
};

const TotalCart = ({focused}) => {
  const {
    cartProductsStore: {cartProducts},
  } = useStore();

  return (
    <View>
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

const styles = StyleSheet.create({
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
    top: -scale(30),
    left: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: fontSize.smaller,
    color: colors.white,
  },
});

export default observer(TotalCart);
