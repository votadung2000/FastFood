import moment from 'moment';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-community/async-storage';

const KEY = '@LOGGING';

export const logging = async ({ response }) => {
  if (response) {
    let error = {
      url: response?.config?.url,
      status: response?.status,
      data: response?.data,
      body: response?.config?.data,
      created_at: moment().unix(),
    };
    let local = await AsyncStorage.getItem(KEY);
    if (local) {
      let newData = JSON.parse(local);
      newData.unshift(error);
      AsyncStorage.setItem(KEY, JSON.stringify(newData));
    } else {
      AsyncStorage.setItem(KEY, JSON.stringify([error]));
    }
  }
};

export const getLogs = async () => {
  let results = await AsyncStorage.getItem(KEY);
  if (results) {
    return JSON.parse(results);
  }
  return [];
};

export const removeLogs = () => AsyncStorage.removeItem(KEY);
