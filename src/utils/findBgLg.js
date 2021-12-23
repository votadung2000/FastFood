import {colors} from '../constant';

export default index => {
  switch (index) {
    case 0:
      return [colors.price, colors.white];
    case 1:
      return [colors.orange, colors.white];
    case 2:
      return [colors.heart, colors.white];
    case 3:
      return [colors.green, colors.white];
    default:
      return [colors.gray, colors.white];
  }
};
