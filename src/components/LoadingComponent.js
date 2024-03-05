import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {colors} from '@constant';
import {scale} from 'utils/resolutions';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.gray} />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: scale(5),
  },
});
