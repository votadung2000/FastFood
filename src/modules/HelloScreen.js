import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
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
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.orange, colors.price]}
        style={styles.linearGradient}>
        <Button onPress={() => onPress()}>
          <Text bold style={styles.text}>
            {"Let's order a meal"}
          </Text>
        </Button>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  linearGradient: {
    position: 'absolute',
    bottom: hScale(60),
    zIndex: 9999,
    width: width * 0.75,
    paddingVertical: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(15),
  },
  text: {
    fontSize: fontSize.large,
    color: colors.white,
  },
});

export default HelloScreen;
