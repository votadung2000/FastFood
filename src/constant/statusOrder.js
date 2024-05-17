const STATUS_ORDER = {
  WAITING: {
    id: 1,
    name: 'Waiting for processing',
    status: 1,
  },
  PROCESSED: {
    id: 2,
    name: 'Order has been processed',
    status: 2,
  },
  DELIVERING: {
    id: 3,
    name: 'Order is being delivered',
    status: 3,
  },
  DELIVERED: {
    id: 4,
    name: 'Order has been delivered',
    status: 4,
  },
  COMPLETED: {
    id: 5,
    name: 'Order has been completed',
    status: 5,
  },
  CANCELED: {
    id: 6,
    name: 'Order has been canceled',
    status: -1,
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
