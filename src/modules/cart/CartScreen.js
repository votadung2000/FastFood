import React from 'react';
import {View, FlatList, Image} from 'react-native';
import {observer} from 'mobx-react';

import {Text, Button, EmptyComponent} from '@components';
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
      <Text bold style={styles.title}>
        {'Your Heart'}
      </Text>
      {cartProducts?.length === 0 ? (
        <EmptyComponent
          title="Cart's Empty"
          Icon={
            <Image
              source={require('@images/cart_empty.png')}
              style={styles.emptyImg}
            />
          }
        />
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
              <Button onPress={() => handlePayment()} style={styles.btnLG}>
                <Text bold style={styles.textLG}>
                  {'Payment & Delivery'}
                </Text>
              </Button>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default observer(CartScreen);
