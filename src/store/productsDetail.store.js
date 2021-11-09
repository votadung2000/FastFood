import {action, makeAutoObservable} from 'mobx';
import {dataProductsDetail, dataExtraFood} from '../actions/Data';
import {findId, filterExtraFood} from '../utils';
class ProductsDetailStore {
  productDetail = {};
  // extraFood = [];

  constructor() {
    makeAutoObservable(this, {
      fetchProductsDetail: action.bound,
      fetchExtraFood: action.bound,
    });
  }

  fetchProductsDetail(id) {
    this.productDetail = findId(dataProductsDetail, id);
  }

  // fetchExtraFood() {
  //   this.extraFood = filterExtraFood(dataExtraFood, productDetail?.extra_food);
  // }
}

export default new ProductsDetailStore();
