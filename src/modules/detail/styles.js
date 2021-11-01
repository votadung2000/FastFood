import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../utils/resolutions';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: scale(300),
    width: scale(300),
  },
});
