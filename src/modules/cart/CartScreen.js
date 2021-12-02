import React from 'react';
import {View, FlatList, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Text, Button, Back, ChangeQuantity} from '../../components';
import {colors} from '../../constant';
import {Layout} from '../../views';
import {formatCurrency} from '../../utils';
import styles from './styles';

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
];

const CartScreen = () => {
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
            <Button style={styles.remove}>
              <MaterialCommunityIcons
                name="delete-sweep"
                color={colors.gray}
                size={24}
              />
            </Button>
          </View>
          <View style={styles.headerItem}>
            <ChangeQuantity />
            <View>
              <Text bold style={styles.priceItem}>{`${formatCurrency(
                item?.price,
              )} VNĐ`}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Layout>
      <View style={styles.container}>
        <Back title={'Your Order'} />
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.flatList}
        />
      </View>
    </Layout>
  );
};

export default CartScreen;
