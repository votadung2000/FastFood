import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@components';
import {scale, wScale} from '@resolutions';
import {colors, findTypeDeliveryAddress, fontSize, radius} from '@constant';

const Card = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.vwIcon}>
        <View style={styles.vwBgIcon}>{findTypeDeliveryAddress(2)?.Icon}</View>
      </View>
      <View style={styles.vwContent}>
        <Text bold>{`${findTypeDeliveryAddress(2)?.name || ''}`}</Text>
        <Text medium style={styles.txtGlobal}>
          {`${'542-154-5184'}`}
        </Text>
        <Text medium style={styles.txtGlobal}>
          {`${'4261 Kembery Drive, Chicago, LSA'}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
    padding: scale(15),
    backgroundColor: colors.white,
    borderRadius: radius.radius10,
    ...radius.shadow,
  },
  vwIcon: {
    width: wScale(65),
    height: wScale(65),
    padding: scale(1),
    borderRadius: radius.radius10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  vwBgIcon: {
    width: wScale(45),
    height: wScale(45),
    borderRadius: scale(45),
    backgroundColor: colors.orange_FE724C,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    width: '100%',
    height: '100%',
    borderRadius: radius.radius10,
  },
  vwContent: {
    marginLeft: scale(18),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtGlobal: {
    marginTop: scale(8),
    fontSize: fontSize.small,
    color: colors.gray_9796A1,
  },
});

export default Card;
