import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {scale} from '@resolutions';

import colors from './colors';

const OPTION_IMAGE = {
  CAMERA: {
    id: 1,
    name: 'Camera',
    Icon: (
      <MaterialIcons name="camera-alt" size={scale(26)} color={colors.black} />
    ),
  },
  LIBRARY: {
    id: 2,
    name: 'Gallery',
    Icon: (
      <MaterialIcons
        name="photo-library"
        size={scale(26)}
        color={colors.black}
      />
    ),
  },
};

export const DATA_OPTION_IMAGE = Object.values(OPTION_IMAGE);

export default OPTION_IMAGE;
