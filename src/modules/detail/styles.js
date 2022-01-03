import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';

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
  back: {
    marginHorizontal: scale(15),
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
    marginHorizontal: scale(15),
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
    bottom: scale(20),
    right: scale(15),
    backgroundColor: colors.orange,
    width: scale(58),
    height: scale(58),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(58),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
