import React from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';

import {Text} from '@components';
import {scale, wScale} from '@resolutions';
import {colors, findTypeDeliveryAddress, fontSize, radius} from '@constant';
import {formatNaturalNumber} from '@utils';

const Card = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.vwIcon}>
        <View style={styles.vwBgIcon}>
          {findTypeDeliveryAddress(data?.type)?.Icon}
        </View>
      </View>
      <View style={styles.vwContent}>
        <Text bold>{`${findTypeDeliveryAddress(data?.type)?.name || ''}`}</Text>
        <Text medium style={styles.txtGlobal}>
          {`${formatNaturalNumber(data?.id) || ''}-${moment(
            new Date(data?.created_at),
          ).format('DD-MM-YY')}`}
        </Text>
        <Text medium style={styles.txtGlobal}>
          {`${data?.street_address || ''}`}
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
    width: '80%',
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
