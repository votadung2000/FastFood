import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../constant';
import {scale} from '../../utils/resolutions';

import Button from './Button';

const Back = ({handleFavorite, heart, favorite}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 999,
  },
  btn: {
    paddingRight: scale(10),
    paddingBottom: scale(5),
  },
  heart: {
    paddingLeft: scale(10),
    paddingBottom: scale(5),
  },
});

export default React.memo(Back);
