import {action, makeAutoObservable} from 'mobx';

class AnimatedMenu {
  isShowMenu = false;

  constructor() {
    makeAutoObservable(this, {
      handleShowMenu: action.bound,
    });
  }

  handleShowMenu() {
    this.isShowMenu = !this.isShowMenu;
  }
}

export default new AnimatedMenu();
