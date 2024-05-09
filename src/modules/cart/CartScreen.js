import React, {useState} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {observer} from 'mobx-react';

import {Text, Button, EmptyComponent, Notifer, ModalLoading} from '@components';
import {formatCurrency} from '@utils';
import {useStore} from '@context';

import {CardCart, Item} from './components';
import styles from './styles';

const CartScreen = () => {
  const {
    cartProductsStore: {cartProducts, subtotal, discount, total, clearCart},
    orderStore: {fetchApiCreateOrder},
    userStore: {user},
  } = useStore();

  const [loading, setLoading] = useState({isVisible: false});

  const handlePayment = async () => {
    setLoading({isVisible: true});
    try {
      let body = {
        user_id: user?.id,
        total: total,
        products: cartProducts?.map(ele => ({
          id: ele?.id,
          name: ele?.name,
          quantity: ele?.quantity,
          price: ele?.price,
        })),
      };

      let response = await fetchApiCreateOrder(body);
      if (response) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            Notifer({
              alertType: 'success',
              title: 'Order Successfully!',
            });
            clearCart();
          },
        });
      }
    } catch ({response}) {
      setLoading({isVisible: false});
      if (!response) {
        Notifer({
          alertType: 'warn',
          title: 'Please check your network connection',
        });
      } else {
        Notifer({
          alertType: 'error',
          title: response?.data?.message || '',
        });
      }
    }
  };

  return (
    <View style={styles.layout}>
      <Text bold style={styles.title}>
        {'Cart'}
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
      <ModalLoading {...loading} />
    </View>
  );
};

export default observer(CartScreen);
