import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Back} from '@components';
import {scale} from '@resolutions';
import {colors} from '@constant';

const DeliveryAddressScreen = () => {
  return (
    <View style={styles.container}>
      <Back title={'Delivery Address'} />
      <View style={styles.content} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginTop: scale(20),
  },
});

export default DeliveryAddressScreen;
