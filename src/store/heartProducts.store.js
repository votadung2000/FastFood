import {action, makeAutoObservable} from 'mobx';
class HeartProductsStore {
  heartProducts = [];
  allHeartProducts = [];
  menu = {};

  constructor() {
    makeAutoObservable(this, {
      addHeartProduct: action.bound,
      removeHeartProducts: action.bound,
      fetchHeartProduct: action.bound,
    });
  }

  fetchHeartProduct(itemMenu) {
    try {
      if (itemMenu) {
        this.menu = itemMenu;
        this.heartProducts = this.allHeartProducts.filter(
          item => item?.group_type === itemMenu?.id,
        );
      } else {
        this.heartProducts = this.allHeartProducts;
      }
    } catch (error) {}
  }

  addHeartProduct(item) {
    try {
      let findPr = this.allHeartProducts.find(pr => pr?.id === item?.id);
      if (findPr) {
        this.removeHeartProducts(item);
      } else {
        if (Object.keys(this.menu)?.length) {
          let newArrPr = [...this.heartProducts, item];
          this.heartProducts = newArrPr.filter(
            nw => nw?.group_type === this.menu?.id,
          );
        }
        this.allHeartProducts.push(item);
      }
    } catch (error) {}
  }

  removeHeartProducts(item) {
    try {
      let newArrPr = this.allHeartProducts.filter(pr => pr?.id !== item?.id);
      if (Object.keys(this.menu)?.length) {
        this.heartProducts = newArrPr.filter(
          nw => nw?.group_type === this.menu?.id,
        );
      } else {
        this.heartProducts = newArrPr;
      }
      this.allHeartProducts = newArrPr;
    } catch (error) {}
  }
}

export default new HeartProductsStore();
