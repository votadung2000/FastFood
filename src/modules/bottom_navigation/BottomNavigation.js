import React, {useRef, useState, useEffect} from 'react';
import {Animated, StyleSheet, View, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors, radius} from '@constant';
import {hScale, scale} from '@resolutions';
import {useStore} from '@context';
import routes from '@routes';

import HomeScreen from '../home/HomeScreen';
import SearchScreen from '../search/SearchScreen';
import HeartScreen from '../heart/HeartScreen';
import CartScreen from '../cart/CartScreen';

import {TabBottom, Menu} from './components';

const {width} = Dimensions.get('window');

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const {
    animatedMenuStore: {isShowMenu},
  } = useStore();

  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    handleShowMenu();
  }, [isShowMenu]);

  const handleShowMenu = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : width * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.container}>
      <Menu />
      <Animated.View
        style={[
          styles.vwScreen,
          showMenu && styles.stBorderRadius,
          {
            transform: [{scale: scaleValue}, {translateX: offsetValue}],
          },
        ]}>
        {showMenu ? <View style={styles.disable} /> : null}
        <View style={[styles.content, showMenu && styles.stBorderRadius]}>
          <Tab.Navigator
            initialRouteName={routes.HomeScreen}
            backBehavior="initialRoute"
            sceneContainerStyle={showMenu && styles.stBorderRadius}
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              tabBarShowLabel: false,
              tabBarStyle: [
                styles.tabBarStyle,
                showMenu && styles.stBorderLeftRadius,
              ],
            }}>
            {TabBottomArr?.map(item => {
              return (
                <Tab.Screen
                  key={item?.id}
                  name={item?.name}
                  component={item.component}
                  options={{
                    tabBarIcon: props => <TabBottom data={item} {...props} />,
                  }}
                />
              );
            })}
          </Tab.Navigator>
        </View>
      </Animated.View>
    </View>
  );
};

const TabBottomArr = [
  {
    id: 1,
    name: routes.HomeScreen,
    keyLabel: 'Home',
    Icon: <Ionicons name="home" size={scale(22)} color={colors.gray} />,
    IconFocused: <Ionicons name="home" size={scale(22)} color={colors.price} />,
    component: HomeScreen,
  },
  {
    id: 2,
    name: routes.SearchScreen,
    keyLabel: 'Search',
    Icon: <Ionicons name="search" size={scale(24)} color={colors.gray} />,
    IconFocused: (
      <Ionicons name="search" size={scale(24)} color={colors.orangeSystem} />
    ),
    component: SearchScreen,
  },
  {
    id: 3,
    name: routes.HeartScreen,
    keyLabel: 'Heart',
    Icon: <Ionicons name="heart" size={scale(24)} color={colors.gray} />,
    IconFocused: (
      <Ionicons name="heart" size={scale(24)} color={colors.heart} />
    ),
    component: HeartScreen,
  },
  {
    id: 4,
    name: routes.CartScreen,
    keyLabel: 'Cart',
    Icon: <Ionicons name="cart" size={scale(25)} color={colors.gray} />,
    IconFocused: (
      <Ionicons name="cart" size={scale(25)} color={colors.orange} />
    ),
    component: CartScreen,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  vwScreen: {
    flexGrow: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  disable: {
    position: 'absolute',
    top: scale(100),
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tabBarStyle: {
    position: 'absolute',
    height: hScale(52),
    paddingBottom: 0,
  },
  stBorderRadius: {
    borderRadius: radius.radius14,
  },
  stBorderLeftRadius: {
    borderBottomLeftRadius: radius.radius14,
  },
});

export default observer(BottomNavigation);
