import React, {createRef, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import {object, string, ref} from 'yup';
import {useNavigation, StackActions} from '@react-navigation/native';

import {Text, Button, Back, InputPassword} from '@components';
import {colors, fontSize} from '@constant';
import {hScale, scale} from '@resolutions';

const initialValues = {
  password: '',
  confirm_password: '',
};

const initialErrors = {
  password: true,
  confirm_password: true,
};

let ResetPasswordScheme = object().shape({
  password: string()
    .trim()
    .min(6, 'Password must have 6 characters or more')
    .required('Please enter information'),
  confirm_password: string()
    .trim()
    .min(6, 'Password must have 6 characters or more')
    .oneOf([ref('password')], 'Passwords must match')
    .required('Please enter information'),
});

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const refConfirmPassword = createRef();

  const [isSubmitting, setSubmitting] = useState(false);

  const {
    values,
    errors,
    isValid,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues,
    initialErrors,
    validationSchema: ResetPasswordScheme,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
      navigation.dispatch(StackActions.pop(1));
    }, 500);
  };

  const focusConfirmPassword = () => {
    refConfirmPassword.current?.focus();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('@images/bg.png')}
          resizeMode="stretch"
          style={styles.image}
        />
        <Back style={styles.back} />
        <View style={styles.content}>
          <Text bold style={styles.title}>
            {'Reset Password'}
          </Text>
          <Text style={styles.note}>
            {`Please type the verification code sent to\n${'example@gmail.com'}`}
          </Text>
          <View style={styles.form}>
            <InputPassword
              medium
              label="Password"
              name="password"
              placeholder="Password"
              value={values.password}
              returnKeyType="next"
              maxLength={30}
              style={styles.input}
              onSubmitEditing={focusConfirmPassword}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <InputPassword
              medium
              ref={refConfirmPassword}
              label="Confirm Password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={values.password}
              returnKeyType="done"
              maxLength={30}
              {...{errors, touched, handleBlur, handleChange}}
            />
          </View>
          <Button
            disabled={!isValid || isSubmitting}
            style={styles.btnConfirm}
            onPress={handleSubmit}>
            <Text bold style={styles.textConfirm}>
              {'SEND NEW PASSWORD'}
            </Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  back: {
    paddingHorizontal: scale(25),
    marginTop: scale(27),
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(25),
  },
  title: {
    fontSize: fontSize.fontSize34,
    textAlign: 'left',
    marginTop: scale(80),
  },
  note: {
    color: colors.gray_9796A1,
    fontSize: fontSize.fontSize14,
    marginTop: scale(12),
  },
  form: {
    marginTop: scale(30),
  },
  input: {
    marginBottom: scale(20),
  },
  btnConfirm: {
    width: '80%',
    height: hScale(60),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FD724C,
    marginTop: scale(25),
  },
  textConfirm: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
  },
});

export default ResetPasswordScreen;
