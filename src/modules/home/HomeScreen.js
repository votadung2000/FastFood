import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';

import {Layout} from '../../views';
import {Text} from '../../components';
import styles from './styles';
import {dataMenu} from '../../actions/Data';
import {handleDataOdd} from '../../utils';
import {Products, Menu} from './components';
import {useStore} from '../../context';
import routes from '../routes';

const HomeScreen = ({navigation}) => {
  const {
    productsStore: {products, fetchProducts, updateFilters},
  } = useStore();

  const [itemMenu, setItemMenu] = useState(dataMenu[0]);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = () => {
    let params = {
      group_type: dataMenu[0].id,
    };
    fetchProducts(params);
  };

  const handleItem = item => {
    setItemMenu(item);
    fetchProducts({group_type: item.id});
    updateFilters({group_type: item.id});
  };

  const handlePlusCart = item => {};

  const handleProduct = item => {
    navigation.navigate(routes.ProductsDetailScreen, {id: item?.id});
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>{'Find Your\nDelicious Food'}</Text>
        <Menu data={dataMenu} itemMenu={itemMenu} handleItem={handleItem} />
        <Products
          title={itemMenu?.title}
          data={handleDataOdd(products)}
          handlePlusCart={handlePlusCart}
          handleProduct={handleProduct}
        />
      </View>
    </Layout>
  );
};

export default observer(HomeScreen);
