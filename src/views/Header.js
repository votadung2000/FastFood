import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

import {hScale, scale, wScale} from '../utils/resolutions';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'logo_home'}}
        style={styles.logo}
        resizeMode="stretch"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: scale(10),
    paddingHorizontal: scale(15),
  },
  logo: {
    width: wScale(60),
    height: hScale(60),
  },
});

export default Header;
