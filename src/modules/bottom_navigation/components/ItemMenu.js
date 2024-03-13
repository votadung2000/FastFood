import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@components';
import {scale, wScale} from '@resolutions';

const ItemMenu = ({Icon, label, isEnd}) => {
  return (
    <View style={[styles.container, isEnd && styles.vwEnd]}>
      <View style={styles.img}>{Icon && Icon}</View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(35),
  },
  vwEnd: {
    marginBottom: 0,
  },
  img: {
    width: wScale(25),
    height: wScale(25),
    justifyContent: 'center',
  },
  label: {
    marginLeft: scale(8),
  },
});

export default ItemMenu;
