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
  isFetchingProducts = false;

  product = null;

  constructor() {
    makeAutoObservable(this, {
      fetchApiListProducts: action.bound,
      fetchApiDetailProducts: action.bound,

      loadMoreListProducts: action.bound,
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
        this.products = response?.data;
        this.isLoadingProducts = false;
      });
    } catch (error) {
      this.isLoadingProducts = false;
    }
  }

  async loadMoreListProducts() {
    this.isFetchingProducts = true;
    try {
      let newFilter = {
        ...this.filterPr,
        page: this.filterPr?.page + 1,
      };
      let filter = {
        ...initFilter,
        page: this.filterPr?.page + 1,
      };
      if (newFilter?.category_id) {
        filter.category_id = newFilter?.category_id?.id;
      }
      this.filterPr = newFilter;
      let response = await ApiListProducts(filter);
      runInAction(() => {
        this.products = {
          ...response?.data,
          data: [...this.products, ...response?.data?.data],
        };
        this.isFetchingProducts = false;
      });
    } catch (error) {
      this.isFetchingProducts = false;
    }
  }

  async fetchApiDetailProducts(id) {
    try {
      let response = await ApiDetailProduct(id);
      runInAction(() => {
        this.product = response?.data?.data;
      });
    } catch (error) {}
  }
}

export default new ProductsStore();
