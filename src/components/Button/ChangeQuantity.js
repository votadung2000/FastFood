import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {colors, fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';
import {Button, Text} from '../index';

const ChangeQuantity = ({handlePlus, handleMinus}) => {
  return (
    <View style={styles.container}>
      <Button onPress={handlePlus} style={styles.btn}>
        <Entypo name="plus" color={colors.green} size={20} />
      </Button>
      <Text style={styles.total}>{'1'}</Text>
      <Button onPress={handleMinus} style={styles.btn}>
        <Entypo name="minus" color={colors.green} size={20} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '35%',
  },
  btn: {
    paddingHorizontal: scale(5),
    paddingVertical: scale(3),
    borderRadius: scale(5),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  total: {
    fontSize: fontSize.fontSize14,
    paddingHorizontal: scale(10),
    textAlign: 'center',
  },
});

export default React.memo(ChangeQuantity);
