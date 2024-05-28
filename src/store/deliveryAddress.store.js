import {action, makeAutoObservable, runInAction} from 'mobx';

import {
  ApiDeliveryAddress,
  ApiCreateAddress,
  ApiDetailDeliveryAddress,
} from '@actionApi';

class DeliveryAddressStore {
  address = null;
  isLoadingAddress = false;

  detailAddress = null;

  constructor() {
    makeAutoObservable(this, {
      fetchApiListAddress: action.bound,
      fetchApiCreateAddress: action.bound,
      fetchApiDetailAddress: action.bound,

      clearDetailAddress: action.bound,
    });
  }

  async fetchApiListAddress(params) {
    this.isLoadingAddress = true;
    try {
      let response = await ApiDeliveryAddress(params);
      runInAction(() => {
        this.address = response.data?.data;
        this.isLoadingAddress = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingAddress = false;
      });
    }
  }

  async fetchApiCreateAddress(params) {
    let response = await ApiCreateAddress(params);
    if (response) {
      return response?.data;
    }
  }

  async fetchApiDetailAddress(id) {
    try {
      let response = await ApiDetailDeliveryAddress(id);
      runInAction(() => {
        this.detailAddress = response.data?.data;
      });
    } catch (error) {}
  }

  clearDetailAddress() {
    this.detailAddress = null;
  }
}

export default new DeliveryAddressStore();
