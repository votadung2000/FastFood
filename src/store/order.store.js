import {makeAutoObservable, action, runInAction} from 'mobx';

import {ApiCreateOrder, ApiListOrder, ApiUpdateOrder} from '@actionApi';
import {TAB_ORDER} from '@constant';

class OrderStore {
  tab = TAB_ORDER.UPCOMING;

  orders = null;
  isLoadingOrders = false;

  order = null;

  rating = null;

  constructor() {
    makeAutoObservable(this, {
      fetchApiCreateOrder: action.bound,
      fetchApiListOrder: action.bound,
      fetchApiUpdateOrder: action.bound,

      initTab: action.bound,
      handleOrderDetails: action.bound,
      fetchRating: action.bound,

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

  async fetchApiUpdateOrder(params) {
    const {id, ...restParams} = params;
    let response = await ApiUpdateOrder({
      id: id,
      data: restParams,
    });
    if (response.data?.data) {
      return response.data?.data;
    }
  }

  handleOrderDetails(item) {
    this.order = item;
  }

  fetchRating(item) {
    this.rating = item;
  }

  handleTabSwitch(item) {
    this.tab = item;
  }

  initTab() {
    this.tab = TAB_ORDER.UPCOMING;
  }
}

export default new OrderStore();
