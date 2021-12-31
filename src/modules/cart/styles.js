import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    paddingHorizontal: scale(15),
    height:'75%'
  },
  vwImg: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: scale(60),
    height: scale(60),
  },
  containerItem: {
    marginBottom: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    paddingVertical: scale(8),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: scale(15),
  },
  flatList: {
    marginTop: scale(20),
    paddingHorizontal: scale(2),
  },
  bodyItem: {
    flexDirection: 'column',
    width: '76%',
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: scale(6),
    alignItems: 'center',
  },
  remove: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceItem: {
    fontSize: fontSize.fontSize14,
  },
  ccStyle: {
    marginTop: scale(2),
  },
  footer: {
    height:'25%',
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
    paddingVertical: scale(10),
  },
  linearGradient: {
    width: width * 0.75,
    borderRadius: scale(15),
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
  title: {
    fontSize: fontSize.huge,
    alignSelf: 'flex-end',
  },
});
