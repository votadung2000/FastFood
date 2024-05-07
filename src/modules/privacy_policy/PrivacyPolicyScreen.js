import React from 'react';
import {StyleSheet, View} from 'react-native';
import Config from 'react-native-config';

import {MyWeb} from '@components';

const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>
      <MyWeb uri={Config.API_PRIVACY_POLICY} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PrivacyPolicyScreen;
