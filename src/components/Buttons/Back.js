import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {colors, fontSize, radius} from '../../constant';
import {resolutions} from '@utils';
import {wScale} from '@resolutions';

import Button from './Button';
import Text from '../Text';

const {scale} = resolutions;

const Back = ({
  style,
  handleFavorite,
  heart,
  favorite,
  title,
  stTitle,
  handleGoBack,
}) => {
  const navigation = useNavigation();

  const goBack = () => {
    if (handleGoBack) {
      handleGoBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Button onPress={() => goBack()} style={styles.btn}>
        <Ionicons name="chevron-back" size={scale(22)} color={colors.black} />
      </Button>
      {heart && (
        <Button onPress={handleFavorite} style={styles.heart}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={scale(28)}
            color={colors.heart}
          />
        </Button>
      )}
      {title && (
        <Text bold style={[styles.title, stTitle]}>
          {title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    marginTop: scale(15),
    paddingHorizontal: scale(25),
  },
  btn: {
    width: wScale(38),
    height: wScale(38),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    ...radius.shadow,
  },
  heart: {
    paddingLeft: scale(10),
  },
  title: {
    fontSize: fontSize.fontSize30,
  },
});

export default React.memo(Back);
