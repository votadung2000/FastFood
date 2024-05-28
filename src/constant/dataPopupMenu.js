import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {scale} from '@resolutions';
import colors from './colors';

const POPUP_MENU = {
  DELETE: {
    id: 1,
    name: 'Delete',
    Icon: <AntDesign name="close" color={colors.red_FF3600} size={scale(16)} />,
  },
};

export const DATA_POPUP_MENU = Object.values(POPUP_MENU);

export default POPUP_MENU;
