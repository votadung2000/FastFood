import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Back} from '@components';
import {colors} from '@constant';
import {scale} from '@resolutions';

const CreateDeliveryAddressScreen = () => {
  return (
    <View style={styles.container}>
      <Back title={'Create Delivery Address'} />
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
    paddingHorizontal: scale(25),
  },
});

export default CreateDeliveryAddressScreen;
