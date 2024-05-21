import * as fontSize from './fontSize';
import colors from './colors';
import radius from './radius';

import DATA_CAROUSEL from './dataCarousel';
import OPTION_IMAGE, {DATA_OPTION_IMAGE} from './dataOptionImage';
import TAB_ORDER, {DATA_TAB_ORDER} from './dataTabOrder';

import STATUS_NOTIFY, {
  STATUS_SETTING_NOTIFY,
  checkStatusReadNotify,
  checkStatusOnNotify,
} from './statusNotify';
import STATUS_ORDER, {
  DATA_STATUS_ORDER,
  findStatusOrder,
  checkStatusWaitingOrder,
  checkStatusCancelOrder,
} from './statusOrder';

import TYPE_DELIVERY_ADDRESS, {
  DATA_TYPE_DELIVERY_ADDRESS,
  findTypeDeliveryAddress,
} from './typeDeliveryAddress';
import TYPE_RATING, {DATA_TYPE_RATING, findTypeRating} from './typeRating';

export {
  colors,
  fontSize,
  radius,
  DATA_CAROUSEL,
  OPTION_IMAGE,
  DATA_OPTION_IMAGE,
  TAB_ORDER,
  DATA_TAB_ORDER,
  STATUS_NOTIFY,
  STATUS_SETTING_NOTIFY,
  checkStatusReadNotify,
  checkStatusOnNotify,
  STATUS_ORDER,
  DATA_STATUS_ORDER,
  findStatusOrder,
  checkStatusWaitingOrder,
  checkStatusCancelOrder,
  TYPE_DELIVERY_ADDRESS,
  DATA_TYPE_DELIVERY_ADDRESS,
  findTypeDeliveryAddress,
  TYPE_RATING,
  DATA_TYPE_RATING,
  findTypeRating,
};
