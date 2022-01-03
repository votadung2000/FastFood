import {StyleSheet} from 'react-native';

import {colors, fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';

export default StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.fontSize28,
    marginBottom: scale(15),
    fontWeight: '700',
  },
  container: {
    flex: 1,
    marginHorizontal: scale(15),
  },
  search: {
    marginBottom: scale(20),
  },
});
