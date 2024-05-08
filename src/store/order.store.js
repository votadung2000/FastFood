import {makeAutoObservable, action} from 'mobx';

import {ApiCreateOrder} from '@actionApi';

class OrderStore {
  constructor() {
    makeAutoObservable(this, {
      fetchApiCreateOrder: action.bound,
    });
  }

  async fetchApiCreateOrder(params) {
    let response = await ApiCreateOrder(params);
    if (response?.data?.data) {
      return response?.data?.data;
    }
  }
}

export default new OrderStore();
