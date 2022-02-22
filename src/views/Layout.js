import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../constant';

const Layout = ({children}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar animated barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
