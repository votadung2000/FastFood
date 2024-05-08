import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation, StackActions} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BackgroundTimer from 'react-native-background-timer';

import {Text, Button, Back} from '@components';
import {colors, fontSize, radius} from '@constant';
import {hScale, scale, wScale} from '@resolutions';
import routes from '@routes';

const NUMBER_OTP = 4;
const TIME_COUNT_OTP = 119;

const OTPScreen = () => {
  const navigation = useNavigation();

  const [isFailed, setFailed] = useState(false);
  const [countOTP, setCountOtp] = useState(TIME_COUNT_OTP);
  const [codeOTP, setCodeOTP] = useState(null);

  useEffect(() => {
    startCountTimer();

    return () => {
      stopCountTimer();
    };
  }, [countOTP]);

  const startCountTimer = () => {
    const timer = countOTP - 1;
    if (timer >= 0) {
      BackgroundTimer.runBackgroundTimer(() => {
        setCountOtp(timer);
      }, 1000);
    } else {
      stopCountTimer();
    }
  };

  const stopCountTimer = () => {
    BackgroundTimer.stopBackgroundTimer();
  };

  const handleCodeChanged = code => {
    if (code.length === 3 && isFailed) {
      setFailed(false);
    }
  };

  const handleCodeFilled = code => {
    setCodeOTP(code);
  };

  const handleResend = async () => {
    setCountOtp(TIME_COUNT_OTP);
  };

  const handleDisplayTimeOtp = count => {
    let minutes = Math.floor(count / 60);
    let second = count - minutes * 60;

    return `${handleCheckDisplayTimeOtp(minutes)}:${handleCheckDisplayTimeOtp(
      second,
    )}`;
  };

  const handleCheckDisplayTimeOtp = time => {
    if (time === 0) {
      return '00';
    }
    if (JSON.stringify(time)?.length === 1) {
      return `0${time}`;
    }
    return time;
  };

  const handleConfirm = () => {
    if (codeOTP === '0000') {
      navigation.dispatch(StackActions.replace(routes.ResetPasswordScreen));
    } else {
      setFailed(true);
    }
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
        <Back />
        <View style={styles.content}>
          <Text bold style={styles.title}>
            {'Verification Code'}
          </Text>
          <Text style={styles.note}>
            {`Please type the verification code sent to\n${'example@gmail.com'}`}
          </Text>
          <View style={styles.form}>
            <OTPInputView
              autoFocusOnLoad={false}
              style={styles.otp}
              pinCount={NUMBER_OTP}
              onCodeChanged={code => handleCodeChanged(code)}
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                isFailed && styles.isFailedUnderlineStyleBase,
              ]}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => handleCodeFilled(code)}
            />
            {isFailed && (
              <Text style={styles.txtFailed}>
                {'Verification code is invalid'}
              </Text>
            )}
          </View>
          <View style={styles.footer}>
            <Text medium style={styles.txtQuestion}>
              {"Don't have an account?"}
            </Text>
            {countOTP <= 0 ? (
              <Button style={styles.btnResend} onPress={handleResend}>
                <Text medium style={styles.txtResend}>
                  {'Please resend'}
                </Text>
              </Button>
            ) : (
              <Text style={styles.txtReSendOtp}>
                {handleDisplayTimeOtp(countOTP)}
              </Text>
            )}
          </View>
          <Button style={styles.btnConfirm} onPress={handleConfirm}>
            <Text bold style={styles.textConfirm}>
              {'CONFIRM'}
            </Text>
          </Button>
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
    marginTop: scale(80),
  },
  note: {
    color: colors.gray_9796A1,
    fontSize: fontSize.fontSize14,
    marginTop: scale(12),
  },
  form: {
    marginTop: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  otp: {
    width: '100%',
    height: hScale(65),
    alignItems: 'center',
  },
  underlineStyleBase: {
    width: wScale(65),
    height: wScale(65),
    borderWidth: 1,
    borderColor: colors.gray_EEEEEE,
    borderRadius: radius.radius6,
    color: colors.orange_FE724C,
    fontSize: fontSize.fontSize28,
    fontFamily: 'Inter-Medium',
  },
  isFailedUnderlineStyleBase: {
    color: colors.redSystem,
    borderColor: colors.redSystem,
  },
  underlineStyleHighLighted: {
    borderColor: colors.orange_FE724C,
  },
  txtFailed: {
    marginTop: scale(5),
    fontSize: fontSize.small,
    color: colors.redSystem,
  },
  footer: {
    marginTop: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtQuestion: {
    fontSize: fontSize.fontSize14,
    color: colors.blue_5B5B5E,
  },
  btnResend: {
    marginLeft: scale(6),
  },
  txtResend: {
    fontSize: fontSize.fontSize14,
    color: colors.orange_FE724C,
  },
  txtReSendOtp: {
    marginLeft: scale(6),
    fontSize: fontSize.fontSize14,
    color: colors.orange_FE724C,
    textAlign: 'center',
  },
  btnConfirm: {
    width: '80%',
    height: hScale(60),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FD724C,
    marginTop: scale(25),
  },
  textConfirm: {
    color: colors.white,
  },
});

export default OTPScreen;
