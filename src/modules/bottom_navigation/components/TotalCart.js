import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '@components';
import {colors, fontSize, radius} from '@constant';
import {useStore} from '@context';
import {scale, wScale} from '@resolutions';

const formatCount = value => {
  if (value && parseInt(value, 10) > 9) {
    return '9+';
  }
  return value;
};

const TotalCart = ({focused, data}) => {
  const {
    cartProductsStore: {cartProducts},
  } = useStore();

  return (
    <View>
      <View style={styles.vwIconViewTab}>
        {focused ? data?.IconFocused : data?.Icon}
      </View>
      {cartProducts?.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.counter}>
            {`${formatCount(cartProducts?.length)}`}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  vwIconViewTab: {
    width: wScale(28),
    height: wScale(28),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 0 : scale(2),
  },
  label: {
    textAlign: 'center',
    fontSize: fontSize.small,
  },
  badge: {
    position: 'absolute',
    width: wScale(16),
    height: wScale(16),
    top: -scale(16),
    right: -scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.radius4,
    backgroundColor: colors.yellow_FFC529,
  },
  counter: {
    fontSize: fontSize.smaller,
    color: colors.white,
  },
  fcText: {
    color: colors.orange,
  },
});

export default observer(TotalCart);