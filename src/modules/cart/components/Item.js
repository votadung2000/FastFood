import React from 'react';
import {StyleSheet, View} from 'react-native';

import {resolutions} from '@utils';
import {Text} from '@components';
import {colors, fontSize} from '@constant';

const {scale} = resolutions;

const Item = ({label, value, bold}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.txt, styles.txtLeft]}>{label}</Text>
      <Text bold={bold} style={styles.txt}>{`${value} Đ`}</Text>
    </View>
  );
};

export default React.memo(Item);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(25),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(5),
  },
  txt: {
    fontSize: fontSize.fontSize16,
    color: colors.black,
  },
  txtLeft: {
    color: colors.gray,
  },
});
