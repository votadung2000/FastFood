import {StyleSheet} from 'react-native';

import {colors, fontSize} from '../../constant';
import {hScale, scale, wScale} from '../../utils/resolutions';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameApp: {
    fontSize: fontSize.fontSize28,
  },
  imgLogin: {
    width: wScale(160),
    height: hScale(160),
    borderRadius: scale(50),
    marginBottom: scale(20),
  },
  form: {
    paddingHorizontal: scale(15),
  },
  input: {
    marginBottom: scale(30),
  },
  textLogin: {
    color: colors.white,
  },
  btnLogin: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    paddingVertical: scale(14),
    borderRadius: scale(14),
  },
  footer: {
    alignItems: 'center',
  },
});
