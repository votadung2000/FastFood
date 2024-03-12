import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '@constant';
import {scale} from '@resolutions';
import {Text} from '@components';

const Menu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.vwHeader}>
        <Text>aaaa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  vwHeader: {
    marginTop: scale(70),
  },
});

export default Menu;
