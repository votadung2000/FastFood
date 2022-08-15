import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigationState} from '@react-navigation/native';

import {Text} from '@components';
import {useStore} from '@context';
import {dataMenu} from '@api';
import routes from '@routes';

import {Menu, HeartProducts} from './components';
import styles from './styles';

const HeartScreen = ({navigation}) => {
  const indexRoute = useNavigationState(state => state?.index);

  const {
    heartProductsStore: {heartProducts, addHeartProduct, fetchHeartProduct},
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  const [itemMenu, setItemMenu] = useState(null);

  useEffect(() => {
    if (indexRoute === 2) {
      setItemMenu(null);
      fetchHeartProduct();
    }
  }, [indexRoute]);

  const handleItem = item => {
    setItemMenu(item);
    fetchHeartProduct(item);
  };

  const handleProduct = item => {
    fetchProductsDetail(item?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const handleRemoveHeart = item => {
    addHeartProduct(item);
  };

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Your Heart'}
      </Text>
      <View style={styles.body}>
        <Menu data={dataMenu} itemMenu={itemMenu} handleItem={handleItem} />
        <HeartProducts
          data={heartProducts}
          itemMenu={itemMenu}
          handleProduct={handleProduct}
          handlePlusCart={handlePlusCart}
          handleRemoveHeart={handleRemoveHeart}
        />
      </View>
    </View>
  );
};

export default observer(HeartScreen);
