import React from 'react';
import {StyleSheet, View} from 'react-native';
import Config from 'react-native-config';

import {Back, MyWeb} from '@components';
import {scale} from '@resolutions';
import {colors} from '@constant';

const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>
      <Back title={'Privacy Policy'} style={styles.back} />
      <View style={styles.content}>
        <MyWeb uri={Config.API_PRIVACY_POLICY} />
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
    flex: 1,
    marginTop: scale(10),
    paddingHorizontal: scale(25),
  },
});

export default PrivacyPolicyScreen;