import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  DEFAULT_DELIVERY_ADDRESS,
  checkDefaultDeliveryAddress,
  colors,
  fontSize,
  radius,
} from '@constant';
import {hScale, scale} from '@resolutions';

import Text from '../Text';
import Switch from '../Switch';

const SelectDefault = ({
  name,
  value,
  touched,
  errors,
  setFieldValue,
  stContainer,
}) => {
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
      <View style={styles.content}>
        <Text medium>{'Set as default address:'}</Text>
        <Switch
          isOn={checkDefaultDeliveryAddress(value?.type)}
          handleActionSwitch={handleActionSwitch}
        />
      </View>
      {touched[name] && errors[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
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
  error: {
    color: colors.redSystem,
    fontSize: fontSize.smaller,
    marginTop: scale(5),
  },
});

export default SelectDefault;
