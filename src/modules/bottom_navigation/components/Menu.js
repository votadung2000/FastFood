import React, {useState} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';

import {colors, fontSize} from '@constant';
import {hScale, scale, wScale} from '@resolutions';
import {Button, Text, FastImage, Popup} from '@components';
import {useStore} from '@context';
import {
  SVG_My_Order,
  SVG_Profile,
  SVG_Delivery_Address,
  SVG_Payment,
  SVG_Contact,
  SVG_Setting,
  SVG_Helps,
} from '@svg';
import routes from '@routes';

import ItemMenu from './ItemMenu';
import {clearToken} from '@storage';

const Menu = () => {
  const navigation = useNavigation();

  const {
    userStore: {user, updateUser},
    cartProductsStore: {cartProducts},
  } = useStore();

  const [popup, setPopup] = useState(null);

  const handleNav = route => {
    navigation.navigate(route);
  };

  const handleConfirmLogOut = () => {
    setPopup({
      isVisible: true,
      title: 'Attention',
      accept: 'Sign Out',
      content: 'Do you want to sign out?',
      handleAccept: handleAccept,
      handleCancel: handleCancel,
    });
  };

  const handleAccept = async () => {
    setPopup({
      isVisible: false,
      onModalHide: async () => {
        await clearToken();
        updateUser(null);
      },
    });
  };

  const handleCancel = () => {
    setPopup({isVisible: false});
  };

  return (
    <ScrollView
      bounces
      style={styles.scroll}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {user?.avatar ? (
          <FastImage
            isPath
            source={{uri: user?.avatar?.url}}
            style={styles.img}
          />
        ) : (
          <Image source={require('@images/avatar.png')} style={styles.img} />
        )}
        <View style={styles.vwInfo}>
          <Text bold style={styles.name}>
            {user?.name || ''}
          </Text>
          <Text style={styles.email}>{user?.email || ''}</Text>
        </View>
        <View style={styles.menu}>
          <ItemMenu
            label={'My Orders'}
            count={cartProducts?.length || 0}
            Icon={<SVG_My_Order />}
            onPress={() => handleNav(routes.OrderScreen)}
          />
          <ItemMenu
            label={'My Profile'}
            Icon={<SVG_Profile />}
            onPress={() => handleNav(routes.ProfileScreen)}
          />
          <ItemMenu
            Icon={<SVG_Delivery_Address />}
            label={'Delivery Address'}
            onPress={() => handleNav(routes.DeliveryAddressScreen)}
          />
          <ItemMenu Icon={<SVG_Payment />} label={'Payment Methods'} />
          <ItemMenu Icon={<SVG_Contact />} label={'Contact Us'} />
          <ItemMenu
            label={'Settings'}
            Icon={<SVG_Setting />}
            onPress={() => handleNav(routes.SettingScreen)}
          />
          <ItemMenu Icon={<SVG_Helps />} label={'Helps & FAQs'} />
        </View>
        <Button style={styles.btnLogOut} onPress={handleConfirmLogOut}>
          <Image
            source={require('@images/log_out.png')}
            style={styles.imgLogOut}
          />
          <Text style={styles.txtLogOut}>{'Log Out'}</Text>
        </Button>
        <Popup {...popup} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginLeft: scale(20),
    marginTop: scale(50),
    paddingBottom: scale(30),
  },
  img: {
    width: wScale(90),
    height: wScale(90),
    borderRadius: scale(90),
  },
  vwInfo: {
    marginTop: scale(10),
  },
  name: {
    fontSize: fontSize.big,
  },
  email: {
    marginTop: scale(4),
    color: colors.gray_9796A1,
    fontSize: fontSize.small,
  },
  menu: {
    marginTop: scale(30),
  },
  btnLogOut: {
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

export default observer(Menu);
