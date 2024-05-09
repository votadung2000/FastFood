import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@components';
import {colors, fontSize} from '@constant';
import {scale} from '@resolutions';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Notification'}
      </Text>
      <View style={styles.body} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSize.fontSize30,
    alignSelf: 'flex-end',
    marginRight: scale(15),
    marginTop: scale(20),
  },
  body: {},
});

export default NotificationScreen;
