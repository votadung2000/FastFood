import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {Button, Text} from '@components';
import {hScale, scale, wScale} from '@resolutions';
import {
  checkStatusWaitingOrder,
  colors,
  findStatusOrder,
  fontSize,
  radius,
} from '@constant';

let appName = DeviceInfo.getApplicationName();

const Card = ({data}) => {
  const handleCard = () => {
    console.log('handleCard');
  };

  return (
    <Button style={styles.container} onPress={handleCard}>
      <View style={styles.vwHeader}>
        <View style={styles.vwHeaderLeft}>
          <View style={styles.vwLogo}>
            <Image
              source={require('@images/logo.png')}
              style={styles.imgLogo}
            />
          </View>
          <View style={styles.vwContentHeader}>
            <Text medium style={styles.txtItem}>
              {`${data?.order_item?.length || 0} items`}
            </Text>
            <Text bold style={styles.txtBrand}>
              {`${appName}`}
            </Text>
          </View>
        </View>
        <Text style={styles.txtId}>{`#${data?.id || 0}`}</Text>
      </View>
      <View style={styles.vwBody}>
        <View style={styles.vwBodyTime}>
          <Text medium style={styles.txtLabelBody}>
            {'Estimated Arrival'}
          </Text>
          <Text medium style={styles.txtTime}>
            <Text medium style={styles.txtTimeArrive}>
              {25}
            </Text>
            {' min'}
          </Text>
        </View>
        <View style={styles.vwBodyStatus}>
          <Text medium style={styles.txtLabelBody}>
            {'Now'}
          </Text>
          <Text medium style={styles.txtStatus}>
            {findStatusOrder(data?.status)?.name || ''}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.vwFooter,
          !checkStatusWaitingOrder(data?.status) && styles.anoFooter,
        ]}>
        {checkStatusWaitingOrder(data?.status) && (
          <Button style={[styles.btnAction, styles.btnCancel]}>
            <Text medium>{'Cancel'}</Text>
          </Button>
        )}
        <Button style={[styles.btnAction, styles.btnTrackOrder]}>
          <Text medium style={styles.txtTrackOrder}>
            {'Track Order'}
          </Text>
        </Button>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: scale(20),
    padding: scale(15),
    borderRadius: radius.radius10,
    ...radius.shadow,
  },
  vwHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vwLogo: {
    width: wScale(65),
    height: wScale(65),
    padding: scale(1),
    backgroundColor: colors.white,
    borderRadius: radius.radius10,
    ...radius.shadow,
  },
  vwHeaderLeft: {
    flexDirection: 'row',
  },
  imgLogo: {
    width: '100%',
    height: '100%',
    borderRadius: radius.radius10,
  },
  vwContentHeader: {
    marginLeft: scale(18),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtItem: {
    fontSize: fontSize.small,
    color: colors.gray_9796A1,
  },
  txtBrand: {
    marginTop: scale(10),
  },
  txtId: {
    color: colors.orange_FE724C,
  },
  vwBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: scale(15),
  },
  vwBodyTime: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtLabelBody: {
    fontSize: fontSize.small,
    color: colors.gray_9796A1,
  },
  txtTime: {
    marginTop: scale(8),
  },
  txtTimeArrive: {
    fontSize: fontSize.fontSize40,
  },
  vwBodyStatus: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  txtStatus: {
    marginTop: scale(8),
  },
  vwFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(15),
  },
  anoFooter: {
    justifyContent: 'flex-end',
  },
  btnAction: {
    width: '48%',
    height: hScale(44),
    borderRadius: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
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

export default Card;
