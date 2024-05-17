import {makeAutoObservable, action, runInAction} from 'mobx';

import {ApiCreateOrder, ApiListOrder} from '@actionApi';
import {TAB_ORDER} from '@constant';

class OrderStore {
  tab = TAB_ORDER.UPCOMING;

  orders = null;
  isLoadingOrders = false;

  constructor() {
    makeAutoObservable(this, {
      fetchApiCreateOrder: action.bound,
      fetchApiListOrder: action.bound,

      initTab: action.bound,

      handleTabSwitch: action.bound,
    });
  }

  async fetchApiCreateOrder(params) {
    let response = await ApiCreateOrder(params);
    if (response?.data?.data) {
      return response?.data?.data;
    }
  }

  async fetchApiListOrder(params) {
    this.isLoadingOrders = true;
    try {
      let response = await ApiListOrder(params);
      runInAction(() => {
        this.orders = response?.data?.data;
        this.isLoadingOrders = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingOrders = false;
      });
    }
  }

  handleTabSwitch(item) {
    this.tab = item;
  }

  initTab() {
    this.tab = TAB_ORDER.UPCOMING;
  }
}

export default new OrderStore();
