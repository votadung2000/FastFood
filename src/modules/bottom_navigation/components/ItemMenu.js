import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Text} from '@components';
import {scale, wScale} from '@resolutions';
import {colors, fontSize, radius} from '@constant';

const ItemMenu = ({isEnd, count, label, Icon, onPress}) => {
  return (
    <Button style={[styles.container, isEnd && styles.vwEnd]} onPress={onPress}>
      <View style={styles.img}>{Icon && Icon}</View>
      <Text style={styles.label}>{label}</Text>
      {!!count && (
        <View style={styles.badge}>
          <Text medium style={styles.counter}>
            {count}
          </Text>
        </View>
      )}
    </Button>
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
  badge: {
    width: wScale(20),
    height: wScale(20),
    marginLeft: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.radius4,
    backgroundColor: colors.orange_FE724C,
  },
  counter: {
    fontSize: fontSize.small,
    color: colors.white,
  },
});

export default ItemMenu;
