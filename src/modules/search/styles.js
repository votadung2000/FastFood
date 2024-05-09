import {StyleSheet} from 'react-native';

import {colors, fontSize} from '@constant';
import {resolutions} from '@utils';

const {scale} = resolutions;

export default StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.fontSize30,
    marginBottom: scale(15),
  },
  container: {
    flex: 1,
    marginHorizontal: scale(15),
    marginTop: scale(20),
  },
  search: {
    marginBottom: scale(20),
  },
});
