import React, {useState, useRef, useEffect, createRef} from 'react';
import {View, Animated, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react';

import {Layout} from '../../views';
import {Text, Button} from '../../components';
import styles from './styles';
import {dataMenu} from '../../actions/Data';
import {handleDataOdd} from '../../utils';
import {Products, Menu} from './components';
import {colors} from '../../constant';
import {useStore} from '../../context';

const HomeScreen = () => {
  const {
    productsStore: {products, fetchProducts, updateFilters},
  } = useStore();

  const [itemMenu, setItemMenu] = useState(dataMenu[0]);
  const [hidden, setHidden] = useState(false);
  const [txtValue, setTxtValue] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = createRef();

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

  const handleProduct = item => {};

  const handleSearch = () => {
    setHidden(pve => !pve);
    Animated.timing(fadeAnim, {
      toValue: 2,
      duration: 3000,
    }).start();
  };

  const onChangeText = text => {
    setTxtValue(text);
    fetchProducts({name: text});
  };

  const handleScrollRef = value => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({x: 0, y: value, animated: true});
    }
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
                onFocus={() => handleScrollRef(700)}
              />
            </Animated.View>
          )}
        </View>
        <Text bold style={styles.title}>
          {'Find Your\nDelicious Food'}
        </Text>
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
