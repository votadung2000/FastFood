import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import DeviceInfo from 'react-native-device-info';

import {Back, Text} from '@components';
import {
  STATUS_SETTING_NOTIFY,
  checkStatusOnNotify,
  colors,
  fontSize,
} from '@constant';
import {scale} from '@resolutions';
import routes from '@routes';

import CardPermission from './CardPermission';

const versionApp = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleNav = route => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <Back title={'Setting'} style={styles.back} />
      <View style={styles.content}>
        <CardPermission
          title={'Notification'}
          isOn={checkStatusOnNotify(STATUS_SETTING_NOTIFY.ON.status)}
          // handleActionSwitch={() => handleNotify('notification')}
        />
        <CardPermission
          title={'Chat Notification'}
          isOn={checkStatusOnNotify(STATUS_SETTING_NOTIFY.OFF.status)}
          // handleActionSwitch={() => handleNotify('chat_notification')}
        />
        <CardPermission
          title={'Offer/Accept Offer Notification'}
          isOn={checkStatusOnNotify(STATUS_SETTING_NOTIFY.ON.status)}
          // handleActionSwitch={() => handleNotify('offer_notification')}
        />
        <CardPermission
          title={'Privacy Policy'}
          Icon={
            <Entypo
              name="chevron-thin-right"
              size={scale(16)}
              color={colors.graySystem1}
            />
          }
          onPress={() => handleNav(routes.PrivacyPolicyScreen)}
        />
        <CardPermission
          title={'Change Password'}
          Icon={
            <Entypo
              name="chevron-thin-right"
              size={scale(16)}
              color={colors.graySystem1}
            />
          }
          onPress={() => handleNav(routes.ChangePasswordScreen)}
        />
        <CardPermission
          title={'Version'}
          Icon={
            <Text medium style={styles.txtVersion}>
              {`Version ${versionApp} (${buildNumber}) - ${new Date().getFullYear()}`}
            </Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  back: {
    marginTop: scale(27),
    paddingHorizontal: scale(25),
  },
  content: {
    paddingHorizontal: scale(25),
    marginTop: scale(30),
  },
  txtVersion: {
    color: colors.orange_FE724C,
    fontSize: fontSize.fontSize14,
  },
});

export default SettingScreen;
