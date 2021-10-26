import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSize} from '../../constant';
import {hScale, scale} from '../../utils/resolutions';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(15),
    alignItems: 'center',
    marginTop: scale(10),
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
  btnSearch: {
    paddingLeft: scale(10),
  },
  search: {
    flexDirection: 'row',
    borderWidth: 1,
    position: 'absolute',
    borderRadius: scale(10),
    zIndex: 9999,
    width: width * 0.75,
    height: hScale(40),
    right: 0,
    borderColor: colors.gray,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: scale(10),
  },
  inputSearch: {
    width: '90%',
    height: hScale(38),
    paddingLeft: scale(6),
  },
});
