import {StyleSheet} from 'react-native';

import {colors, fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSize.huge,
    alignSelf: 'flex-end',
    marginRight: scale(15),
  },
  body: {
    flexDirection: 'row',
  },
});
