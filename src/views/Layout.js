import React from 'react';
import {StyleSheet, StatusBar, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../constant';

const Layout = ({children}) => {
  // return

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {Platform.OS === 'ios' && (
          <StatusBar animated barStyle="light-content" />
        )}
        {children}
      </SafeAreaView>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
