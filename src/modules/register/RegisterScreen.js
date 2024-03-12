import React, {createRef, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Input, Text, Button, Back, SignInSocial} from '@components';
import {colors, fontSize} from '@constant';
import {hScale, scale} from '@resolutions';

import RegisterSchema from './RegisterSchema';

const initialValues = {
  name: '',
  user_name: '',
  password: '',
  phone_number: '',
  email: '',
  address: '',
  avatar: '',
};

const initialErrors = {
  name: true,
  user_name: true,
  password: true,
  phone_number: true,
  email: true,
};

const RegisterScreen = ({navigation}) => {
  const refUsername = createRef();
  const refPassword = createRef();
  const refPhoneNumber = createRef();
  const refEmail = createRef();
  const refAddress = createRef();
  const redAvatar = createRef();

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
    validationSchema: RegisterSchema,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = () => {
    setSubmitting(true);
    resetForm();
  };

  const focusUsername = () => {
    refUsername.current?.focus();
  };

  const focusPassword = () => {
    refPassword.current?.focus();
  };

  const focusPhoneNumber = () => {
    refPhoneNumber.current?.focus();
  };

  const focusEmail = () => {
    refEmail.current?.focus();
  };

  const focusAddress = () => {
    refAddress.current?.focus();
  };

  const focusAvatar = () => {
    redAvatar.current?.focus();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
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
            {'Sign Up'}
          </Text>
          <View style={styles.form}>
            <Input
              medium
              label="Name"
              name="name"
              placeholder="Enter your name"
              value={values.name}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={focusUsername}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              ref={refUsername}
              label="Username"
              name="user_name"
              placeholder="Enter your username"
              value={values.user_name}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={focusPassword}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              ref={refPassword}
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={focusPhoneNumber}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              ref={refPhoneNumber}
              label="Phone number"
              name="phone_number"
              placeholder="Enter your phone number"
              value={values.phone_number}
              returnKeyType="next"
              keyboardType="number-pad"
              style={styles.input}
              onSubmitEditing={focusEmail}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              ref={refEmail}
              label="E-mail"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={focusAddress}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              ref={refAddress}
              label="Address"
              name="address"
              placeholder="Enter your address"
              value={values.address}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={focusAvatar}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              ref={redAvatar}
              label="Avatar"
              name="avatar"
              placeholder="Select your avatar"
              value={values.avatar}
              returnKeyType="done"
              style={styles.input}
              {...{errors, touched, handleBlur, handleChange}}
            />
          </View>
          <Button
            disabled={!isValid || isSubmitting}
            style={styles.btnSignUp}
            onPress={handleSubmit}>
            <Text bold style={styles.textSignUp}>
              {'SIGN UP'}
            </Text>
          </Button>
          <SignInSocial />
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
    paddingBottom: scale(50),
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
    marginTop: scale(20),
  },
  form: {
    marginTop: scale(25),
  },
  input: {
    marginBottom: scale(20),
  },
  textSignUp: {
    color: colors.white,
  },
  txtForgotPass: {
    fontSize: fontSize.fontSize14,
    color: colors.orange_FE724C,
  },
  btnSignUp: {
    width: '80%',
    height: hScale(60),
    borderRadius: scale(30),
    marginTop: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FD724C,
    paddingVertical: scale(14),
  },
  vwQuestion: {
    marginTop: scale(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtQuestion: {
    fontSize: fontSize.fontSize14,
    color: colors.blue_5B5B5E,
  },
});

export default RegisterScreen;
