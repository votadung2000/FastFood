import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiLogin, ApiUserProfile} from '@actionApi';
import {getToken} from '@storage';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this, {
      fetchLogin: action.bound,
      fetchApiUserProfile: action.bound,
      refetchApiUserProfile: action.bound,

      updateUser: action.bound,
    });
  }

  updateUser(params) {
    this.user = params;
  }

  async fetchLogin(data) {
    try {
      let response = await ApiLogin(data);
      if (response.data?.data) {
        return response.data?.data;
      }
    } catch (error) {}
  }

  async fetchApiUserProfile() {
    try {
      let response = await ApiUserProfile();
      runInAction(() => {
        this.user = response?.data?.data;
      });
    } catch (error) {}
  }

  async refetchApiUserProfile() {
    let token = await getToken();
    if (token) {
      this.fetchApiUserProfile();
    }
  }
}

export default new UserStore();
