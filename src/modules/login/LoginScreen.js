import React, {createRef, useState} from 'react';
import {View, Image} from 'react-native';
import {useFormik} from 'formik';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';

import {Input, InputPassword, Text, Button, Back} from '@components';
import {useStore} from '@context';
import {ApiLogin} from '@actionApi';
import {setToken} from '@storage';
import routes from '@routes';

import LoginSchema from './LoginSchema';
import styles from './styles';

let appName = DeviceInfo.getApplicationName();

const initialValues = {
  user_name: 'register5',
  password: 'register5',
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
      <Back title="Login" style={styles.back} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: 'logo_home'}} style={styles.imgLogin} />
          <Text bold style={styles.nameApp}>
            {appName}
          </Text>
        </View>
        <View style={styles.form}>
          <Input
            name="user_name"
            placeholder="Tên người dùng"
            value={values.user_name}
            returnKeyType="next"
            style={styles.input}
            onSubmitEditing={focusPassword}
            {...{errors, touched, handleBlur, handleChange}}
          />
          <InputPassword
            ref={refPassword}
            name="password"
            placeholder="Mật khẩu"
            value={values.password}
            returnKeyType="done"
            maxLength={30}
            style={styles.input}
            onSubmitEditing={handleSubmit}
            {...{errors, touched, handleBlur, handleChange}}
          />
        </View>
        <View style={styles.footer}>
          <Button
            disabled={!isValid || isSubmitting}
            style={styles.btnLogin}
            onPress={handleSubmit}>
            <Text bold style={styles.textLogin}>
              {'ĐĂNG NHẬP'}
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
