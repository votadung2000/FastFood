import {action, makeAutoObservable} from 'mobx';
import {Notifier, NotifierComponents} from 'react-native-notifier';

import {formatCartProducts} from '../utils';
class CartProductsStore {
  cartProducts = [];
  total = 0;
  discount = 0;
  totalCost = 0;

  constructor() {
    makeAutoObservable(this, {
      fetchCartProduct: action.bound,
      updateTotal: action.bound,
      updateDiscount: action.bound,
      updateCost: action.bound,
      plusProducts: action.bound,
      minusProducts: action.bound,
      removeProducts: action.bound,
    });
  }

  fetchCartProduct(item) {
    try {
      if (this.cartProducts?.length) {
        let indexPr = this.cartProducts.findIndex(pr => pr?.id === item?.id);
        if (indexPr === -1) {
          this.cartProducts.push(formatCartProducts(item));
        } else {
          this.cartProducts[indexPr].quantity++;
        }
      } else {
        this.cartProducts.push(formatCartProducts(item));
      }
      this.handleUpdateCost();
      Notifier.showNotification({
        title: 'Thêm vào giỏ hàng thành công.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
        },
      });
    } catch (error) {
      Notifier.showNotification({
        title: 'Thao tác lỗi.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'info',
        },
      });
    }
  }

  updateTotal() {
    try {
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      if (this.cartProducts?.length) {
        let totalArr = this.cartProducts.map(
          pr => parseInt(pr?.price, 10) * parseInt(pr?.quantity, 10),
        );
        this.total = totalArr.reduce(reducer);
      } else {
        this.total = 0;
      }
    } catch (error) {}
  }

  updateCost() {
    this.totalCost = this.total - this.discount;
  }

  handleUpdateCost() {
    this.updateTotal();
    this.updateCost();
  }

  plusProducts(item) {
    try {
      let indexPr = this.cartProducts.findIndex(pr => pr?.id === item?.id);
      this.cartProducts[indexPr].quantity++;
      this.handleUpdateCost();
    } catch (error) {}
  }

  minusProducts(item) {
    try {
      let indexPr = this.cartProducts.findIndex(pr => pr?.id === item?.id);
      let quantity = this.cartProducts[indexPr].quantity;
      if (quantity === 1) {
        this.removeProducts(item);
      } else {
        this.cartProducts[indexPr].quantity--;
      }
      this.handleUpdateCost();
    } catch (error) {}
  }

  removeProducts(item) {
    try {
      this.cartProducts = this.cartProducts.filter(pr => pr?.id !== item?.id);
      this.handleUpdateCost();
      Notifier.showNotification({
        title: 'Xóa sản phẩm thành công.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
        },
      });
    } catch (error) {
      Notifier.showNotification({
        title: 'Thao tác lỗi.',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'info',
        },
      });
    }
  }
}

export default new CartProductsStore();
