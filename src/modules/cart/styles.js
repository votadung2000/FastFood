import {StyleSheet, Dimensions} from 'react-native';

import {colors, fontSize} from '@constant';
import {resolutions} from '@utils';
import {hScale} from '@resolutions';

const {width} = Dimensions.get('window');
const {scale} = resolutions;

export default StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: hScale(72),
  },
  title: {
    fontSize: fontSize.fontSize30,
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
  scroll: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: scale(25),
    marginTop: scale(20),
  },
  vwCurrency: {
    marginTop: scale(20),
    paddingBottom: scale(30),
  },
  vwFooter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnCheckout: {
    width: width * 0.75,
    height: hScale(54),
    borderRadius: scale(26),
    marginTop: scale(20),
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FE724C,
  },
  txtCheckout: {
    fontSize: fontSize.large,
    color: colors.white,
  },
});
