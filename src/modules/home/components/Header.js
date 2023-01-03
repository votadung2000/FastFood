import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text, Button} from '@components';
import {resolutions} from '@utils';
import {colors, fontSize} from '@constant';
import routes from '@routes';

const {scale} = resolutions;

const Header = () => {
  const navigation = useNavigation();

  const goToUser = () => {
    navigation.navigate(routes.LoginScreen);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{'Find Your\nDelicious Food'}</Text>
      <Button onPress={goToUser} style={styles.btnUser}>
        <AntDesign size={scale(22)} name="user" color={colors.black} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(15),
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
  },
});

export default Header;
