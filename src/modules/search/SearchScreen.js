import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import debounce from 'lodash/debounce';

import {Text, Search} from '@components';
import {useStore} from '@context';
import {findBgLg, handleDataOdd} from '@utils';
import {useNavigationState} from '@react-navigation/native';
import routes from '@routes';

import {Card, Products} from './components';
import styles from './styles';

const SearchScreen = ({navigation}) => {
  const indexRoute = useNavigationState(state => state?.index);

  const {
    searchProductsStore: {
      productsSearchContainer,
      fetchProductsSearchContainer,
    },
    categoryStore: {categories, fetchApiListCategories},
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
    productsStore: {fetchApiListProducts},
  } = useStore();

  const [txtSearch, setTxtSearch] = useState(null);

  useEffect(() => {
    fetchApiListCategories();
  }, [indexRoute]);

  const onPressCard = item => {
    fetchApiListProducts({category_id: item});
    navigation.navigate(routes.DetailCardSearch);
  };

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const handleProduct = item => {
    fetchProductsDetail(item?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const handleFetchSearch = useCallback(
    debounce(text => {
      fetchProductsSearchContainer({name: text});
    }, 400),
    [],
  );

  const onChangeText = text => {
    setTxtSearch(text);
    handleFetchSearch(text);
  };

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Discover\nNew Flavors'}</Text>
        <Search
          value={txtSearch}
          placeholder={'Search'}
          onChangeText={onChangeText}
          style={styles.search}
        />
        {productsSearchContainer?.length || txtSearch?.length ? (
          <Products
            data={handleDataOdd(productsSearchContainer)}
            handlePlusCart={handlePlusCart}
            handleProduct={handleProduct}
          />
        ) : (
          <ScrollView
            bounces={false}
            style={styles.scroll}
            showsVerticalScrollIndicator={false}>
            {categories?.data &&
              categories?.data?.map((item, index) => {
                return (
                  <Card
                    key={index?.toString()}
                    data={item}
                    bgLG={findBgLg(index)}
                    onPressCard={onPressCard}
                  />
                );
              })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default observer(SearchScreen);
