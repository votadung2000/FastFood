import {StyleSheet} from 'react-native';

import {colors, fontSize, radius} from '@constant';
import {resolutions} from '@utils';

const {hScale, scale, wScale} = resolutions;

export default StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameApp: {
    fontSize: fontSize.fontSize34,
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
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    paddingVertical: scale(14),
    borderRadius: radius.radius14,
  },
  footer: {
    alignItems: 'center',
  },
  home: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(5),
  },
  txtHome: {
    fontSize: fontSize.fontSize16,
  },
});
