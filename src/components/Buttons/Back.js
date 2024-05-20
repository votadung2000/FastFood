import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors, fontSize, radius} from '@constant';
import {resolutions} from '@utils';
import {wScale} from '@resolutions';
import {useStore} from '@context';

import Button from './Button';
import Text from '../Text';
import FastImage from '../Image/FastImage';

const {scale} = resolutions;

const Back = ({
  style,
  handleFavorite,
  heart,
  isFavorite,
  title,
  stTitle,
  handleGoBack,
}) => {
  const navigation = useNavigation();

  const {
    userStore: {user},
  } = useStore();

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
      {title && (
        <>
          <Text bold style={[styles.title, stTitle]}>
            {title}
          </Text>
          {user?.avatar ? (
            <FastImage
              isPath
              source={{uri: user?.avatar?.url}}
              style={styles.img}
            />
          ) : (
            <Image source={require('@images/avatar.png')} style={styles.img} />
          )}
        </>
      )}
      {heart && (
        <Button
          onPress={handleFavorite}
          style={[styles.vwFavorite, isFavorite && styles.vwIsFavorite]}>
          <View style={styles.vwIconFavorite}>
            <Ionicons name="heart" size={scale(20)} color={colors.white} />
          </View>
        </Button>
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
    fontSize: fontSize.large,
  },
  img: {
    width: wScale(38),
    height: wScale(38),
    borderRadius: radius.radius10,
  },
  vwFavorite: {
    width: wScale(28),
    height: wScale(28),
    borderRadius: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  vwIsFavorite: {
    backgroundColor: colors.orange_FE724C,
  },
  vwIconFavorite: {
    width: wScale(20),
    height: wScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default observer(Back);
