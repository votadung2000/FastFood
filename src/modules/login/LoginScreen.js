import React, {createRef, useState} from 'react';
import {View, Image} from 'react-native';
import {useFormik} from 'formik';
import DeviceInfo from 'react-native-device-info';

import {Layout} from '../../views';
import {Input, InputPassword} from '../../components';
import {Text, Button} from '../../components';

import LoginSchema from './LoginSchema';
import styles from './styles';

let appName = DeviceInfo.getApplicationName();

const initialValues = {
  user_name: '',
  password: '',
};

const initialErrors = {
  user_name: true,
  password: true,
};

const LoginScreen = () => {
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

  const onSubmit = () => {
    setSubmitting(false);
    resetForm();
  };

  const focusPassword = () => {
    refPassword.current?.focus();
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default LoginScreen;
