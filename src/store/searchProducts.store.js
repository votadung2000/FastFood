import {action, makeAutoObservable} from 'mobx';
import {dataProducts} from '../actions/Data';
import {removeAccent} from '../utils';

class SearchProductsStore {
  productsSearch = [];
  productsSearchContainer = [];
  menuSearch = {};

  constructor() {
    makeAutoObservable(this, {
      fetchProductsSearch: action.bound,
      fetchProductsSearchContainer: action.bound,
      updateMenuSearch: action.bound,
    });
  }

  fetchProductsSearch(filters) {
    try {
      if (filters) {
        let {name, group_type} = filters;
        if (name || group_type) {
          if (name) {
            this.productsSearch = dataProducts.filter(item =>
              removeAccent(item?.name)
                .toLocaleLowerCase()
                .includes(removeAccent(name).toLocaleLowerCase()),
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
                removeAccent(item?.name)
                  .toLocaleLowerCase()
                  .includes(removeAccent(name).toLocaleLowerCase()),
            );
          }
        }
      } else {
        this.productsSearch = dataProducts;
      }
    } catch (error) {}
  }

  fetchProductsSearchContainer(filters) {
    try {
      let {name} = filters;
      if (name?.length) {
        this.productsSearchContainer = dataProducts.filter(item =>
          removeAccent(item?.name)
            .toLocaleLowerCase()
            .includes(removeAccent(name).toLocaleLowerCase()),
        );
      } else {
        this.productsSearchContainer = [];
      }
    } catch (error) {}
  }

  updateMenuSearch(menu) {
    this.menuSearch = menu;
  }
}

export default new SearchProductsStore();
