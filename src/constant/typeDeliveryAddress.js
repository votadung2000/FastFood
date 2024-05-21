import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {wScale} from '@resolutions';
import {SVG_Type_Home, SVG_Type_Office} from '@svg';
import colors from './colors';

const TYPE = {
  HOME: {
    id: 1,
    name: 'Home',
    type: 1,
    Icon: <SVG_Type_Home width={wScale(24)} height={wScale(24)} />,
  },
  OFFICE: {
    id: 2,
    name: 'Office',
    type: 2,
    Icon: <SVG_Type_Office width={wScale(24)} height={wScale(24)} />,
  },
  OTHER: {
    id: 3,
    name: 'Other',
    type: 3,
    Icon: (
      <MaterialIcons
        name="add-location-alt"
        size={wScale(24)}
        color={colors.orange_FFC529}
      />
    ),
  },
};

export const DATA_TYPE_DELIVERY_ADDRESS = Object.values(TYPE);

export const findTypeDeliveryAddress = type => {
  return DATA_TYPE_DELIVERY_ADDRESS.find(ele => ele?.type === type);
};

export default TYPE;
