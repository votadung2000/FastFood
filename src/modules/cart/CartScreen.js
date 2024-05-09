import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {observer} from 'mobx-react';

import {Text, Button, EmptyComponent} from '@components';
import {formatCurrency} from '@utils';
import {useStore} from '@context';

import {CardCart, Item} from './components';
import styles from './styles';

const CartScreen = () => {
  const {
    cartProductsStore: {cartProducts, subtotal, discount, total},
  } = useStore();

  const handlePayment = () => {
    alert('Handle Payment');
  };

  return (
    <View style={styles.layout}>
      <Text bold style={styles.title}>
        {'Your Cart'}
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
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              {cartProducts?.map((item, index) => {
                return <CardCart key={index?.toString()} data={item} />;
              })}
              {cartProducts?.length ? (
                <View style={styles.vwCurrency}>
                  <Item label="Subtotal" value={formatCurrency(subtotal)} />
                  {false && (
                    <Item label="Tax and Fees" value={formatCurrency(0)} />
                  )}
                  {false && <Item label="Delivery" value={formatCurrency(0)} />}
                  <Item label="Discount" value={formatCurrency(discount)} />
                  <Item label="Total" value={formatCurrency(total)} />
                </View>
              ) : null}
            </ScrollView>
          </View>
          {cartProducts?.length ? (
            <Button onPress={() => handlePayment()} style={styles.btnCheckout}>
              <Text bold style={styles.txtCheckout}>
                {'CHECKOUT'}
              </Text>
            </Button>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default observer(CartScreen);
