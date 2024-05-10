import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiFavorites} from '@actionApi';

import userStore from './user.store';

const initFilter = {
  page: 1,
  perPage: 10,
};

class FavoritesStore {
  favorites = null;
  filterFavorites = {};
  isLoadingFavorites = false;
  isFetchingFavorites = false;

  constructor() {
    makeAutoObservable(this, {
      fetchApiListFavorites: action.bound,
      loadMoreListFavorites: action.bound,

      clearFilterFavorites: action.bound,
    });
  }

  async fetchApiListFavorites(params) {
    this.isLoadingFavorites = true;
    try {
      let newFilter = {...this.filterFavorites, ...initFilter, ...params};
      let filter = {...initFilter};
      if (newFilter?.category_id) {
        filter.category_id = newFilter?.category_id?.id;
      }
      if (userStore?.user?.id) {
        filter.user_id = userStore?.user?.id;
      }
      this.filterFavorites = newFilter;

      let response = await ApiFavorites(filter);
      runInAction(() => {
        this.favorites = response.data?.data?.map(ele => ele?.product);
        this.isLoadingFavorites = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingFavorites = false;
      });
    }
  }

  async loadMoreListFavorites() {
    this.isFetchingFavorites = true;
    try {
      let newFilter = {
        ...this.filterFavorites,
        page: this.filterPr?.page + 1,
      };
      let filter = {
        ...initFilter,
        page: this.filterPr?.page + 1,
      };
      if (newFilter?.category_id) {
        filter.category_id = newFilter?.category_id?.id;
      }
      if (userStore?.user?.id) {
        filter.user_id = userStore?.user?.id;
      }
      this.filterFavorites = newFilter;

      let response = await ApiFavorites(filter);
      runInAction(() => {
        let temporaryFavorites = {
          ...response?.data,
          data: [...this.favorites, ...response?.data?.data],
        };
        this.favorites = temporaryFavorites?.map(ele => ele?.product);
        this.isFetchingFavorites = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isFetchingFavorites = false;
      });
    }
  }

  clearFilterFavorites() {
    this.filterFavorites = {};
  }
}

export default new FavoritesStore();
