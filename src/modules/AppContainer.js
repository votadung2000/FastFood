import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Notifier, NotifierComponents} from 'react-native-notifier';
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
});

const Label = ({children, focused}) => {
  return (
    <Text bold={focused} style={[styles.label, focused && styles.fcText]}>
      {children}
    </Text>
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
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({focused}) => {
          if (route.name === routes.HomeScreen) {
            return (
              <Ionicons
                name="home"
                size={scale(22)}
                color={focused ? colors.price : colors.gray}
              />
            );
          } else if (route.name === routes.SearchScreen) {
            return (
              <Ionicons
                name="search"
                size={scale(24)}
                color={focused ? colors.orangeSystem : colors.gray}
              />
            );
          } else if (route.name === routes.HeartScreen) {
            return (
              <Ionicons
                name="heart"
                size={scale(24)}
                color={focused ? colors.heart : colors.gray}
              />
            );
          } else if (route.name === routes.CartScreen) {
            return (
              <Ionicons
                name="cart"
                size={scale(25)}
                color={focused ? colors.orange : colors.gray}
              />
            );
          }
        },
      })}>
      <Tab.Screen
        name={routes.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => <Label {...{focused}}>{'Home'}</Label>,
        }}
      />
      <Tab.Screen
        name={routes.SearchScreen}
        component={SearchScreen}
        options={{
          tabBarLabel: ({focused}) => <Label {...{focused}}>{'Search'}</Label>,
        }}
      />
      <Tab.Screen
        name={routes.HeartScreen}
        component={HeartScreen}
        options={{
          tabBarLabel: ({focused}) => <Label {...{focused}}>{'Heart'}</Label>,
        }}
      />
      <Tab.Screen
        name={routes.CartScreen}
        component={CartScreen}
        options={{
          tabBarLabel: ({focused}) => <TotalCart {...{focused}} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const RoutesNavigator = () => {
  return (
    <Layout>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={routes.WelcomeScreen} component={WelcomeScreen} />
        <Stack.Screen
          name={routes.BottomTabNavigator}
          component={BottomTabNavigator}
        />
        <Stack.Screen name={routes.CartScreen} component={CartScreen} />
        <Stack.Screen
          name={routes.ProductsDetailScreen}
          component={ProductsDetailScreen}
        />
        <Stack.Screen
          name={routes.DetailCardSearch}
          component={DetailCardSearch}
        />
        <Stack.Screen name={routes.UserScreen} component={UserScreen} />
        <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
      </Stack.Navigator>
    </Layout>
  );
};

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
        {/* <Stack.Screen name={routes.HelloScreen} component={HelloScreen} /> */}
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
