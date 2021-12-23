import {action, makeAutoObservable} from 'mobx';
import {dataProducts} from '../actions/Data';

class ProductsStore {
  products = [];

  constructor() {
    makeAutoObservable(this, {
      fetchProducts: action.bound,
    });
  }

  fetchProducts(filters) {
    try {
      if (filters) {
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
