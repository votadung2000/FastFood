import React, {createRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {Input, Text, Button, Back, ModalLoading, Notifer} from '@components';
import {colors, fontSize} from '@constant';
import {hScale, scale} from '@resolutions';
import {useStore} from '@context';

import ChangePasswordSchema from './ChangePasswordSchema';

const initialErrors = {
  email: true,
  password: true,
  new_password: true,
};

const ChangePasswordScreen = () => {
  const refPassword = createRef();
  const refNewPassword = createRef();

  const navigation = useNavigation();

  const {
    userStore: {user, fetchApiUpdatePassword},
  } = useStore();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: user?.email || '',
    password: '',
    new_password: '',
  };

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
    validationSchema: ChangePasswordSchema,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = async () => {
    try {
      setLoading({isVisible: true});

      let body = {
        email: values.email,
        password: values.password,
        new_password: values.new_password,
      };

      let response = await fetchApiUpdatePassword(body);
      if (response) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            resetForm(initialValues);
            Notifer({
              alertType: 'success',
              title: 'Password Changed Successfully!',
            });
            navigation.goBack();
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

  const focusPassword = () => {
    refPassword.current?.focus();
  };
  const focusRePassword = () => {
    refNewPassword.current?.focus();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={false}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Back title={'Change Password'} />
        <View style={styles.content}>
          <View style={styles.form}>
            <Input
              medium
              label="E-mail"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              returnKeyType="next"
              editable={false}
              isTouchStart={true}
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
              ref={refNewPassword}
              label="New-Password"
              name="new_password"
              placeholder="Enter your password again"
              value={values.new_password}
              returnKeyType="next"
              style={styles.input}
              {...{errors, touched, handleBlur, handleChange}}
            />
          </View>
          <Button
            disabled={!isValid}
            style={styles.btnConfirm}
            onPress={handleSubmit}>
            <Text bold style={styles.txtConfirm}>
              {'CONFIRM'}
            </Text>
          </Button>
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
  btnConfirm: {
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
  txtConfirm: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
  },
});

export default observer(ChangePasswordScreen);
