import React, {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {observer} from 'mobx-react';
import NetInfo from '@react-native-community/netinfo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import routes from '@routes';

import {Layout} from '@views';

import CarouselScreen from './carousel/CarouselScreen';
import WelcomeScreen from './welcome/WelcomeScreen';
import HomeScreen from './home/HomeScreen';
import ProductsDetailScreen from './detail/ProductsDetailScreen';
import HeartScreen from './heart/HeartScreen';
import CartScreen from './cart/CartScreen';
import UserScreen from './user/UserScreen';
import SearchScreen from './search/SearchScreen';
import DetailCardSearch from './detail_card_search/DetailCardSearch';
import LoginScreen from './login/LoginScreen';

import {resolutions} from '@utils';
import {colors, fontSize} from '@constant';
import {Text, TotalCart} from '@components';
import {useStore} from '@context';
import {wScale} from '@resolutions';

const {scale, hScale} = resolutions;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: hScale(52),
    paddingBottom: 0,
  },
  label: {
    textAlign: 'center',
    fontSize: fontSize.small,
  },
  fcText: {
    color: colors.orange,
  },

  containerViewTab: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwIconViewTab: {
    width: wScale(25),
    height: wScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 0 : scale(2),
  },
  txtLabelTB: {
    textAlign: 'center',
    fontSize: fontSize.small,
  },
  txtLabelTBFocused: {
    color: colors.orange,
  },
});

const ViewTabBottom = ({data, focused}) => {
  if (data?.name === routes.CartScreen) {
    return <TotalCart focused={focused} data={data} />;
  }

  return (
    <View style={styles.containerViewTab}>
      <View style={styles.vwIconViewTab}>
        {focused ? data?.IconFocused : data?.Icon}
      </View>
      <Text
        medium
        style={[styles.txtLabelTB, focused && styles.txtLabelTBFocused]}>
        {data.keyLabel}
      </Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.HomeScreen}
      backBehavior="initialRoute"
      screenOptions={({route}) => ({
        headerShown: false,
        gestureEnabled: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      })}>
      {TabBottomArr?.map(item => {
        return (
          <Tab.Screen
            key={item?.id}
            name={item?.name}
            component={item.component}
            options={{
              tabBarIcon: props => <ViewTabBottom data={item} {...props} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const RoutesNavigator = observer(() => {
  const {
    userStore: {user},
  } = useStore();

  return (
    <Layout>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}>
        {user
          ? RoutesUser?.map(item => (
              <Stack.Screen
                key={item?.id}
                name={item?.name}
                component={item?.component}
              />
            ))
          : Routes?.map(item => (
              <Stack.Screen
                key={item?.id}
                name={item?.name}
                component={item?.component}
              />
            ))}
      </Stack.Navigator>
    </Layout>
  );
});

const AppContainer = () => {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state?.isConnected) {
        Notifier.showNotification({
          title: 'Disconnected',
          description: 'Please check the network connect!',
          duration: 4000,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      }
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={routes.CarouselScreen} component={CarouselScreen} />
        <Stack.Screen
          name={routes.RoutesNavigator}
          component={RoutesNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;

const RoutesUser = [
  {
    id: 1,
    name: routes.BottomTabNavigator,
    component: BottomTabNavigator,
  },
  {
    id: 2,
    name: routes.CartScreen,
    component: CartScreen,
  },
  {
    id: 3,
    name: routes.ProductsDetailScreen,
    component: ProductsDetailScreen,
  },
  {
    id: 4,
    name: routes.DetailCardSearch,
    component: DetailCardSearch,
  },
  {
    id: 5,
    name: routes.UserScreen,
    component: UserScreen,
  },
];

const Routes = [
  {
    id: 1,
    name: routes.WelcomeScreen,
    component: WelcomeScreen,
  },
  {
    id: 2,
    name: routes.LoginScreen,
    component: LoginScreen,
  },
];

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
