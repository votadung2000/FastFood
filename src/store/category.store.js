import {action, makeAutoObservable} from 'mobx';

import {dataMenu} from '@api';

class CategoryStore {
  category = dataMenu[0];

  constructor() {
    makeAutoObservable(this, {
      updateCategory: action,
    });
  }

  updateCategory(item) {
    this.category = item;
  }
}

export default new CategoryStore();
