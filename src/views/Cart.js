import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {scale} from '../utils/resolutions';
import {colors} from '../constant';

const Cart = () => {
  return (
    <View style={styles.container}>
      <AntDesign name="shoppingcart" size={scale(18)} color={colors.gray} />
    </View>
  );
};

export default React.memo(Cart);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: scale(10),
    paddingHorizontal: scale(15),
  },
});
