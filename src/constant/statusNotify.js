const STATUS = {
  READ: {
    id: 1,
    name: 'Read',
    status: 1,
  },
  UNREAD: {
    id: 1,
    name: 'Unread',
    status: -1,
  },
};

export const STATUS_SETTING_NOTIFY = {
  ON: {
    id: 1,
    name: 'On',
    status: 1,
  },
  OFF: {
    id: 1,
    name: 'Off',
    status: -1,
  },
};

export const checkStatusReadNotify = status => {
  return STATUS.READ.status === status * 1;
};

export const checkStatusOnNotify = status => {
  return STATUS_SETTING_NOTIFY.ON.status === status * 1;
};

export default STATUS;
