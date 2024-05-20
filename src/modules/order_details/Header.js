import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

import {Text} from '@components';
import {scale, wScale} from '@resolutions';
import {
  colors,
  findStatusOrder,
  fontSize,
  radius,
  STATUS_ORDER,
} from '@constant';

let appName = DeviceInfo.getApplicationName();

const Header = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.vwHeaderLeft}>
        <View style={styles.vwLogo}>
          <Image source={require('@images/logo.png')} style={styles.imgLogo} />
        </View>
        <View style={styles.vwContentHeader}>
          <Text medium style={styles.txtTimeEnd}>
            {moment(
              new Date(
                data?.status === STATUS_ORDER.CANCELED
                  ? data?.canceled_at
                  : data?.completed_at,
              ),
            ).format('DD MMM, HH:mm')}
          </Text>

          <Text bold style={styles.txtBrand}>
            {`${appName}`}
          </Text>
          <View style={styles.vwStatus}>
            <View
              style={[
                styles.dotStatus,
                {
                  backgroundColor: findStatusOrder(data?.status)?.color,
                },
              ]}
            />
            <Text
              medium
              style={[
                styles.txtStatus,
                {
                  color: findStatusOrder(data?.status)?.color,
                },
              ]}>
              {findStatusOrder(data?.status)?.name || ''}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.txtId}>{`#${data?.id || ''}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: radius.radius10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...radius.shadow,
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
    alignItems: 'center',
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
  txtTimeEnd: {
    fontSize: fontSize.small,
    color: colors.gray_9796A1,
  },
  txtBrand: {
    marginTop: scale(10),
  },
  txtId: {
    fontSize: fontSize.large,
    color: colors.gray_9796A1,
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
  txtStatus: {
    fontSize: fontSize.small,
    color: colors.green_4EE476,
  },
});

export default Header;
