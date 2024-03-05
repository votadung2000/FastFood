import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigationState, useIsFocused} from '@react-navigation/native';
import debounce from 'lodash/debounce';

import {Text, Search} from '@components';
import {useStore} from '@context';
import {findBgLg} from '@utils';
import routes from '@routes';

import {Card, Products} from './components';
import styles from './styles';

const SearchScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const indexRoute = useNavigationState(state => state?.index);

  const {
    categoryStore: {categories, fetchApiListCategories},
    productsStore: {filterPr, fetchApiListProducts, clearFilterPr},
  } = useStore();

  const [txtSearch, setTxtSearch] = useState(null);

  useEffect(() => {
    if (isFocused) {
      fetchApiListCategories();

      return () => {
        clearFilterPr();
        setTxtSearch(null);
      };
    }
  }, [indexRoute]);

  const onPressCard = item => {
    fetchApiListProducts({category_id: item});
    navigation.navigate(routes.DetailCardSearch);
  };

  const handleFetchSearch = useCallback(
    debounce(text => {
      fetchApiListProducts({name: text});
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
        {filterPr?.name ? (
          <Products />
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
