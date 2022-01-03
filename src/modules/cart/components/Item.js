import React from 'react';
import {StyleSheet, View} from 'react-native';

import {scale} from '../../../utils/resolutions';
import {Text} from '../../../components';
import {colors, fontSize} from '../../../constant';

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
    paddingHorizontal: scale(20),
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
