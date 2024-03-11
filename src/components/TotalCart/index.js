import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize, radius} from '@constant';
import {useStore} from '@context';

const {scale, wScale} = resolutions;

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
      <Text medium style={[styles.label, focused && styles.fcText]}>
        {data?.keyLabel}
      </Text>
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
    width: wScale(25),
    height: wScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 0 : scale(2),
  },
  label: {
    textAlign: 'center',
    fontSize: fontSize.small,
  },
  badge: {
    borderRadius: radius.radius14,
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
  fcText: {
    color: colors.orange,
  },
});

export default observer(TotalCart);
