const DEFAULT_DELIVERY_ADDRESS = {
  DEFAULT: {
    id: 1,
    name: 'Default',
    type: 1,
  },
  NOT_DEFAULT: {
    id: 2,
    name: 'Not Default',
    type: -1,
  },
};

export const DATA_DEFAULT_DELIVERY_ADDRESS = Object.values(
  DEFAULT_DELIVERY_ADDRESS,
);

export const findDefaultDeliveryAddress = type => {
  return DATA_DEFAULT_DELIVERY_ADDRESS.find(ele => ele?.type === type);
};

export const checkDefaultDeliveryAddress = type => {
  return DEFAULT_DELIVERY_ADDRESS.DEFAULT.type === type;
};

export default DEFAULT_DELIVERY_ADDRESS;
