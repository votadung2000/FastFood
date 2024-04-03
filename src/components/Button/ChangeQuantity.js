import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {colors, fontSize, radius} from '@constant';
import {scale, wScale} from '@resolutions';

import Button from './Button';
import Text from '../Text';

const ChangeQuantity = ({quantity, handlePlus, handleMinus}) => {
  return (
    <View style={styles.container}>
      <Button onPress={handleMinus} style={[styles.btn, styles.btnMinus]}>
        <Entypo name="minus" color={colors.orange_FE724C} size={scale(18)} />
      </Button>
      <Text bold style={styles.total}>
        {quantity}
      </Text>
      <Button onPress={handlePlus} style={[styles.btn, styles.btnPlus]}>
        <Entypo name="plus" color={colors.white} size={scale(18)} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    width: wScale(30),
    height: wScale(30),
    borderRadius: scale(30),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...radius.shadow,
  },
  btnMinus: {
    borderWidth: scale(1),
    borderColor: colors.orange_FE724C,
  },
  btnPlus: {
    backgroundColor: colors.orange_FE724C,
  },
  total: {
    fontSize: fontSize.fontSize14,
    paddingHorizontal: scale(15),
    textAlign: 'center',
  },
});

export default React.memo(ChangeQuantity);
