import React, {useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';

import {useStore} from '@context';

import {Products, Menu, Header} from './components';
import styles from './styles';

const HomeScreen = () => {
  const {
    categoryStore: {fetchCombineApiCategories},
  } = useStore();

  useEffect(() => {
    fetchCombineApiCategories();
  }, []);

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
