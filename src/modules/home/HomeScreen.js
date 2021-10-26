import React, {useState, useRef, useCallback} from 'react';
import {View, FlatList, Image, Animated, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';

import {Layout} from '../../views';
import {Text, Button} from '../../components';
import styles from './styles';
import {dataMenu, dataProducts} from '../../actions/Data';
import {limitedString} from '../../utils';
import {Products} from './components';
import {colors} from '../../constant';

const HomeScreen = () => {
  const [itemMenu, setItemMenu] = useState(dataMenu[0]);
  const [products, setProducts] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [txtValue, setTxtValue] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      handleDataProducts();
    }, []),
  );

  const handleDataProducts = item => {
    try {
      let newData;
      if (item) {
        newData = dataProducts.filter(data => data.group_type === item.id);
      } else {
        newData = dataProducts.filter(
          data => data.group_type === dataMenu[0].id,
        );
      }
      setProducts(newData);
    } catch (error) {}
  };

  const keyExtractor = (_, index) => index.toString();

  const handleItem = item => {
    setItemMenu(item);
    handleDataProducts(item);
  };

  const renderItem = ({item}) => {
    return (
      <Button
        onPress={() => handleItem(item)}
        style={[
          styles.item,
          {shadowOpacity: item.id === itemMenu.id ? 0.3 : 0.05},
        ]}>
        <Image source={{uri: item.img}} style={styles.imgMenu} />
        <Text bold style={styles.txtItem}>
          {limitedString(item.title, 6)}
        </Text>
      </Button>
    );
  };

  const handlePlusCart = item => {
    alert('Cart ' + item.name);
  };

  const handleProduct = item => {
    alert(item.name);
  };

  const handleSearch = () => {
    setHidden(pve => !pve);
    Animated.timing(fadeAnim, {
      toValue: 2,
      duration: 3000,
    }).start();
  };

  const onChangeText = text => {
    setTxtValue(text);
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
        <Text bold style={styles.title}>
          {'Find Your\nDelicious Food'}
        </Text>
        <View style={styles.menu}>
          <FlatList
            data={dataMenu}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
        <Products
          title={itemMenu.title}
          data={products}
          handlePlusCart={handlePlusCart}
          handleProduct={handleProduct}
        />
      </View>
    </Layout>
  );
};

export default HomeScreen;
