import {scale} from '@resolutions';

import colors from './colors';

export default {
  radius2: scale(2),
  radius6: scale(6),
  radius10: scale(10),
  radius14: scale(14),
  radius30: scale(30),
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
};
