import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// routes
import routes from './routes';

// modules
import HomeScreen from './home/HomeScreen';
import ProductsDetailScreen from './detail/ProductsDetailScreen';

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
        <Stack.Screen name={routes.HomeScreen} component={HomeScreen} />
        <Stack.Screen
          name={routes.ProductsDetailScreen}
          component={ProductsDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
