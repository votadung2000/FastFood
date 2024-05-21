import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {Back, Button, Text} from '@components';
import {colors, radius} from '@constant';
import {hScale, scale} from '@resolutions';
import {useStore} from '@context';
import routes from '@routes';

import Header from './Header';
import InfoStore from './InfoStore';
import OrdersFood from './OrdersFood';
import Item from './Item';

const OrderDetailsScreen = () => {
  const navigation = useNavigation();

  const {
    orderStore: {order, fetchRating},
  } = useStore();

  const handleRating = () => {
    fetchRating(order);
    navigation.navigate(routes.RatingScreen);
  };

  return (
    <View style={styles.container}>
      <Back title={'Order Details'} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        <View style={styles.content}>
          <Header data={order} />
          <InfoStore />
          <OrdersFood data={order} />
          <Item
            label="Total"
            value={order?.total}
            stContainer={styles.stContainerItem}
          />
        </View>
        <View style={styles.vwFooter}>
          <Button
            style={[styles.btnAction, styles.btnRate]}
            onPress={handleRating}>
            <Text medium style={styles.txtRate}>
              {'Rate'}
            </Text>
          </Button>
          <Button style={[styles.btnAction, styles.btnReOrder]}>
            <Text medium style={styles.txtReOrder}>
              {'Re-Order'}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: scale(20),
    paddingHorizontal: scale(25),
  },
  stContainerItem: {
    marginTop: scale(20),
  },
  vwFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(50),
    paddingHorizontal: scale(25),
    paddingBottom: hScale(50),
  },
  anoFooter: {
    justifyContent: 'flex-end',
  },
  btnAction: {
    width: '48%',
    height: hScale(54),
    borderRadius: scale(27),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRate: {
    borderWidth: scale(1),
    borderColor: colors.orange_FE724C,
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  txtRate: {
    color: colors.orange_FE724C,
  },
  btnReOrder: {
    backgroundColor: colors.orange_FE724C,
    ...radius.shadow,
  },
  txtReOrder: {
    color: colors.white,
  },
});

export default observer(OrderDetailsScreen);
