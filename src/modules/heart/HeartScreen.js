import React, {useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigationState, useIsFocused} from '@react-navigation/native';

import {Text} from '@components';
import {useStore} from '@context';

import {Menu, HeartProducts} from './components';
import styles from './styles';

const HeartScreen = () => {
  const isFocused = useIsFocused();
  const indexRoute = useNavigationState(state => state?.index);

  const {
    categoryStore: {fetchApiListCategories},
    favoritesStore: {fetchApiListFavorites, clearFilterFavorites},
  } = useStore();

  useEffect(() => {
    if (isFocused) {
      fetchApiListCategories();
      fetchApiListFavorites();

      return () => {
        clearFilterFavorites();
      };
    }
  }, [indexRoute]);

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Favorite'}
      </Text>
      <View style={styles.body}>
        <Menu />
        <HeartProducts />
      </View>
    </View>
  );
};

export default observer(HeartScreen);
