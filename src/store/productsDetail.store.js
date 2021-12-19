import {action, makeAutoObservable} from 'mobx';
import {dataProductsDetail, dataExtraFood} from '../actions/Data';
import {findId, filterExtraFood} from '../utils';
class ProductsDetailStore {
  productDetail = {};
  extraFood = [];

  constructor() {
    makeAutoObservable(this, {
      fetchProductsDetail: action.bound,
    });
  }

  fetchProductsDetail(id) {
    try {
      const data = findId(dataProductsDetail, id);
      this.productDetail = data;
      this.extraFood = filterExtraFood(dataExtraFood, data?.extra_food);
    } catch (error) {}
  }
}

export default new ProductsDetailStore();
