import {action, makeAutoObservable} from 'mobx';

import {formatCartProducts} from '@utils';
import {Notifer} from '@components';

class CartProductsStore {
  cartProducts = [];
  subtotal = 0;
  discount = 0;
  total = 0;

  constructor() {
    makeAutoObservable(this, {
      fetchCartProduct: action.bound,

      updateTotal: action.bound,
      updateDiscount: action.bound,
      updateCost: action.bound,
      plusProducts: action.bound,
      minusProducts: action.bound,
      removeProducts: action.bound,

      clearCart: action.bound,
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
      Notifer({
        title: 'Thêm vào giỏ hàng thành công.',
        alertType: 'success',
      });
    } catch (error) {
      Notifer({
        title: 'Thao tác lỗi.',
        alertType: 'info',
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
        this.subtotal = totalArr.reduce(reducer);
      } else {
        this.subtotal = 0;
      }
    } catch (error) {}
  }

  updateCost() {
    this.total = this.subtotal - this.discount;
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
      Notifer({
        title: 'Xóa sản phẩm thành công.',
        alertType: 'success',
      });
    } catch (error) {
      Notifer({
        title: 'Thao tác lỗi.',
        alertType: 'info',
      });
    }
  }

  clearCart() {
    this.cartProducts = [];
    this.subtotal = 0;
    this.discount = 0;
    this.total = 0;
  }
}

export default new CartProductsStore();
