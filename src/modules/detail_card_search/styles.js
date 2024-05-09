import {StyleSheet} from 'react-native';

import {colors} from '@constant';
import {resolutions} from '@utils';

const {scale} = resolutions;

export default StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(25),
    marginTop: scale(20),
  },
});
