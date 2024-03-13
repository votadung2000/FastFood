import {StyleSheet} from 'react-native';

import {colors, radius} from '@constant';
import {scale} from '@resolutions';

export default StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  stBorderRadius: {
    borderRadius: radius.radius14,
  },
});
