import React, {useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigationState, useIsFocused} from '@react-navigation/native';

import {useStore} from '@context';

import {Products, Menu, Header} from './components';
import styles from './styles';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const indexRoute = useNavigationState(state => state?.index);

  const {
    categoryStore: {fetchCombineApiCategories},
    productsStore: {clearFilterPr},
  } = useStore();

  useEffect(() => {
    if (isFocused) {
      fetchCombineApiCategories();

      return () => {
        clearFilterPr();
      };
    }
  }, [indexRoute]);

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <Header />
        <Menu />
        <Products />
      </View>
    </View>
  );
};

export default observer(HomeScreen);
