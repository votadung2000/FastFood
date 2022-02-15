import {action, makeAutoObservable} from 'mobx';
import {dataUser} from '../actions/Data';

class UserStore {
  constructor() {
    makeAutoObservable(this, {
      fetchUser: action.bound,
    });
  }

  fetchUser(user_name, password) {
    try {
      let findUser = dataUser.find(
        user => user?.user_name === user_name.trim().toLocaleLowerCase(),
      );
      if (findUser) {
        return findUser?.password === password.trim().toLocaleLowerCase();
      } else {
        return false;
      }
    } catch (error) {}
  }
}

export default new UserStore();
