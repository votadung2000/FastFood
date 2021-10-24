import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(15),
  },
  title: {
    fontSize: fontSize.fontSize28,
    lineHeight: scale(35),
    marginBottom: scale(15),
  },
  menu: {
    marginBottom: scale(15),
  },
  item: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(10),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgMenu: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(10),
    marginBottom: scale(8),
  },
  txtItem: {
    fontSize: fontSize.smaller,
  },
});
