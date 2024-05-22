import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {Back, Button, Text, Popup, Notifer, ModalLoading} from '@components';
import {
  STATUS_ORDER,
  checkStatusFinishOrder,
  checkStatusWaitingOrder,
  colors,
  radius,
} from '@constant';
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
    orderStore: {order, fetchRating, fetchApiUpdateOrder, fetchApiListOrder},
  } = useStore();

  const [loading, setLoading] = useState({isVisible: false});
  const [popup, setPopup] = useState({isVisible: false});

  const handleRating = () => {
    fetchRating(order);
    navigation.navigate(routes.RatingScreen);
  };

  const handleConfirm = () => {
    setPopup({
      isVisible: true,
      title: 'Attention',
      content: 'Do you want to cancel the order?',
      cancel: 'Cancel',
      handleCancel: () => {
        setPopup({isVisible: false});
      },
      accept: 'Confirm',
      handleAccept: handleAccept,
    });
  };

  const handleAccept = async () => {
    setPopup({
      isVisible: false,
      onModalHide: () => {
        handleCancelOrder();
      },
    });
  };

  const handleCancelOrder = async () => {
    setLoading({isVisible: true});
    try {
      let body = {
        id: order?.id,
        status: STATUS_ORDER.CANCELED.status,
      };

      let response = await fetchApiUpdateOrder(body);
      if (response) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            Notifer({
              alertType: 'success',
              title: 'Order Canceled Successfully!',
            });
            await fetchApiListOrder({is_upcoming: true});
            navigation.goBack();
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
        {checkStatusFinishOrder(order?.status) ? (
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
        ) : (
          <View
            style={[
              styles.vwFooter,
              !checkStatusWaitingOrder(order?.status) && styles.anoFooter,
            ]}>
            {checkStatusWaitingOrder(order?.status) && (
              <Button
                style={[styles.btnAction, styles.btnCancel]}
                onPress={handleConfirm}>
                <Text medium>{'Cancel'}</Text>
              </Button>
            )}
            <Button style={[styles.btnAction, styles.btnTrackOrder]}>
              <Text medium style={styles.txtTrackOrder}>
                {'Track Order'}
              </Text>
            </Button>
          </View>
        )}
      </ScrollView>
      <ModalLoading {...loading} />
      <Popup {...popup} />
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
  btnCancel: {
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  btnTrackOrder: {
    backgroundColor: colors.orange_FE724C,
    ...radius.shadow,
  },
  txtTrackOrder: {
    color: colors.white,
  },
});

export default observer(OrderDetailsScreen);
