import {makeAutoObservable, action, runInAction} from 'mobx';

import {ApiListFAQs} from '@actionApi';

class FAQStore {
  faqs = null;
  isLoadingFAQs = false;

  constructor() {
    makeAutoObservable(this, {
      fetchApiListFAQ: action.bound,
    });
  }

  async fetchApiListFAQ() {
    this.isLoadingFAQs = true;
    try {
      let response = await ApiListFAQs();
      runInAction(() => {
        this.faqs = response?.data;
        this.isLoadingFAQs = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingFAQs = false;
      });
    }
  }
}

export default new FAQStore();
