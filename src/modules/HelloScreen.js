import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

import {Text, Button} from '@components';
import {colors, fontSize, radius} from '@constant';
import {resolutions} from '@utils';
import routes from '@routes';

const {width} = Dimensions.get('window');
const {hScale, scale} = resolutions;

const HelloScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  const onPress = () => {
    navigation.navigate(routes.RoutesNavigator);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: 'bander'}}
        resizeMode="stretch"
        style={styles.image}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.price, colors.orange]}
          style={styles.linearGradient}>
          <Button onPress={onPress} style={styles.btn}>
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
    borderRadius: radius.radius14,
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
