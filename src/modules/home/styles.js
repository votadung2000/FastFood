import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '@constant';
import {resolutions} from '@utils';

const {hScale, scale} = resolutions;

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
