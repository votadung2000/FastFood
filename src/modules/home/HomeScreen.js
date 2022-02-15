import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigationState} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text, Button} from '../../components';
import styles from './styles';
import {dataMenu} from '../../actions/Data';
import {handleDataOdd} from '../../utils';
import {Products, Menu} from './components';
import {useStore} from '../../context';
import routes from '../routes';
import {scale} from '../../utils/resolutions';
import {colors} from '../../constant';

const HomeScreen = ({navigation}) => {
  const indexRoute = useNavigationState(state => state?.index);

  const {
    productsStore: {products, fetchProducts},
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  const [itemMenu, setItemMenu] = useState(dataMenu[0]);

  useEffect(() => {
    if (indexRoute === 0) {
      fetchAPI();
      setItemMenu(dataMenu[0]);
    }
  }, [indexRoute]);

  const fetchAPI = () => {
    let params = {
      group_type: dataMenu[0].id,
    };
    fetchProducts(params);
  };

  const handleItem = item => {
    setItemMenu(item);
    fetchProducts({group_type: item.id});
  };

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const handleProduct = item => {
    fetchProductsDetail(item?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const goToUser = () => {
    navigation.navigate(routes.LoginScreen);
  };

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{'Find Your\nDelicious Food'}</Text>
          <Button onPress={goToUser} style={styles.btnUser}>
            <AntDesign size={scale(22)} name="user" color={colors.black} />
          </Button>
        </View>
        <Menu data={dataMenu} itemMenu={itemMenu} handleItem={handleItem} />
        <Products
          title={itemMenu?.title}
          imgMenu={itemMenu?.img}
          data={handleDataOdd(products)}
          handlePlusCart={handlePlusCart}
          handleProduct={handleProduct}
        />
      </View>
    </View>
  );
};

export default observer(HomeScreen);
