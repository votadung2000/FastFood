import React, {useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigationState} from '@react-navigation/native';

import {dataMenu} from '@api';
import {useStore} from '@context';
import routes from '@routes';
import {handleDataOdd} from '@utils';

import {Products, Menu, Header} from './components';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const indexRoute = useNavigationState(state => state?.index);

  const {
    categoryStore: {category, updateCategory, fetchApiGetListCategories},
    productsStore: {products, fetchProducts},
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  useEffect(() => {
    fetchApiGetListCategories();
    fetchAPI();
  }, []);

  // useEffect(() => {
  //   if (indexRoute === 0) {
  //     fetchAPI();
  //     updateCategory(dataMenu[0]);
  //   }
  // }, [indexRoute]);

  const fetchAPI = () => {
    let params = {
      group_type: dataMenu[0].id,
    };
    fetchProducts(params);
  };

  const handleItem = item => {
    updateCategory(item);
    fetchProducts({group_type: item.id});
  };

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const handleProduct = item => {
    fetchProductsDetail(item?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <Header />
        <Menu data={dataMenu} itemMenu={category} handleItem={handleItem} />
        <Products
          title={category?.title}
          imgMenu={category?.img}
          data={handleDataOdd(products)}
          handlePlusCart={handlePlusCart}
          handleProduct={handleProduct}
        />
      </View>
    </View>
  );
};

export default observer(HomeScreen);
