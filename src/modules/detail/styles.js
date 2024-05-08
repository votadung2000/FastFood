import {StyleSheet, Dimensions} from 'react-native';

import {colors, fontSize, radius} from '@constant';
import {wScale, scale, hScale} from '@resolutions';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: scale(300),
    width: scale(300),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  txtTitle: {
    fontSize: fontSize.big,
  },
  price: {
    color: colors.price,
    fontSize: fontSize.large,
  },
  txtContent: {
    color: colors.gray,
    fontSize: fontSize.fontSize16,
    textAlign: 'left',
    marginBottom: scale(10),
  },
  plus: {
    position: 'absolute',
    right: scale(20),
    bottom: scale(20),
    width: wScale(170),
    height: hScale(52),
    borderRadius: scale(26),
    backgroundColor: colors.orange_FE724C,
    flexDirection: 'row',
    alignItems: 'center',
    ...radius.shadow,
  },
  vwImg: {
    width: wScale(40),
    height: wScale(40),
    borderRadius: radius.radius20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(6),
  },
  imgCart: {
    width: wScale(18),
    height: wScale(18),
  },
  txtAdd: {
    marginLeft: scale(10),
    color: colors.white,
  },
});
