import routes from '@routes';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, StatusBar, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from 'utils/resolutions';

import {colors} from '../constant';

const Layout = ({children, navigationRef}) => {
  const [display, setDisplay] = useState(true);

  useLayoutEffect(() => {
    navigationRef.addListener('state', () => {
      const {name} = navigationRef?.getCurrentRoute();
      if (name === routes.HelloScreen) {
        setDisplay(false);
      } else {
        setDisplay(true);
      }
    });
  }, [navigationRef]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'ios' && <StatusBar animated barStyle="light-content" />}
      {display && <View style={styles.container} />}
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
  container: {
    marginTop: scale(Platform.OS === 'ios' ? 10 : 15),
  },
});
