import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import _debounce from 'lodash/debounce';

import {Text, Search} from '../../components';
import styles from './styles';
import {Card, Products} from './components';
import {useStore} from '../../context';
import {dataMenu} from '../../actions/Data';
import {findBgLg, handleDataOdd} from '../../utils';
import routes from '../routes';

const SearchScreen = ({navigation}) => {
  const {
    searchProductsStore: {
      productsSearchContainer,
      fetchProductsSearch,
      fetchProductsSearchContainer,
      updateMenuSearch,
    },
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  const [txtSearch, setTxtSearch] = useState(null);

  const onPressCard = item => {
    fetchProductsSearch({group_type: item.id});
    updateMenuSearch(item);
    navigation.navigate(routes.DetailCardSearch);
  };

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const handleProduct = item => {
    fetchProductsDetail(item?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const handleFetchSearch = _debounce(text => {
    fetchProductsSearchContainer({name: text});
  }, 400);

  const onChangeText = text => {
    setTxtSearch(text);
    handleFetchSearch(text);
  };

  if (productsSearchContainer?.length) {
    return (
      <View style={styles.layout}>
        <View style={styles.container}>
          <Text style={styles.title}>{'Discover\nNew Flavors'}</Text>
          <Search
            value={txtSearch}
            placeholder={'Search'}
            onChangeText={onChangeText}
          />
          <Products
            data={handleDataOdd(productsSearchContainer)}
            handlePlusCart={handlePlusCart}
            handleProduct={handleProduct}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.layout}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Discover\nNew Flavors'}</Text>
        <Search
          value={txtSearch}
          placeholder={'Search'}
          onChangeText={onChangeText}
        />
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
    </ScrollView>
  );
};

export default observer(SearchScreen);
