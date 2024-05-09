import React from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text, Button, FastImage} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize, radius} from '@constant';
import {useStore} from '@context';
import {wScale} from '@resolutions';

const {scale} = resolutions;

const Header = ({titleHeaderAnimation}) => {
  const {
    animatedMenuStore: {isShowMenu, handleShowMenu},
    userStore: {user},
  } = useStore();

  const goToUser = () => {
    handleShowMenu();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={goToUser} style={styles.btnMenu}>
          <AntDesign
            size={scale(20)}
            name={isShowMenu ? 'menu-unfold' : 'menu-fold'}
            color={colors.black}
          />
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
        {user?.avatar ? (
          <FastImage
            isPath
            source={{uri: user?.avatar?.url}}
            style={styles.img}
          />
        ) : (
          <Image source={require('@images/avatar.png')} style={styles.img} />
        )}
      </View>
      <Animated.View style={[styles.vwTitle, titleHeaderAnimation]}>
        <Text bold style={styles.title}>
          {'What would you like\nto order'}
        </Text>
      </Animated.View>
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
    width: wScale(38),
    height: wScale(38),
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
    width: wScale(38),
    height: wScale(38),
    borderRadius: radius.radius10,
  },
  vwTitle: {
    justifyContent: 'center',
    marginTop: scale(10),
  },
  title: {
    fontSize: fontSize.fontSize30,
    color: colors.black,
  },
});

export default observer(Header);
