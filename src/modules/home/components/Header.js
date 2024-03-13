import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, Button} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize, radius} from '@constant';
import {useStore} from '@context';
import {wScale} from '@resolutions';

const {scale} = resolutions;

const Header = () => {
  const {
    animatedMenuStore: {handleShowMenu},
  } = useStore();

  const goToUser = () => {
    handleShowMenu();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={goToUser} style={styles.btnMenu}>
          <Ionicons size={scale(22)} name="menu" color={colors.black} />
        </Button>
        <Button style={styles.btnAddress}>
          <View style={styles.vwIntro}>
            <Text medium style={styles.txtIntro}>
              {'Deliver to'}
            </Text>
            <Ionicons
              size={scale(22)}
              name="chevron-down"
              color={colors.black}
            />
          </View>
          <Text medium style={styles.address}>
            {'Address Demo'}
          </Text>
        </Button>
        <Image source={require('@images/avatar.png')} style={styles.img} />
      </View>
      <Text bold style={styles.title}>
        {'What would you like\nto order'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: scale(20),
    marginBottom: scale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnMenu: {
    width: wScale(40),
    height: wScale(40),
    borderRadius: radius.radius10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...radius.shadow,
  },
  btnAddress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwIntro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtIntro: {
    marginRight: scale(4),
  },
  address: {
    color: colors.orange_FE724C,
  },
  img: {
    width: wScale(40),
    height: wScale(40),
    borderRadius: radius.radius10,
  },
  title: {
    marginTop: scale(28),
    fontSize: fontSize.fontSize30,
  },
});

export default observer(Header);
