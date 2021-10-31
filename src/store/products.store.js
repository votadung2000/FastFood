import {action, makeAutoObservable} from 'mobx';
import {dataProducts} from '../actions/Data';

class ProductsStore {
  products = [];
  filters = {};

  constructor() {
    makeAutoObservable(this, {
      fetchProducts: action.bound,
      updateFilters: action.bound,
    });
  }

  fetchProducts(filters) {
    if (filters) {
      let {name, group_type} = Object.assign(this.filters, filters);
      if (name || group_type) {
        if (name) {
          this.products = dataProducts.filter(item =>
            item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
          );
        }
        if (group_type) {
          this.products = dataProducts.filter(
            item => item.group_type === group_type,
          );
        }
        if (name && group_type) {
          this.products = dataProducts.filter(
            item =>
              item.group_type === group_type &&
              item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
          );
        }
      }
    } else {
      this.products = dataProducts;
    }
  }

  updateFilters(filters) {
    this.filters = Object.assign(this.filters, filters);
  }
}

export default new ProductsStore();
