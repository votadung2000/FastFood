import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@components';
import {colors} from '@constant';
import {currencyUs} from '@utils';

const Item = ({label, value, stContainer}) => {
  return (
    <View style={[styles.container, stContainer]}>
      <Text medium style={styles.label}>
        {label}
      </Text>
      <Text medium style={styles.value}>
        {currencyUs(value)}
      </Text>
    </View>
  );
};

export default React.memo(Item);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {},
  value: {
    textAlign: 'center',
    color: colors.orange_FE724C,
  },
});
