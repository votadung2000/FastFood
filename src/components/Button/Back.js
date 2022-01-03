import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {colors, fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';

import Button from './Button';
import Text from '../Text';

const Back = ({style, handleFavorite, heart, favorite, title, stTitle}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      <Button onPress={() => goBack()} style={styles.btn}>
        <Ionicons name="chevron-back-outline" size={scale(28)} />
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
  },
  btn: {
    paddingRight: scale(10),
  },
  heart: {
    paddingLeft: scale(10),
  },
  title: {
    fontSize: fontSize.big,
  },
});

export default React.memo(Back);
