import {StyleSheet, Dimensions} from 'react-native';

import {colors, fontSize, radius} from '@constant';
import {resolutions} from '@utils';

const {width} = Dimensions.get('window');
const {scale} = resolutions;

export default StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSize.huge,
    alignSelf: 'flex-end',
  },
  back: {
    paddingHorizontal: scale(15),
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    paddingHorizontal: scale(15),
    height: '75%',
  },
  flatList: {
    marginTop: scale(20),
    paddingHorizontal: scale(2),
  },
  ccStyle: {
    marginTop: scale(2),
  },
  footer: {
    height: '25%',
    backgroundColor: colors.white,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    justifyContent: 'space-around',
    paddingBottom: scale(10),
  },
  linearGradient: {
    width: width * 0.75,
    borderRadius: radius.radius14,
    alignSelf: 'center',
    marginTop: scale(10),
  },
  btnLG: {
    width: '100%',
    paddingVertical: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLG: {
    fontSize: fontSize.large,
    color: colors.white,
  },
});
