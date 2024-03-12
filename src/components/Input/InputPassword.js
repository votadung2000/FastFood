import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, Button} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize, radius} from '@constant';
import {hScale} from '@resolutions';

const {scale} = resolutions;

const InputPassword = (
  {
    medium,
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
  const [isInput, setInput] = useState(false);

  const handleSecureText = () => {
    setSecureText(prev => !prev);
  };

  const handleInputStart = () => {
    setInput(true);
  };

  const onBlur = () => {
    setInput(false);
  };

  return (
    <View {...style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <TextInput
          ref={ref}
          {...rest}
          autoCapitalize="none"
          placeholderTextColor={colors.gray_C4C4C4}
          style={[
            styles.input,
            medium && styles.medium,
            isInput && styles.inputting,
            inputStyle,
          ]}
          secureTextEntry={secureText}
          onChangeText={handleChange(name)}
          onBlur={onBlur}
          onEndEditing={handleBlur(name)}
          onTouchStart={handleInputStart}
        />
        {value?.length ? (
          <Button onPress={handleSecureText} style={styles.btnEye}>
            <Ionicons
              size={scale(18)}
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              color={colors.gray_C4C4C4}
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
    width: '100%',
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
  inputting: {
    borderColor: colors.orange_FE724C,
  },
  medium: {
    fontFamily: 'Inter-Medium',
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
    marginBottom: scale(10),
    color: colors.gray_9796A1,
  },
  error: {
    color: colors.redSystem,
    fontSize: fontSize.smaller,
    marginTop: scale(5),
  },
});

export default React.forwardRef(InputPassword);
