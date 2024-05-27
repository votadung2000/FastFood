import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiDeliveryAddress, ApiCreateAddress} from '@actionApi';

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

  async fetchApiDetailAddress(item) {
    this.detailAddress = item;
  }

  clearDetailAddress() {
    this.detailAddress = null;
  }
}

export default new DeliveryAddressStore();
