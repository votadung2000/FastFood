import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {colors, fontSize} from '@constant';
import {hScale, scale, wScale} from '@resolutions';
import {Button, Text} from '@components';
import {
  SVG_My_Order,
  SVG_Profile,
  SVG_Delivery_Address,
  SVG_Payment,
  SVG_Contact,
  SVG_Setting,
  SVG_Helps,
} from '@svg';

import ItemMenu from './ItemMenu';

const Menu = () => {
  return (
    <View style={styles.container}>
      <Image source={require('@images/avatar.png')} style={styles.img} />
      <View style={styles.vwInfo}>
        <Text bold style={styles.name}>
          {'Name Demo'}
        </Text>
        <Text style={styles.email}>{'demo@gmail.com'}</Text>
      </View>
      <View style={styles.menu}>
        <ItemMenu Icon={<SVG_My_Order />} label={'My Orders'} />
        <ItemMenu Icon={<SVG_Profile />} label={'My Profile'} />
        <ItemMenu Icon={<SVG_Delivery_Address />} label={'Delivery Address'} />
        <ItemMenu Icon={<SVG_Payment />} label={'Payment Methods'} />
        <ItemMenu Icon={<SVG_Contact />} label={'Contact Us'} />
        <ItemMenu Icon={<SVG_Setting />} label={'Settings'} />
        <ItemMenu Icon={<SVG_Helps />} label={'Helps & FAQs'} />
      </View>
      <Button style={styles.btnLogOut}>
        <Image
          source={require('@images/log_out.png')}
          style={styles.imgLogOut}
        />
        <Text style={styles.txtLogOut}>{'Log Out'}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginLeft: scale(20),
    marginTop: scale(50),
  },
  img: {
    width: wScale(90),
    height: wScale(90),
    borderRadius: scale(90),
  },
  vwInfo: {
    marginTop: scale(20),
  },
  name: {
    fontSize: fontSize.big,
  },
  email: {
    marginTop: scale(8),
    color: colors.gray_9796A1,
    fontSize: fontSize.small,
  },
  menu: {
    marginTop: scale(30),
  },
  btnLogOut: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scale(30),
    width: wScale(120),
    height: hScale(44),
    borderRadius: scale(22),
    backgroundColor: colors.orange_FE724C,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imgLogOut: {
    width: wScale(26),
    height: wScale(26),
  },
  txtLogOut: {
    color: colors.white,
  },
});

export default Menu;
