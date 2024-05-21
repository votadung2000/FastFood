import {action, makeAutoObservable, runInAction} from 'mobx';

import {
  ApiLogin,
  ApiUserProfile,
  ApiRegister,
  ApiUpdateProfile,
} from '@actionApi';
import {getToken} from '@storage';

import Notifer from '../components/Notifer';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this, {
      fetchApiLogin: action.bound,
      fetchApiUserProfile: action.bound,
      refetchApiUserProfile: action.bound,
      fetchApiRegister: action.bound,
      fetchApiUpdateProfile: action.bound,

      updateUser: action.bound,
    });
  }

  updateUser(params) {
    this.user = params;
  }

  async fetchApiLogin(data) {
    let response = await ApiLogin(data);
    if (response.data?.data) {
      return response.data?.data;
    }
  }

  async fetchApiUserProfile() {
    try {
      let response = await ApiUserProfile();
      runInAction(() => {
        this.user = response?.data?.data;
      });
    } catch ({response}) {
      Notifer({
        alertType: 'error',
        title: response?.data?.message || '',
      });
    }
  }

  async refetchApiUserProfile() {
    let token = await getToken();
    if (token) {
      this.fetchApiUserProfile();
    }
  }

  async fetchApiRegister(data) {
    let response = await ApiRegister(data);
    if (response.data?.data) {
      return response.data?.data;
    }
  }

  async fetchApiUpdateProfile(data) {
    let response = await ApiUpdateProfile(data);
    if (response.data?.data) {
      return response.data?.data;
    }
  }
}

export default new UserStore();
