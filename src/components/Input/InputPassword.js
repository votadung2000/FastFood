import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, Button} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize} from '@constant';

const {scale} = resolutions;

const InputPassword = (
  {
    label,
    value,
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
  const [secureText, setSecureText] = useState(true);

  const handleSecureText = () => {
    setSecureText(prev => !prev);
  };

  return (
    <View {...style}>
      {label && (
        <Text bold style={styles.label}>
          {label}
        </Text>
      )}
      <View>
        <TextInput
          ref={ref}
          {...rest}
          autoCapitalize="none"
          placeholderTextColor={colors.graySystem}
          style={[styles.input, inputStyle]}
          secureTextEntry={secureText}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
        />
        {value?.length ? (
          <Button onPress={handleSecureText} style={styles.btnEye}>
            <Ionicons
              size={scale(18)}
              name={secureText ? 'eye-outline' : 'eye-off-outline'}
            />
          </Button>
        ) : null}
      </View>
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
    paddingVertical: scale(5),
    paddingRight: scale(40),
    fontFamily: 'Inter-Regular',
  },
  btnEye: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: 'center',
    paddingRight: scale(6),
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

export default React.forwardRef(InputPassword);
