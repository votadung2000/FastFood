import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text, Button} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize} from '@constant';
import {useStore} from '@context';

const {scale} = resolutions;

const Header = () => {
  const {
    animatedMenuStore: {handleShowMenu},
  } = useStore();

  const goToUser = () => {
    handleShowMenu();
  };

  return (
    <View style={styles.header}>
      <Button onPress={goToUser} style={styles.btnUser}>
        <AntDesign size={scale(22)} name="user" color={colors.black} />
      </Button>
      <Text style={styles.title}>{'Find Your\nDelicious Food'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  title: {
    fontSize: fontSize.fontSize28,
    lineHeight: scale(35),
    fontWeight: '700',
  },
  btnUser: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(40),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default observer(Header);
