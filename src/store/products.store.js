import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiListProducts, ApiDetailProduct} from '@actionApi';

const initFilter = {
  page: 1,
  perPage: 10,
};

class ProductsStore {
  products = null;
  filterPr = {};
  isLoadingProducts = false;

  product = null;

  constructor() {
    makeAutoObservable(this, {
      fetchApiListProducts: action.bound,
      fetchApiDetailProducts: action.bound,
    });
  }

  async fetchApiListProducts(params) {
    this.isLoadingProducts = true;
    try {
      let newFilter = {...this.filterPr, ...initFilter, ...params};
      let filter = {...initFilter};
      if (newFilter?.category_id) {
        filter.category_id = newFilter?.category_id?.id;
      }
      this.filterPr = newFilter;
      let response = await ApiListProducts(filter);
      runInAction(() => {
        this.products = response.data;
        this.isLoadingProducts = false;
      });
    } catch (error) {
      this.isLoadingProducts = false;
    }
  }

  async fetchApiDetailProducts(id) {
    try {
      let response = await ApiDetailProduct(id);
      runInAction(() => {
        this.product = response.data;
      });
    } catch (error) {}
  }
}

export default new ProductsStore();
