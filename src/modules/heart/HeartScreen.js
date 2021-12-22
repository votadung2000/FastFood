import React, {useState} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../../components';
import styles from './styles';
import {useStore} from '../../context';
import routes from '../routes';
import {Menu, HeartProducts} from './components';
import {dataMenu} from '../../actions/Data';

const HeartScreen = ({navigation}) => {
  const {
    heartProductsStore: {heartProducts, addHeartProduct, fetchHeartProduct},
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  const [itemMenu, setItemMenu] = useState(null);

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
