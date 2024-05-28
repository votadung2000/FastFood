import {Platform} from 'react-native';
import {
  getUniqueId,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';
import Config from 'react-native-config';
import axios from 'axios';

import {clearToken, getToken} from '@storage';

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
    config.baseURL = Config.API_HOST_V1;
    config.headers;
    if (
      !config.url.includes(ApiRoutes.login) &&
      !config.url.includes(ApiRoutes.register)
    ) {
      const token = await getToken();
      config.headers.Authorization = 'Bearer ' + token;
    }
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
  async error => {
    if (__DEV__) {
      if (!error?.response) {
        console.log(error);
      } else {
        const {config, status, data} = error?.response || {};
        console.log(`URL: ${config?.url}\n`, `STATUS: ${status}\n`, data);

        if (status === 400 && data?.error_key === 'ERR_TOKEN_NOT_FOUND') {
          await clearToken();
        }
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

export const ApiRegister = body => {
  let data = {...body, ...infoDevices};
  return axios({
    method: 'post',
    url: ApiRoutes.register,
    data: data,
  });
};

export const ApiUserProfile = () => {
  return axios({
    method: 'get',
    url: ApiRoutes.profile,
  });
};

export const ApiUpdateProfile = data => {
  return axios({
    method: 'patch',
    url: ApiRoutes.updateProfile,
    data: data,
  });
};

export const ApiListCategories = () => {
  return axios({
    method: 'get',
    url: ApiRoutes.category,
  });
};

export const ApiListProducts = params => {
  return axios({
    method: 'get',
    url: ApiRoutes.product,
    params,
  });
};

export const ApiDetailProduct = id => {
  return axios({
    method: 'get',
    url: `${ApiRoutes.product}/${id}`,
  });
};

export const ApiFavorites = params => {
  return axios({
    method: 'get',
    url: ApiRoutes.favorite,
    params,
  });
};

export const ApiCDFavorite = data => {
  return axios({
    method: 'post',
    url: ApiRoutes.favorite + '/cd_favorite',
    data,
  });
};

export const ApiCreateOrder = data => {
  return axios({
    method: 'post',
    url: ApiRoutes.order,
    data: data,
  });
};

export const ApiListOrder = params => {
  return axios({
    method: 'get',
    url: ApiRoutes.order,
    params,
  });
};

export const ApiDetailOrder = id => {
  return axios({
    method: 'get',
    url: `${ApiRoutes.order}/${id}`,
  });
};

export const ApiUpdateOrder = ({id, data}) => {
  return axios({
    method: 'patch',
    url: `${ApiRoutes.order}/${id}`,
    data,
  });
};

export const ApiDeliveryAddress = params => {
  return axios({
    method: 'get',
    url: ApiRoutes.deliveryAddress,
    params,
  });
};

export const ApiDetailDeliveryAddress = id => {
  return axios({
    method: 'get',
    url: `${ApiRoutes.deliveryAddress}/${id}`,
  });
};

export const ApiCreateAddress = data => {
  return axios({
    method: 'post',
    url: ApiRoutes.deliveryAddress,
    data,
  });
};
