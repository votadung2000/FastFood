import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import {Text} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize} from '@constant';

const {scale} = resolutions;

const Input = (
  {
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
      {label && (
        <Text bold style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        ref={ref}
        {...rest}
        autoCapitalize="none"
        placeholderTextColor={colors.graySystem}
        style={[styles.input, inputStyle]}
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
    color: colors.black,
    fontSize: fontSize.normal,
    borderBottomColor: colors.graySystem,
    borderBottomWidth: 1,
    paddingVertical: scale(6),
  },
  label: {
    marginBottom: scale(6),
  },
  error: {
    color: colors.redSystem,
    fontSize: fontSize.smaller,
    marginTop: scale(5),
  },
});

export default React.forwardRef(Input);
