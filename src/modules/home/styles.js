import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSize} from '../../constant';
import {hScale, scale} from '../../utils/resolutions';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: scale(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(15),
  },
  btnUser: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(40),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.fontSize28,
    lineHeight: scale(35),
    fontWeight: '700',
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
    borderColor: colors.black,
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
