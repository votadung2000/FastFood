import {action, makeAutoObservable} from 'mobx';

import {dataProducts} from '@api';

class ProductsStore {
  products = [];
  filterPr = {};

  constructor() {
    makeAutoObservable(this, {
      fetchProducts: action.bound,
    });
  }

  fetchProducts(params) {
    try {
      let filters = {...this.filterPr, ...params};
      if (filters?.group_type) {
        this.products = dataProducts.filter(
          item => item?.group_type === filters?.group_type,
        );
      } else {
        this.products = dataProducts;
      }
    } catch (error) {}
  }
}

export default new ProductsStore();
