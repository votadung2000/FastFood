import colors from './colors';

const STATUS_ORDER = {
  WAITING: {
    id: 1,
    name: 'Waiting for processing',
    status: 1,
    color: colors.order_waiting,
  },
  PROCESSED: {
    id: 2,
    name: 'Order has been processed',
    status: 2,
    color: colors.order_processed,
  },
  DELIVERING: {
    id: 3,
    name: 'Order is being delivered',
    status: 3,
    color: colors.order_delivering,
  },
  DELIVERED: {
    id: 4,
    name: 'Order has been delivered',
    status: 4,
    color: colors.order_delivered,
  },
  COMPLETED: {
    id: 5,
    name: 'Order has been completed',
    status: 5,
    color: colors.order_completed,
  },
  CANCELED: {
    id: 6,
    name: 'Order has been canceled',
    status: -1,
    color: colors.order_canceled,
  },
};

export const DATA_STATUS_ORDER = Object.values(STATUS_ORDER);

export const findStatusOrder = status => {
  return DATA_STATUS_ORDER.find(ele => ele.status === status);
};

export const checkStatusWaitingOrder = status => {
  if (STATUS_ORDER.WAITING.status === status) {
    return true;
  }
  return false;
};

export const checkStatusCancelOrder = status => {
  if (STATUS_ORDER.CANCELED.status === status) {
    return true;
  }
  return false;
};

export default STATUS_ORDER;
