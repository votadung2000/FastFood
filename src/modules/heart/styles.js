import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import {colors, fontSize} from '../../constant';
import {hScale, scale} from '../../utils/resolutions';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSize.huge,
    alignSelf: 'flex-end',
    marginRight: scale(5),
  },
  item: {
    width: width / 2.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(80),
    backgroundColor: colors.white,
    borderRadius: scale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  img: {
    width: scale(80),
    height: scale(80),
    position: 'absolute',
    top: -hScale(60),
    zIndex: 9999,
  },
  txtItem: {
    textAlign: 'auto',
    fontSize: fontSize.fontSize14,
    marginBottom: scale(6),
  },
  content: {
    width: '100%',
    marginTop: scale(25),
  },
  txtTaste: {
    fontSize: fontSize.small,
    color: colors.gray,
  },
  txtName: {
    fontSize: fontSize.fontSize16,
    textAlign: 'center',
  },
  plus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
  },
  wrapperStyle: {
    justifyContent: 'space-around',
  },
  containerStyle: {
    marginTop: scale(65),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    width: scale(100),
    height: scale(100),
    marginBottom: scale(8),
  },
  txtEmpty: {
    color: colors.graySystem2,
    fontSize: fontSize.large,
  },
});
