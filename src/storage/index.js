import AsyncStorage from '@react-native-community/async-storage';

const _TOKEN = '@TOKEN';
const _CAROUSEL = '@CAROUSEL';

export const setToken = token => {
  return AsyncStorage.setItem(_TOKEN, token);
};

export const getToken = () => {
  return AsyncStorage.getItem(_TOKEN);
};

export const clearToken = () => {
  return AsyncStorage.removeItem(_TOKEN);
};

export const setCarousel = value => {
  return AsyncStorage.setItem(_CAROUSEL, value);
};

export const getCarousel = () => {
  return AsyncStorage.getItem(_CAROUSEL);
};
