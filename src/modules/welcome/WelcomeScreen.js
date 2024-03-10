import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';

import {Text} from '@components';
import {colors, fontSize} from '@constant';
import {hScale, scale} from '@resolutions';

import {Action} from './components';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@images/welcome.png')}
        resizeMode="stretch"
        style={styles.image}
      />
      <View style={styles.vwIntro}>
        <Text bold style={styles.txtGlobalIntro}>
          {'Welcome to\n'}
          <Text bold style={[styles.txtGlobalIntro, styles.txtNameApp]}>
            {'FoodHub'}
          </Text>
        </Text>
        <Text style={styles.txtDes}>
          {'Your favorite foods are delivered\nfast to your door.'}
        </Text>
      </View>
      <Action />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  vwIntro: {
    width: '100%',
    marginTop: hScale(160),
    paddingHorizontal: scale(30),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtGlobalIntro: {
    fontSize: fontSize.fontSize46,
  },
  txtNameApp: {
    color: colors.orange_FE724C,
  },
  txtDes: {
    fontSize: fontSize.large,
    color: colors.blue_30384F,
    marginTop: hScale(19),
  },
});

export default WelcomeScreen;
