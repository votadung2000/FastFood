import React from 'react';
import {View, FlatList, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import {Text, Button, Back, ChangeQuantity} from '../../components';
import {colors} from '../../constant';
import {formatCurrency} from '../../utils';
import styles from './styles';
import {Item} from './components';

const data = [
  {
    id: 1,
    name: 'Beef Burger',
    img: 'beef_big_size',
    taste: 'Spicy',
    price: '80000',
    group_type: 1,
  },
  {
    id: 2,
    name: 'Chicken Burger',
    img: 'beef_chicken',
    taste: 'Spicy',
    price: '100000',
    group_type: 1,
  },
  {
    id: 1,
    name: 'Beef Burger',
    img: 'beef_big_size',
    taste: 'Spicy',
    price: '80000',
    group_type: 1,
  },
  {
    id: 2,
    name: 'Chicken Burger',
    img: 'beef_chicken',
    taste: 'Spicy',
    price: '100000',
    group_type: 1,
  },
];

const CartScreen = () => {
  const handleRemove = () => {
    alert('Remove Cart');
  };

  const handlePlus = () => {
    alert('Handle Plus');
  };

  const handleMinus = () => {
    alert('Handle Minus');
  };

  const handlePayment = () => {
    alert('Handle Payment');
  };

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return (
      <View style={styles.containerItem}>
        <View style={styles.vwImg}>
          <Image source={{uri: item?.img}} style={styles.img} />
        </View>
        <View style={styles.bodyItem}>
          <View style={styles.headerItem}>
            <Text bold>{item?.name}</Text>
            <Button onPress={() => handleRemove(item)} style={styles.remove}>
              <MaterialCommunityIcons
                name="delete-sweep"
                color={colors.graySystem2}
                size={24}
              />
            </Button>
          </View>
          <View style={styles.headerItem}>
            <ChangeQuantity
              handlePlus={() => handlePlus(item)}
              handleMinus={() => handleMinus(item)}
            />
            <View>
              <Text bold style={styles.priceItem}>{`${formatCurrency(
                item?.price,
              )} Đ`}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Back title={'Your Order'} />
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            bounces={false}
            style={styles.flatList}
            contentContainerStyle={styles.ccStyle}
          />
        </View>
        <View style={styles.footer}>
          <Item bold label="Items" value={'2000'} />
          <Item bold label="Discount" value={'0'} />
          <Item bold label="Cost" value={'2000'} />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.yellow, colors.yellowSystem]}
            style={styles.linearGradient}>
            <Button onPress={() => handlePayment()} style={styles.btnLG}>
              <Text bold style={styles.textLG}>
                {'Payment & Delivery'}
              </Text>
            </Button>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
