import {action, makeAutoObservable} from 'mobx';

import ApiUploadImg from '../actions/ApiUploadImg';

class UploadImg {
  constructor() {
    makeAutoObservable(this, {
      fetchApiUploadImg: action.bound,
    });
  }

  async fetchApiUploadImg(data) {
    let response = await ApiUploadImg(data);
    if (response.data?.data) {
      return response.data?.data;
    }
  }
}

export default new UploadImg();
