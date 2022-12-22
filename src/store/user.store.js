import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiLogin} from '@actionApi';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this, {
      fetchUser: action.bound,

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
}

export default new UserStore();
