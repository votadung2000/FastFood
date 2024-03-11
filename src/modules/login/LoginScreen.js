import React, {createRef, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useFormik} from 'formik';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Input,
  InputPassword,
  Text,
  Button,
  Back,
  SignInSocial,
} from '@components';
import {useStore} from '@context';
import {ApiLogin} from '@actionApi';
import {setToken} from '@storage';
import {colors, fontSize, radius} from '@constant';
import {scale} from '@resolutions';
import routes from '@routes';

import LoginSchema from './LoginSchema';

const initialValues = {
  user_name: '',
  password: '',
};

const initialErrors = {
  user_name: true,
  password: true,
};

const LoginScreen = ({navigation}) => {
  const {
    userStore: {updateUser},
  } = useStore();

  const refPassword = createRef();

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
    validationSchema: LoginSchema,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      let body = {
        username: values?.user_name,
        password: values?.password,
      };
      let response = await ApiLogin(body);
      if (response?.data) {
        updateUser(response?.data);
        setToken(response?.data?.token);
        setSubmitting(false);
        resetForm(initialValues);
        navigation.navigate(routes.HomeScreen);
        Notifier.showNotification({
          duration: 4000,
          title: 'Đăng nhập thành công',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success',
          },
        });
      }
    } catch ({response}) {
      setSubmitting(false);
      if (!response) {
        Notifier.showNotification({
          title: 'Vui lòng kiểm tra kết nối mạng',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'warn',
          },
        });
      } else {
        Notifier.showNotification({
          title: 'Vui lòng thử lại',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      }
    }
  };

  const focusPassword = () => {
    refPassword.current?.focus();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('@images/bg.png')}
        resizeMode="stretch"
        style={styles.image}
      />
      <Back style={styles.back} />
      <View style={styles.container}>
        <Text bold style={styles.title}>
          {'Login'}
        </Text>
        <View style={styles.form}>
          <Input
            medium
            label="E-mail"
            name="user_name"
            placeholder="Your email or phone"
            value={values.user_name}
            returnKeyType="next"
            style={styles.input}
            onSubmitEditing={focusPassword}
            {...{errors, touched, handleBlur, handleChange}}
          />
          <InputPassword
            medium
            ref={refPassword}
            label="Password"
            name="password"
            placeholder="Password"
            value={values.password}
            returnKeyType="done"
            maxLength={30}
            onSubmitEditing={handleSubmit}
            {...{errors, touched, handleBlur, handleChange}}
          />
        </View>
        <View style={styles.footer}>
          <Button>
            <Text medium style={styles.txtForgotPass}>
              {'Forgot password?'}
            </Text>
          </Button>
          <Button
            disabled={!isValid || isSubmitting}
            style={styles.btnLogin}
            onPress={handleSubmit}>
            <Text bold style={styles.textLogin}>
              {'ĐĂNG NHẬP'}
            </Text>
          </Button>
          <View style={styles.vwQuestion}>
            <Text medium style={styles.txtQuestion}>
              {"Don't have an account?"}
            </Text>
            <Button
              style={styles.btnSignUp}
              // onPress={() => goToScreen(routes.LoginScreen)}
            >
              <Text medium style={styles.txtSignUp}>
                {'Sign up'}
              </Text>
            </Button>
          </View>
        </View>
        <SignInSocial />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
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
  container: {
    flex: 1,
    paddingHorizontal: scale(25),
  },
  title: {
    fontSize: fontSize.fontSize34,
    textAlign: 'left',
    marginTop: scale(80),
  },
  form: {
    marginTop: scale(30),
  },
  input: {
    marginBottom: scale(25),
  },
  textLogin: {
    color: colors.white,
  },
  footer: {
    marginTop: scale(30),
    alignItems: 'center',
  },
  txtForgotPass: {
    fontSize: fontSize.fontSize14,
    color: colors.orange_FE724C,
  },
  btnLogin: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    paddingVertical: scale(14),
    borderRadius: radius.radius14,
    marginTop: scale(25),
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
  btnSignUp: {
    marginLeft: scale(6),
  },
  txtSignUp: {
    fontSize: fontSize.fontSize14,
    color: colors.orange_FE724C,
  },
});

export default LoginScreen;
