import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiLogin, ApiUserProfile} from '@actionApi';
import {getToken} from '@storage';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this, {
      fetchUser: action.bound,
      fetchApiUserProfile: action.bound,
      refetchApiUserProfile: action.bound,

      updateUser: action.bound,
    });
  }

  updateUser(params) {
    this.user = params;
  }

  async fetchUser(data) {
    try {
      let response = await ApiLogin(data);
      runInAction(() => {
        this.user = response.data;
      });
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
