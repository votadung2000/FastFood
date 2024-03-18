import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigationState, useIsFocused} from '@react-navigation/native';

import {useStore} from '@context';
import {hScale, scale} from '@resolutions';

import {Products, Menu, Header} from './components';
import styles from './styles';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const indexRoute = useNavigationState(state => state?.index);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const {
    categoryStore: {fetchCombineApiCategories},
    productsStore: {clearFilterPr},
    animatedMenuStore: {isShowMenu},
  } = useStore();

  useEffect(() => {
    if (isFocused) {
      fetchCombineApiCategories();

      return () => {
        clearFilterPr();
      };
    }
  }, [indexRoute]);

  const titleHeaderAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    height: animatedValue.interpolate({
      inputRange: [0, hScale(80)],
      outputRange: [hScale(80), 0],
      extrapolate: 'clamp',
    }),
    marginTop: animatedValue.interpolate({
      inputRange: [0, scale(28)],
      outputRange: [scale(28), 0],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={[styles.layout, isShowMenu && styles.stBorderRadius]}>
      <View style={styles.container}>
        <Header titleHeaderAnimation={titleHeaderAnimation} />
        <Menu />
        <Products animatedValue={animatedValue} />
      </View>
    </View>
  );
};

export default observer(HomeScreen);
