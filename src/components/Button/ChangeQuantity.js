import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {colors} from '../../constant';
import {Button} from '../index';

const ChangeQuantity = () => {
  return (
    <View style={styles.container}>
      <Button style={styles.btn}>
        <Entypo name="plus" color={colors.green} size={20} />
      </Button>
      <Button style={styles.btn}>
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
});

export default React.memo(ChangeQuantity);
