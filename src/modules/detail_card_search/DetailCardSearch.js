import React, {useState} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import _debounce from 'lodash/debounce';

import styles from './styles';
import {Text, Search, Back} from '../../components';
import {Products} from './components';
import {useStore} from '../../context';
import {Layout} from '../../views';
import routes from '../routes';
import {handleDataOdd} from '../../utils';

const DetailCardSearch = ({navigation}) => {
  const [txtSearch, setTxtSearch] = useState(null);

  const {
    searchProductsStore: {menuSearch, productsSearch, fetchProductsSearch},
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  const handleFetchSearch = _debounce(text => {
    fetchProductsSearch({name: text, group_type: menuSearch?.id});
  }, 400);

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
