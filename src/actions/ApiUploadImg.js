import axios from 'axios';
import Config from 'react-native-config';

import {getToken} from '@storage';

import ApiRoutes from './ApiRoutes';

const axiosUploadImg = axios.create({
  baseURL: Config.API_HOST_V1,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const formatData = data => {
  const form = new FormData();
  form.append('file', data);
  return form;
};

export default async params => {
  let token = await getToken();
  let data = formatData(params);

  return axiosUploadImg({
    method: 'post',
    url: ApiRoutes.uploadImg,
    data,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
