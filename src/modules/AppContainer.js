import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// routes
import routes from './routes';

// modules
import HomeScreen from './home/HomeScreen';
import ProductsDetailScreen from './detail/ProductsDetailScreen';
import HeartScreen from './heart/HeartScreen';
import CartScreen from './cart/CartScreen';

import {scale} from '../utils/resolutions';
import {colors, fontSize} from '../constant';
import {Text} from '../components';

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontSize: fontSize.tiny,
    paddingBottom: scale(4),
  },
});

const Label = ({children, focused}) => {
  return (
    <Text
      bold={focused ? true : false}
      color={focused ? colors.orange : colors.gray}
      style={styles.label}>
      {children}
    </Text>
  );
};

const Tab = createBottomTabNavigator();

const TabApp = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.HomeScreen}
      backBehavior="initialRoute"
      screenOptions={({route}) => ({
        headerShown: false,
        gestureEnabled: false,
        tabBarIcon: ({focused}) => {
          if (route.name === routes.HomeScreen) {
            return (
              <Ionicons
                name="home"
                size={scale(22)}
                color={focused ? colors.price : colors.gray}
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
                size={scale(24)}
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
          tabBarLabel: ({focused}) => <Label {...{focused}}>{'Cart'}</Label>,
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={'TabApp'} component={TabApp} />
        <Stack.Screen
          name={routes.ProductsDetailScreen}
          component={ProductsDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
