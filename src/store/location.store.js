import {makeAutoObservable, action} from 'mobx';

import {
  ApiApiLocationWithGeolocation,
  ApiApiLocationWithAddress,
} from '@actionApiLocation';

class LocationStore {
  geolocation = {
    lat: null,
    lon: null,
  };

  constructor() {
    makeAutoObservable(this, {
      fetchApiLocationWithGeolocation: action.bound,
      fetchApiLocationWithAddress: action.bound,

      handleUpdateLocation: action.bound,
    });
  }

  async fetchApiLocationWithGeolocation() {
    let filter = {
      format: 'json',
      addressdetails: 1,
    };

    if (this.geolocation?.lat) {
      filter.lat = this.geolocation?.lat;
    }

    if (this.geolocation?.lon) {
      filter.lon = this.geolocation?.lon;
    }

    let response = await ApiApiLocationWithGeolocation(filter);
    if (response.data) {
      return response.data;
    }
  }

  async fetchApiLocationWithAddress(params) {
    let filter = {
      format: 'json',
      addressdetails: 1,
      q: params?.address,
    };

    let response = await ApiApiLocationWithAddress(filter);
    if (response.data) {
      return response.data;
    }
  }

  handleUpdateLocation(val) {
    this.geolocation = {
      lat: val.lat,
      lon: val.lon,
    };
  }
}

export default new LocationStore();
