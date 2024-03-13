import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {colors, fontSize} from '@constant';
import {TotalCart} from '@components';
import {scale, wScale} from '@resolutions';
import routes from '@routes';

const TabBottom = ({data, focused}) => {
  if (data?.name === routes.CartScreen) {
    return <TotalCart focused={focused} data={data} />;
  }

  return (
    <View style={styles.containerViewTab}>
      <View style={styles.vwIconViewTab}>
        {focused ? data?.IconFocused : data?.Icon}
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
  txtLabelTB: {
    textAlign: 'center',
    fontSize: fontSize.small,
  },
  txtLabelTBFocused: {
    color: colors.orange,
  },
});

export default TabBottom;
