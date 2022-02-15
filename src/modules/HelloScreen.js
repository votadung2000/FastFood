import React from 'react';
import {StyleSheet, View, Dimensions, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {Text, Button} from '../components';
import {colors, fontSize} from '../constant';
import {hScale, scale} from '../utils/resolutions';
import routes from './routes';

const {width} = Dimensions.get('window');

const HelloScreen = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(routes.TabApp);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        // source={{uri: 'bander'}}
        resizeMode="stretch"
        style={styles.image}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.price, colors.orange]}
          style={styles.linearGradient}>
          <Button onPress={() => onPress()} style={styles.btn}>
            <Text bold style={styles.text}>
              {"Let's order a meal"}
            </Text>
          </Button>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  linearGradient: {
    position: 'absolute',
    bottom: hScale(30),
    zIndex: 9999,
    width: width * 0.75,
    borderRadius: scale(15),
  },
  text: {
    fontSize: fontSize.large,
    color: colors.white,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    paddingVertical: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HelloScreen;
