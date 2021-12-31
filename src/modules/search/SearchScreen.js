import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { observer } from 'mobx-react';

import { Text, Search } from '../../components';
import styles from './styles';
import { Card, ModalPr } from './components';
import { useStore } from '../../context';
import { dataMenu } from '../../actions/Data';
import { findBgLg, handleDataOdd } from '../../utils';
import routes from '../routes';

const SearchScreen = ({navigation}) => {
  const {
    searchProductsStore: { productsSearch, fetchProductsSearch },
    productsDetailStore: { fetchProductsDetail },
    cartProductsStore: { fetchCartProduct },
  } = useStore();

  const [isVisible, setIsVisible] = useState(false);
  const [menu, setMenu] = useState(null);

  const onPressCard = item => {
    setMenu(item);
    fetchProductsSearch({ group_type: item.id });
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const handleProduct = item => {
    handleCloseModal();
    fetchProductsDetail(item?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  return (
    <ScrollView
      bounces={false}
      style={styles.layout}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Discover\nNew Flavors'}</Text>
        <Search placeholder={'Search'} />
        {dataMenu &&
          dataMenu?.map((item, index) => {
            return (
              <Card
                key={index.toString()}
                item={item}
                index={index}
                bgLG={findBgLg(index)}
                onPressCard={onPressCard}
              />
            );
          })}
      </View>
      <ModalPr
        isVisible={isVisible}
        menu={menu}
        productsSearch={handleDataOdd(productsSearch)}
        goBack={handleCloseModal}
        handlePlusCart={handlePlusCart}
        handleProduct={handleProduct}
      />
    </ScrollView>
  );
};

export default observer(SearchScreen);
