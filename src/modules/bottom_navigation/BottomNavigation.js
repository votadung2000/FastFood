import React, {useRef, useState, useEffect} from 'react';
import {Animated, StyleSheet, View, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors, radius} from '@constant';
import {hScale, scale} from '@resolutions';
import {useStore} from '@context';
import routes from '@routes';

import HomeScreen from '../home';
import SearchScreen from '../search';
import CartScreen from '../cart';
import HeartScreen from '../heart';
import NotificationScreen from '../notification';

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
      toValue: showMenu ? 0 : width * 0.6,
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
    Icon: <Ionicons name="home" size={scale(24)} color={colors.gray_D3D1D8} />,
    IconFocused: (
      <Ionicons name="home" size={scale(24)} color={colors.orange_FE724C} />
    ),
    component: HomeScreen,
  },
  {
    id: 2,
    name: routes.SearchScreen,
    keyLabel: 'Search',
    Icon: (
      <Ionicons name="search" size={scale(26)} color={colors.gray_D3D1D8} />
    ),
    IconFocused: (
      <Ionicons name="search" size={scale(26)} color={colors.orange_FE724C} />
    ),
    component: SearchScreen,
  },
  {
    id: 3,
    name: routes.CartScreen,
    keyLabel: 'Cart',
    Icon: <Ionicons name="cart" size={scale(26)} color={colors.gray_D3D1D8} />,
    IconFocused: (
      <Ionicons name="cart" size={scale(26)} color={colors.orange_FE724C} />
    ),
    component: CartScreen,
  },
  {
    id: 4,
    name: routes.HeartScreen,
    keyLabel: 'Heart',
    Icon: <Ionicons name="heart" size={scale(26)} color={colors.gray_D3D1D8} />,
    IconFocused: (
      <Ionicons name="heart" size={scale(26)} color={colors.orange_FE724C} />
    ),
    component: HeartScreen,
  },
  {
    id: 5,
    name: routes.NotificationScreen,
    keyLabel: 'Notification',
    Icon: (
      <Ionicons
        name="notifications"
        size={scale(26)}
        color={colors.gray_D3D1D8}
      />
    ),
    IconFocused: (
      <Ionicons
        name="notifications"
        size={scale(26)}
        color={colors.orange_FE724C}
      />
    ),
    component: NotificationScreen,
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
    height: hScale(72),
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
