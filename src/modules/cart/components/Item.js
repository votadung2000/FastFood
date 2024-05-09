import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@components';
import {colors, fontSize} from '@constant';
import {resolutions} from '@utils';

const {scale} = resolutions;

const Item = ({label, value, bold}) => {
  return (
    <View style={styles.container}>
      <Text medium style={styles.label}>
        {label}
      </Text>
      <View style={styles.vwValue}>
        <Text medium style={styles.value}>
          {value}
        </Text>
        <Text style={styles.unit}>{'Đ'}</Text>
      </View>
    </View>
  );
};

export default React.memo(Item);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(15),
    paddingBottom: scale(10),
    borderBottomWidth: scale(1),
    borderBottomColor: colors.gray_F2EAEA,
  },
  label: {},
  vwValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: fontSize.big,
    textAlign: 'center',
  },
  unit: {
    color: colors.gray_9796A1,
    textAlign: 'center',
    marginLeft: scale(2),
  },
});
