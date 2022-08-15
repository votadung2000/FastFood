import React from 'react';
import {View, FlatList, Image} from 'react-native';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import {Text, Button, ChangeQuantity, Back, EmptyComponent} from '@components';
import {colors} from '@constant';
import {formatCurrency} from '@utils';
import {useStore} from '@context';

import {Item} from './components';
import styles from './styles';

const CartScreen = () => {
  const {
    cartProductsStore: {
      cartProducts,
      total,
      discount,
      totalCost,
      plusProducts,
      minusProducts,
      removeProducts,
    },
  } = useStore();

  const handleRemove = item => {
    removeProducts(item);
  };

  const handlePlus = item => {
    plusProducts(item);
  };

  const handleMinus = item => {
    minusProducts(item);
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
              quantity={item?.quantity}
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
      <Back title={'Your Order'} stTitle={styles.title} style={styles.back} />
      {cartProducts?.length === 0 ? (
        <EmptyComponent title="Cart's Empty" uri={'cart_empty'} />
      ) : (
        <View style={styles.container}>
          <View style={styles.body}>
            <FlatList
              data={cartProducts}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              bounces={false}
              style={styles.flatList}
              contentContainerStyle={styles.ccStyle}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {cartProducts?.length ? (
            <View style={styles.footer}>
              <Item bold label="Items" value={formatCurrency(total)} />
              <Item bold label="Discount" value={formatCurrency(discount)} />
              <Item bold label="Cost" value={formatCurrency(totalCost)} />
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
          ) : null}
        </View>
      )}
    </View>
  );
};

export default observer(CartScreen);
