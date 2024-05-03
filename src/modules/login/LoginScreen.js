import React, {createRef, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {observer} from 'mobx-react';

import {
  Input,
  InputPassword,
  Text,
  Button,
  Back,
  SignInSocial,
  Notifer,
  ModalLoading,
} from '@components';
import {useStore} from '@context';
import {setToken} from '@storage';
import {colors, fontSize} from '@constant';
import {hScale, scale} from '@resolutions';
import routes from '@routes';

import LoginSchema from './LoginSchema';
import {ModalForgotPass} from './components';

const initialValues = {
  username: 'register1',
  password: 'register1',
};

const initialErrors = {
  username: true,
  password: true,
};

const LoginScreen = ({navigation}) => {
  const {
    userStore: {fetchApiLogin, fetchApiUserProfile},
  } = useStore();

  const refPassword = createRef();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({isVisible: false});

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
    setLoading({isVisible: true});
    try {
      let body = {
        user_name: values?.username,
        password: values?.password,
      };

      let response = await fetchApiLogin(body);
      if (response) {
        await setToken(response?.token);
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            resetForm(initialValues);
            Notifer({
              alertType: 'success',
              title: 'Login Successfully!',
            });
            await fetchApiUserProfile();
          },
        });
      }
    } catch ({response}) {
      setLoading({isVisible: false});
      if (!response) {
        Notifer({
          alertType: 'warn',
          title: 'Vui lòng kiểm tra kết nối mạng',
        });
      } else {
        Notifer({
          alertType: 'error',
          title: response?.data?.message || '',
        });
      }
    }
  };

  const goToScreen = route => {
    navigation.navigate(route);
  };

  const focusPassword = () => {
    refPassword.current?.focus();
  };

  const handleOpenModalForgotPass = () => {
    setModal({isVisible: true});
  };

  const handleCloseModalForgotPass = () => {
    setModal({isVisible: false});
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
            {'Login'}
          </Text>
          <View style={styles.form}>
            <Input
              medium
              label="Username"
              name="username"
              placeholder="Your username"
              value={values.username}
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
            <Button onPress={handleOpenModalForgotPass}>
              <Text medium style={styles.txtForgotPass}>
                {'Forgot password?'}
              </Text>
            </Button>
            <Button
              disabled={!isValid}
              style={styles.btnLogin}
              onPress={handleSubmit}>
              <Text bold style={styles.textLogin}>
                {'LOGIN'}
              </Text>
            </Button>
            <View style={styles.vwQuestion}>
              <Text medium style={styles.txtQuestion}>
                {"Don't have an account?"}
              </Text>
              <Button
                style={styles.btnSignUp}
                onPress={() => goToScreen(routes.RegisterScreen)}>
                <Text medium style={styles.txtSignUp}>
                  {'Sign up'}
                </Text>
              </Button>
            </View>
          </View>
          <SignInSocial />
        </View>
      </KeyboardAwareScrollView>
      <ModalForgotPass handleClose={handleCloseModalForgotPass} {...modal} />
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
    paddingBottom: scale(50),
  },
  title: {
    fontSize: fontSize.fontSize34,
    textAlign: 'left',
    marginTop: scale(80),
  },
  form: {
    marginTop: scale(25),
  },
  input: {
    marginBottom: scale(20),
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
    height: hScale(60),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange_FD724C,
    marginTop: scale(25),
  },
  textLogin: {
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
  btnSignUp: {
    marginLeft: scale(6),
  },
  txtSignUp: {
    fontSize: fontSize.fontSize14,
    color: colors.orange_FE724C,
  },
});

export default observer(LoginScreen);
