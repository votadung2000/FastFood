import React, {useEffect} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {observer} from 'mobx-react';
import NetInfo from '@react-native-community/netinfo';
import RNBootSplash from 'react-native-bootsplash';

import routes from '@routes';

import {Layout} from '@views';
import {useStore} from '@context';

import CarouselScreen from './carousel';
import WelcomeScreen from './welcome';
import ProductsDetailScreen from './detail';
import CartScreen from './cart';
import ProfileScreen from './profile';
import EditProfileScreen from './edit_profile';
import DetailCardSearch from './detail_card_search';
import LoginScreen from './login';
import RegisterScreen from './register';
import OTPScreen from './otp';
import ResetPasswordScreen from './reset_password';
import BottomNavigation from './bottom_navigation';

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

  const {
    userStore: {refetchApiUserProfile},
  } = useStore();

  useEffect(() => {
    RNBootSplash.hide();

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

    refetchApiUserProfile();
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
    name: routes.BottomNavigation,
    component: BottomNavigation,
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
    name: routes.ProfileScreen,
    component: ProfileScreen,
  },
  {
    id: 6,
    name: routes.OTPScreen,
    component: OTPScreen,
  },
  {
    id: 6,
    name: routes.EditProfileScreen,
    component: EditProfileScreen,
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
  {
    id: 3,
    name: routes.RegisterScreen,
    component: RegisterScreen,
  },
  {
    id: 4,
    name: routes.OTPScreen,
    component: OTPScreen,
  },
  {
    id: 5,
    name: routes.ResetPasswordScreen,
    component: ResetPasswordScreen,
  },
];
