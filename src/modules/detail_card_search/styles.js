import {StyleSheet} from 'react-native';

import {colors, fontSize} from '@constant';
import {resolutions} from '@utils';

const {scale} = resolutions;

export default StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    paddingHorizontal: scale(15),
  },
  title: {
    fontSize: fontSize.fontSize28,
    lineHeight: scale(35),
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  btnBack: {
    paddingRight: scale(10),
  },
});
