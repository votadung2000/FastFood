import {action, makeAutoObservable} from 'mobx';

class HeartProductsStore {
  heartProducts = [];

  constructor() {
    makeAutoObservable(this, {
      fetchHeartProduct: action.bound,
      removeProducts: action.bound,
    });
  }

  fetchHeartProduct(item) {
    try {
      // if (this.heartProducts?.length) {
      let findPr = this.heartProducts.find(pr => pr?.id === item?.id);
      if (findPr) {
        this.removeProducts(item);
      } else {
        this.heartProducts.push(item);
      }
      // } else {
      //   this.heartProducts.push(item);
      // }
    } catch (error) {}
  }

  removeProducts(item) {
    try {
      if (this.heartProducts?.length) {
        this.heartProducts = this.heartProducts.filter(
          pr => pr?.id !== item?.id,
        );
      }
    } catch (error) {}
  }
}

export default new HeartProductsStore();
