import React, {useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigationState} from '@react-navigation/native';

import {useStore} from '@context';

import {Products, Menu, Header} from './components';
import styles from './styles';

const HomeScreen = () => {
  const indexRoute = useNavigationState(state => state?.index);

  const {
    categoryStore: {fetchApiListCategories},
  } = useStore();

  useEffect(() => {
    fetchApiListCategories();
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
