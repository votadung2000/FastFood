import {StyleSheet, Dimensions} from 'react-native';

import {colors, fontSize, radius} from '@constant';
import {resolutions} from '@utils';
import {hScale} from '@resolutions';

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
    marginRight: scale(15),
    marginTop: scale(20),
  },
  emptyImg: {
    width: scale(150),
    height: scale(150),
    marginBottom: scale(8),
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    paddingHorizontal: scale(25),
    height: '75%',
  },
  flatList: {
    marginTop: scale(20),
  },
  ccStyle: {},
  footer: {
    height: '25%',
    backgroundColor: colors.white,
    zIndex: 999,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    justifyContent: 'space-around',
    paddingTop: scale(10),
    paddingBottom: scale(10),
    ...radius.shadow,
  },
  btnLG: {
    width: width * 0.75,
    height: hScale(54),
    borderRadius: scale(26),
    marginTop: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FE724C,
  },
  textLG: {
    fontSize: fontSize.large,
    color: colors.white,
  },
});
