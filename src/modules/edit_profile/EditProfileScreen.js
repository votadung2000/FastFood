import React, {createRef, useState} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {Input, Text, Button, Back, ModalLoading, Notifer} from '@components';
import {colors, fontSize, radius} from '@constant';
import {hScale, scale, wScale} from '@resolutions';
import {useStore} from '@context';

import EditProfileSchema from './EditProfileSchema';

const initialErrors = {
  name: true,
  user_name: true,
  phone_number: true,
  email: true,
  address: true,
};

const EditProfileScreen = () => {
  const refUsername = createRef();
  const refPhoneNumber = createRef();
  const refEmail = createRef();
  const refAddress = createRef();

  const navigation = useNavigation();

  const {
    userStore: {user, fetchApiUpdateProfile},
  } = useStore();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: user?.name || '',
    user_name: user?.user_name || '',
    phone_number: user?.phone_number || '',
    email: user?.email || '',
    address: user?.address || '',
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
    validationSchema: EditProfileSchema,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = async () => {
    try {
      setLoading({isVisible: true});

      let body = {
        name: values.name,
        user_name: values.user_name,
        phone_number: values.phone_number,
        email: values.email,
        address: values.address,
      };

      let response = await fetchApiUpdateProfile(body);
      if (response) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            resetForm(initialValues);
            Notifer({
              alertType: 'success',
              title: 'Update Successfully!',
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

  const focusUsername = () => {
    refUsername.current?.focus();
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

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('@images/bg_profile.png')}
          resizeMode="stretch"
          style={styles.image}
        />
        <Back style={styles.back} />
        <View style={styles.vwImg}>
          <Image source={require('@images/avatar.png')} style={styles.img} />
        </View>
        <View style={styles.content}>
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
              onSubmitEditing={handleSubmit}
              {...{errors, touched, handleBlur, handleChange}}
            />
          </View>
          <Button
            disabled={!isValid}
            style={styles.btnConfirm}
            onPress={handleSubmit}>
            <Text bold style={styles.textConfirm}>
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
  back: {
    paddingHorizontal: scale(25),
    marginTop: scale(27),
  },
  vwImg: {
    width: wScale(110),
    height: wScale(110),
    borderRadius: scale(110),
    marginTop: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  img: {
    width: wScale(90),
    height: wScale(90),
    borderRadius: scale(90),
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
  textConfirm: {
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

export default observer(EditProfileScreen);
