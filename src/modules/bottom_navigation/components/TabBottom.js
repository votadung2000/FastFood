import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '@components';
import {scale, wScale} from '@resolutions';
import {colors, fontSize, radius} from '@constant';
import {useStore} from '@context';
import routes from '@routes';

const formatCount = value => {
  if (value && parseInt(value, 10) > 9) {
    return '9+';
  }
  return value;
};

const TabBottom = ({data, focused}) => {
  const {
    cartProductsStore: {cartProducts},
  } = useStore();

  return (
    <View style={styles.containerViewTab}>
      <View style={styles.vwIconViewTab}>
        {focused ? data?.IconFocused : data?.Icon}
        {data?.name === routes.CartScreen && cartProducts?.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.counter}>
              {`${formatCount(cartProducts?.length)}`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerViewTab: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwIconViewTab: {
    width: wScale(28),
    height: wScale(28),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 0 : scale(2),
  },
  badge: {
    width: wScale(16),
    height: wScale(16),
    borderRadius: radius.radius6,
    backgroundColor: colors.orange_FE724C,
    position: 'absolute',
    top: -scale(12),
    right: -scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: fontSize.smaller,
    color: colors.white,
  },
});

export default observer(TabBottom);
