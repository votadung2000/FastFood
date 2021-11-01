import {action, makeAutoObservable} from 'mobx';
import {dataProductsDetail} from '../actions/Data';
import {findId} from '../utils';

class ProductsDetailStore {
  productDetail = {};

  constructor() {
    makeAutoObservable(this, {
      fetchProductsDetail: action.bound,
    });
  }

  fetchProductsDetail(id) {
    this.productDetail = findId(dataProductsDetail, id);
  }
}

export default new ProductsDetailStore();
