import {makeAutoObservable, action} from 'mobx';

import {ApiCreateOrder} from '@actionApi';
import {TAB_ORDER} from '@constant';

class OrderStore {
  tab = TAB_ORDER.UPCOMING;

  constructor() {
    makeAutoObservable(this, {
      fetchApiCreateOrder: action.bound,

      handleTabSwitch: action.bound,
    });
  }

  async fetchApiCreateOrder(params) {
    let response = await ApiCreateOrder(params);
    if (response?.data?.data) {
      return response?.data?.data;
    }
  }

  handleTabSwitch(item) {
    this.tab = item;
  }
}

export default new OrderStore();
