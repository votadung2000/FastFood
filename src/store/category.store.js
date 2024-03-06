import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiListCategories} from '@actionApi';

import productsStore from './products.store';

class CategoryStore {
  categories = null;
  isLoadingCategories = false;

  constructor() {
    makeAutoObservable(this, {
      fetchApiListCategories: action.bound,
      fetchCombineApiCategories: action.bound,
    });
  }

  async fetchApiListCategories() {
    this.isLoadingCategories = true;
    try {
      let response = await ApiListCategories();
      runInAction(() => {
        this.categories = response.data;
        this.isLoadingCategories = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingCategories = false;
      });
    }
  }

  async fetchCombineApiCategories() {
    this.isLoadingCategories = true;
    try {
      let response = await ApiListCategories();
      runInAction(() => {
        this.categories = response.data;
        this.isLoadingCategories = false;
        productsStore.fetchApiListProducts({
          category_id: response.data?.data[0],
        });
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingCategories = false;
      });
    }
  }
}

export default new CategoryStore();
