import React, {useState} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {object, string} from 'yup';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Modal, Text, Button, Input, Back} from '@components';
import {colors, fontSize, radius} from '@constant';
import {hScale, scale, wScale} from '@resolutions';
import routes from '@routes';

const initialValues = {
  email: '',
};

const initialErrors = {
  email: true,
};

let ForgotPassScheme = object().shape({
  email: string()
    .trim()
    .email('Incorrect email')
    .required('Please enter email'),
});

const ModalForgotPass = ({isVisible, handleClose}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

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
    validationSchema: ForgotPassScheme,
    onSubmit: () => onSubmit(),
  });

  const onSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
      setSuccess(true);
      handleClose();
    }, 500);
  };

  const onBack = () => {
    resetForm();
    handleClose();
  };

  const onModalHide = () => {
    if (isSuccess) {
      setSuccess(false);
      navigation.navigate(routes.OTPScreen);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      stModal={styles.stModal}
      onModalHide={onModalHide}>
      <Back
        style={[
          styles.back,
          ...Platform.select({
            ios: {
              top: scale(insets?.top),
            },
          }),
        ]}
        handleGoBack={onBack}
      />
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.container,
            ...Platform.select({
              ios: {
                marginTop: scale(insets?.top),
              },
            }),
          ]}>
          <View style={styles.content}>
            <Text bold style={styles.title}>
              {'Forgot Password'}
            </Text>
            <Text style={styles.warn}>
              {'The OTP code will be sent via the email you registered with'}
            </Text>
            <View style={styles.vwForm}>
              <Input
                medium
                name="email"
                placeholder="Enter your email"
                value={values.email}
                returnKeyType="done"
                style={styles.input}
                {...{errors, touched, handleBlur, handleChange}}
              />
            </View>
            <Button
              disabled={!isValid || isSubmitting}
              style={styles.btnConfirm}
              onPress={handleSubmit}>
              <Text bold style={styles.textConfirm}>
                {'CONFIRM'}
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  stModal: {
    paddingHorizontal: scale(25),
  },
  back: {
    position: 'absolute',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(15),
    paddingBottom: scale(15),
  },
  content: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.radius6,
    padding: scale(20),
  },
  title: {
    fontSize: fontSize.large,
    textAlign: 'center',
  },
  warn: {
    textAlign: 'center',
    marginTop: scale(10),
    color: colors.gray_9796A1,
    fontSize: fontSize.fontSize14,
  },
  vwForm: {
    marginTop: scale(25),
  },
  btnConfirm: {
    width: wScale(180),
    height: hScale(52),
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

export default ModalForgotPass;
