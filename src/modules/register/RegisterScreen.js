import React, {createRef, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {
  Input,
  Text,
  Button,
  Back,
  SignInSocial,
  ModalLoading,
  Notifer,
} from '@components';
import {colors, fontSize} from '@constant';
import {hScale, scale} from '@resolutions';
import {useStore} from '@context';
import routes from '@routes';

import RegisterSchema from './RegisterSchema';

const initialValues = {
  name: '',
  user_name: '',
  password: '',
  re_password: '',
  phone_number: '',
  email: '',
};

const initialErrors = {
  name: true,
  user_name: true,
  password: true,
  re_password: true,
  phone_number: true,
  email: true,
};

const RegisterScreen = () => {
  const refUsername = createRef();
  const refPassword = createRef();
  const refRePassword = createRef();
  const refPhoneNumber = createRef();
  const refEmail = createRef();

  const navigation = useNavigation();

  const {
    userStore: {fetchApiRegister},
  } = useStore();

  const [loading, setLoading] = useState(false);

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

  const onSubmit = async () => {
    try {
      setLoading({isVisible: true});

      let body = {
        name: values.name,
        user_name: values.user_name,
        password: values.password,
        phone_number: values.phone_number,
        email: values.email,
      };

      let response = await fetchApiRegister(body);
      if (response) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            resetForm(initialValues);
            Notifer({
              alertType: 'success',
              title: 'Register Successfully!',
            });
            navigation.navigate(routes.LoginScreen);
          },
        });
      }
    } catch ({response}) {
      setLoading({isVisible: false});
      if (!response) {
        Notifer({
          alertType: 'warn',
          title: 'Please check your network connection',
        });
      } else {
        Notifer({
          alertType: 'error',
          title: response?.data?.message || '',
        });
      }
    }
  };

  const focusUsername = () => {
    refUsername.current?.focus();
  };

  const focusPassword = () => {
    refPassword.current?.focus();
  };
  const focusRePassword = () => {
    refRePassword.current?.focus();
  };

  const focusPhoneNumber = () => {
    refPhoneNumber.current?.focus();
  };

  const focusEmail = () => {
    refEmail.current?.focus();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={false}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('@images/bg.png')}
          resizeMode="stretch"
          style={styles.image}
        />
        <Back />
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
              onSubmitEditing={focusRePassword}
              {...{errors, touched, handleBlur, handleChange}}
            />
            <Input
              medium
              ref={refRePassword}
              label="Re-Password"
              name="re_password"
              placeholder="Enter your password again"
              value={values.re_password}
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
              onSubmitEditing={handleSubmit}
              {...{errors, touched, handleBlur, handleChange}}
            />
          </View>
          <Button
            disabled={!isValid}
            style={styles.btnSignUp}
            onPress={handleSubmit}>
            <Text bold style={styles.textSignUp}>
              {'SIGN UP'}
            </Text>
          </Button>
          <SignInSocial />
        </View>
      </KeyboardAwareScrollView>
      <ModalLoading {...loading} />
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
  textSignUp: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
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

export default observer(RegisterScreen);
