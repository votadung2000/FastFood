import React, {useState, useRef, useEffect} from 'react';
import {View, Animated, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react';
import _debounce from 'lodash/debounce';

import {Layout} from '../../views';
import {Button, Text} from '../../components';
import styles from './styles';
import {dataMenu} from '../../actions/Data';
import {handleDataOdd} from '../../utils';
import {Products, Menu} from './components';
import {colors} from '../../constant';
import {useStore} from '../../context';
import routes from '../routes';

const HomeScreen = ({navigation}) => {
  const {
    productsStore: {products, fetchProducts, updateFilters},
  } = useStore();

  const [itemMenu, setItemMenu] = useState(dataMenu[0]);
  const [hidden, setHidden] = useState(false);
  const [txtValue, setTxtValue] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  const handleSearch = () => {
    setHidden(pve => !pve);
    Animated.timing(fadeAnim, {
      toValue: 2,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const handleSearchText = _debounce(text => {
    fetchProducts({name: text});
    updateFilters({name: text});
  }, 600);

  const onChangeText = text => {
    setTxtValue(text);
    handleSearchText(text);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign name="menu-fold" size={26} />
          {!hidden && (
            <Button onPress={handleSearch} style={styles.btnSearch}>
              <AntDesign name="search1" size={26} />
            </Button>
          )}
          {hidden && (
            <Animated.View
              style={[
                styles.search,
                {
                  opacity: fadeAnim,
                },
              ]}>
              <AntDesign name="search1" size={26} color={colors.gray} />
              <TextInput
                value={txtValue}
                style={styles.inputSearch}
                placeholder="Search Products"
                placeholderTextColor={colors.gray}
                autoCapitalize="none"
                onChangeText={onChangeText}
              />
            </Animated.View>
          )}
        </View>
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
