import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiDeliveryAddress} from '@actionApi';

class DeliveryAddressStore {
  address = null;
  isLoadingAddress = false;

  constructor() {
    makeAutoObservable(this, {
      fetchApiListAddress: action.bound,
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
}

export default new DeliveryAddressStore();
