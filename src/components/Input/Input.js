import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import {Text} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize, radius} from '@constant';
import {hScale} from '@resolutions';

const {scale} = resolutions;

const Input = (
  {
    medium,
    label,
    name,
    touched,
    errors,
    style,
    inputStyle,
    onChangeText,
    handleChange,
    handleBlur,
    ...rest
  },
  ref,
) => {
  return (
    <View {...style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={ref}
        {...rest}
        autoCapitalize="none"
        placeholderTextColor={colors.gray_C4C4C4}
        style={[styles.input, medium && styles.medium, inputStyle]}
        onChangeText={
          onChangeText ? text => onChangeText(text) : handleChange(name)
        }
        onBlur={handleBlur(name)}
      />
      {touched[name] && errors[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: hScale(65),
    color: colors.black,
    fontSize: fontSize.fontSize16,
    borderColor: colors.gray_EEEEEE,
    borderWidth: 1,
    borderRadius: radius.radius10,
    padding: 0,
    paddingLeft: scale(20),
    paddingRight: scale(10),
    fontFamily: 'Inter-Regular',
  },
  medium: {
    fontFamily: 'Inter-Medium',
  },
  label: {
    marginBottom: scale(10),
    color: colors.gray_9796A1,
  },
  error: {
    color: colors.redSystem,
    fontSize: fontSize.smaller,
    marginTop: scale(5),
  },
});

export default React.forwardRef(Input);
