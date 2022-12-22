import {Platform} from 'react-native';
import {
  getUniqueId,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';
import Config from 'react-native-config';
import axios from 'axios';

import ApiRoutes from './ApiRoutes';

// Android os = 2
const infoDevices = {
  unique_id: getUniqueId(),
  device_info: {
    os: Platform.OS === 'android' ? 2 : 1,
    ver: getSystemVersion(),
  },
  app_info: {
    os: Platform.OS === 'android' ? 2 : 1,
    ver: getVersion(),
  },
};

axios.interceptors.request.use(
  async config => {
    console.log('API_HOST_V1', Config.API_HOST_V1);
    config.baseURL = Config.API_HOST_V1;
    config.headers;
    if (!config.url.includes(ApiRoutes.login)) {
      // const token = await getToken();
      // config.headers.Authorization = 'Bearer' + token;
    }
    console.log('config', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (__DEV__) {
      if (!error?.response) {
        console.log(error);
      } else {
        const {config, status, data} = error?.response || {};
        console.log(`URL: ${config?.url}\n`, `STATUS: ${status}\n`, data);
      }
    }
    return Promise.reject(error);
  },
);

export const ApiLogin = body => {
  let data = {...body, ...infoDevices};
  return axios({
    method: 'post',
    url: ApiRoutes.login,
    data: data,
  });
};
