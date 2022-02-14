import React, {createRef} from 'react';
import {View} from 'react-native';
import {useFormik} from 'formik';

import styles from './styles';
import {Layout} from '../../views';
import {Input, InputPassword} from '../../components';
import {Text} from '../../components';

const initialValues = {
  user_name: '',
  password: '',
};

const UserScreen = () => {
  const refPassword = createRef();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = () => {};

  const focusPassword = () => {
    refPassword.current?.focus();
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default UserScreen;
