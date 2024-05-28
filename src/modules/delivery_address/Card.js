import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import moment from 'moment';

import {Text, Button} from '@components';
import {scale, wScale} from '@resolutions';
import {
  DEFAULT_DELIVERY_ADDRESS,
  checkDefaultDeliveryAddress,
  findTypeDeliveryAddress,
  colors,
  fontSize,
  radius,
} from '@constant';
import {formatNaturalNumber} from '@utils';
import {useStore} from '@context';
import routes from '@routes';

const Card = ({data}) => {
  const navigation = useNavigation();

  const {
    deliveryAddressStore: {fetchApiDetailAddress},
  } = useStore();

  const handleDetail = () => {
    fetchApiDetailAddress(data?.id);
    navigation.navigate(routes.DetailDeliveryAddressScreen);
  };

  return (
    <Button style={styles.container} onPress={handleDetail}>
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
        {checkDefaultDeliveryAddress(data?.default) && (
          <View style={styles.vwType}>
            <Text style={styles.txtType}>
              {DEFAULT_DELIVERY_ADDRESS.DEFAULT.name}
            </Text>
          </View>
        )}
      </View>
    </Button>
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
  vwType: {
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: colors.orange_FE724C,
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: radius.radius4,
  },
  txtType: {
    fontSize: fontSize.small,
    color: colors.orange_FE724C,
  },
});

export default observer(Card);
