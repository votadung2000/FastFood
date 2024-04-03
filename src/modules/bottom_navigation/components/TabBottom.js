import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {scale, wScale} from '@resolutions';

const TabBottom = ({data, focused}) => {
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
});

export default TabBottom;
