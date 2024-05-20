import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Button, Text} from '@components';
import {hScale, scale, wScale} from '@resolutions';
import {colors, fontSize, radius} from '@constant';

const InfoStore = () => {
  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Details'}
      </Text>
      <Text medium style={styles.txtAddress}>
        {'6391 Elgin St. Celina, Delaware 10299'}
      </Text>
      <View style={styles.vwFooter}>
        <View style={styles.vwFooterLeft}>
          <Image source={require('@images/avatar.png')} style={styles.img} />
          <View style={styles.vwInfoShipper}>
            <Text medium style={styles.txtId}>
              {`ID: ${'DKS-501F9'}`}
            </Text>
            <Text bold>{`${'Farion Wick'}`}</Text>
          </View>
        </View>
        <Button style={styles.btnCall}>
          <View style={styles.vwImgCall}>
            <FontAwesome5
              name="phone-alt"
              size={scale(18)}
              color={colors.orange_FE724C}
            />
          </View>
          <Text medium style={styles.txtCall}>
            {'Call'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
  },
  title: {
    fontSize: fontSize.large,
  },
  txtAddress: {
    marginTop: scale(10),
  },
  vwFooter: {
    marginTop: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vwFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: wScale(50),
    height: wScale(50),
    borderRadius: radius.radius10,
  },
  vwInfoShipper: {
    marginLeft: scale(10),
  },
  txtId: {
    fontSize: fontSize.small,
    color: colors.gray_9796A1,
    marginBottom: scale(6),
  },
  btnCall: {
    width: wScale(90),
    height: hScale(45),
    borderRadius: scale(26),
    backgroundColor: colors.orange_FE724C,
    flexDirection: 'row',
    alignItems: 'center',
    ...radius.shadow,
  },
  vwImgCall: {
    width: wScale(32),
    height: wScale(32),
    borderRadius: radius.radius20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(6),
  },
  imgCall: {
    width: wScale(18),
    height: wScale(18),
  },
  txtCall: {
    marginLeft: scale(6),
    color: colors.white,
  },
});

export default InfoStore;
