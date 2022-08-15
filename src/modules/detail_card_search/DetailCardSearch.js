import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import debounce from 'lodash/debounce';

import {Text, Search, Back} from '@components';
import {useStore} from '@context';
import {Layout} from '@views';
import {handleDataOdd} from '@utils';
import routes from '@routes';

import {Products} from './components';
import styles from './styles';

const DetailCardSearch = ({navigation}) => {
  const [txtSearch, setTxtSearch] = useState(null);

  const {
    searchProductsStore: {menuSearch, productsSearch, fetchProductsSearch},
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  const handleFetchSearch = useCallback(
    debounce(text => {
      fetchProductsSearch({name: text, group_type: menuSearch?.id});
    }, 400),
    [],
  );

  const onChangeText = text => {
    setTxtSearch(text);
    handleFetchSearch(text);
  };

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const handleProduct = item => {
    fetchProductsDetail(item?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Back />
          <Text style={styles.title}>{`Popular ${menuSearch?.title}`}</Text>
        </View>
        <Search
          value={txtSearch}
          placeholder={'Search'}
          onChangeText={onChangeText}
        />
        <Products
          imgMenu={menuSearch?.img}
          data={handleDataOdd(productsSearch)}
          handlePlusCart={handlePlusCart}
          handleProduct={handleProduct}
        />
      </View>
    </Layout>
  );
};

export default observer(DetailCardSearch);
