import {StyleSheet} from 'react-native';
import {fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
  },
  vwImg: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: scale(50),
    height: scale(50),
  },
  containerItem: {
    marginBottom: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatList: {
    marginTop: scale(20),
  },
  bodyItem: {
    flexDirection: 'column',
    width: '78%',
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: scale(6),
  },
  remove: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
  priceItem: {
    fontSize: fontSize.fontSize14,
  },
});
