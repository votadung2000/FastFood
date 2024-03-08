import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar, View} from 'react-native';

import {colors} from '../constant';

const Layout = ({children}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          animated
          barStyle="dark-content"
          backgroundColor={colors.white}
        />
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
