import React from 'react';
import {View, FlatList} from 'react-native';
import {observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

import {Text, Button, Back, EmptyComponent} from '@components';
import {colors} from '@constant';
import {formatCurrency} from '@utils';
import {useStore} from '@context';

import {CardCart, Item} from './components';
import styles from './styles';

const CartScreen = () => {
  const {
    cartProductsStore: {cartProducts, total, discount, totalCost},
  } = useStore();

  const handlePayment = () => {
    alert('Handle Payment');
  };

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return <CardCart data={item} />;
  };

  return (
    <View style={styles.layout}>
      <Back title={'Your Order'} stTitle={styles.title} style={styles.back} />
      {cartProducts?.length === 0 ? (
        <EmptyComponent title="Cart's Empty" img={'cart_empty'} />
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
