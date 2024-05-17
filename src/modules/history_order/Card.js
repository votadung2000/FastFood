import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

import {Button, Text} from '@components';
import {hScale, scale, wScale} from '@resolutions';
import {
  colors,
  findStatusOrder,
  fontSize,
  radius,
  checkStatusCancelOrder,
} from '@constant';
import {currencyUs} from '@utils';

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
            <View style={styles.vwInfoItem}>
              <Text medium style={styles.txtTimeEnd}>
                {moment(new Date(new Date())).format('DD MMM, HH:mm')}
              </Text>
              <View style={styles.dotItem} />
              <Text medium style={styles.txtItem}>
                {`${data?.order_item?.length || 0} items`}
              </Text>
            </View>
            <Text bold style={styles.txtBrand}>
              {`${appName}`}
            </Text>
            <View style={styles.vwStatus}>
              <View
                style={[
                  styles.dotStatus,
                  checkStatusCancelOrder(data?.status) &&
                    styles.dotStatusCancel,
                ]}
              />
              <Text
                medium
                style={[
                  styles.txtStatus,
                  checkStatusCancelOrder(data?.status) &&
                    styles.txtStatusCancel,
                ]}>
                {findStatusOrder(data?.status)?.name || ''}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.txtPrice}>{`${currencyUs(data?.total)}`}</Text>
      </View>
      <View style={styles.vwFooter}>
        <Button style={[styles.btnAction, styles.btnRate]}>
          <Text medium>{'Rate'}</Text>
        </Button>
        <Button style={[styles.btnAction, styles.btnReOrder]}>
          <Text medium style={styles.txtReOrder}>
            {'Re-Order'}
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
  vwInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTimeEnd: {
    fontSize: fontSize.small,
    color: colors.gray_9796A1,
  },
  dotItem: {
    width: wScale(4),
    height: wScale(4),
    borderRadius: scale(4),
    marginRight: scale(6),
    marginLeft: scale(6),
    backgroundColor: colors.gray_9796A1,
  },
  txtItem: {
    fontSize: fontSize.small,
    color: colors.gray_9796A1,
  },
  txtBrand: {
    marginTop: scale(10),
  },
  txtPrice: {
    color: colors.orange_FE724C,
  },
  vwStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(8),
  },
  dotStatus: {
    width: wScale(6),
    height: wScale(6),
    borderRadius: scale(6),
    marginRight: scale(4),
    backgroundColor: colors.green_4EE476,
  },
  dotStatusCancel: {
    backgroundColor: colors.orange_FF3600,
  },
  txtStatus: {
    fontSize: fontSize.small,
    color: colors.green_4EE476,
  },
  txtStatusCancel: {
    color: colors.orange_FF3600,
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
  btnRate: {
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  btnReOrder: {
    backgroundColor: colors.orange_FE724C,
    ...radius.shadow,
  },
  txtReOrder: {
    color: colors.white,
  },
});

export default Card;