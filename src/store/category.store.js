import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiGetListCategories} from '@actionApi';

class CategoryStore {
  categories = null;
  isLoadingCategories = false;

  constructor() {
    makeAutoObservable(this, {
      fetchApiGetListCategories: action.bound,
    });
  }

  updateCategory(item) {
    this.category = item;
  }

  async fetchApiGetListCategories() {
    this.isLoadingCategories = true;
    try {
      let response = await ApiGetListCategories();
      runInAction(() => {
        this.categories = response.data;
      });
    } catch (error) {
      this.isLoadingCategories = false;
    }
  }
}

export default new CategoryStore();
