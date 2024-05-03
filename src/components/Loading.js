import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {colors} from '@constant';

const Loading = ({color, size}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size || 'small'}
        color={color || colors.orange_FE724C}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Loading;
