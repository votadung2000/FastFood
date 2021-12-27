import {colors} from '../constant';

export default index => {
  switch (index) {
    case 0:
      return [colors.price, colors.whiteSystem];
    case 1:
      return [colors.orange, colors.whiteSystem];
    case 2:
      return [colors.heart, colors.whiteSystem];
    case 3:
      return [colors.green, colors.whiteSystem];
    default:
      return [colors.gray, colors.whiteSystem];
  }
};
