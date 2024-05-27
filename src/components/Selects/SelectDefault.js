import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  DEFAULT_DELIVERY_ADDRESS,
  checkDefaultDeliveryAddress,
  colors,
  radius,
} from '@constant';
import {hScale, scale} from '@resolutions';

import Text from '../Text';
import Switch from '../Switch';

const SelectDefault = ({name, value, setFieldValue, stContainer}) => {
  const handleActionSwitch = () => {
    if (setFieldValue) {
      if (checkDefaultDeliveryAddress(value?.type)) {
        setFieldValue(name, DEFAULT_DELIVERY_ADDRESS.NOT_DEFAULT);
      } else {
        setFieldValue(name, DEFAULT_DELIVERY_ADDRESS.DEFAULT);
      }
    }
  };

  return (
    <View style={[styles.container, stContainer]}>
      <Text medium>{'Set as default address:'}</Text>
      <Switch
        isOn={checkDefaultDeliveryAddress(value?.type)}
        handleActionSwitch={handleActionSwitch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hScale(64),
    borderColor: colors.gray_EEEEEE,
    borderWidth: 1,
    borderRadius: radius.radius10,
    paddingLeft: scale(20),
    paddingRight: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default SelectDefault;
