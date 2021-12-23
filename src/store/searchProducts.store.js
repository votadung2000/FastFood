import {action, makeAutoObservable} from 'mobx';
import {dataProducts} from '../actions/Data';

class SearchProductsStore {
  productsSearch = [];

  constructor() {
    makeAutoObservable(this, {
      fetchProductsSearch: action.bound,
    });
  }

  fetchProductsSearch(filters) {
    try {
      if (filters) {
        let {name, group_type} = filters;
        if (name || group_type) {
          if (name) {
            this.productsSearch = dataProducts.filter(item =>
              item?.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
            );
          }
          if (group_type) {
            this.productsSearch = dataProducts.filter(
              item => item?.group_type === group_type,
            );
          }
          if (name && group_type) {
            this.productsSearch = dataProducts.filter(
              item =>
                item?.group_type === group_type &&
                item?.name
                  .toLocaleLowerCase()
                  .includes(name.toLocaleLowerCase()),
            );
          }
        }
      } else {
        this.productsSearch = dataProducts;
      }
    } catch (error) {}
  }
}

export default new SearchProductsStore();
