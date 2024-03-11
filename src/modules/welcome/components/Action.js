import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button, Text} from '@components';
import {colors, fontSize, radius} from '@constant';
import {SVG_Facebook, SVG_Google} from '@svg';
import {hScale, scale} from '@resolutions';
import routes from '@routes';

const Action = () => {
  const navigation = useNavigation();

  const goToScreen = route => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.vwTitle}>
        <View style={styles.vwLine} />
        <Text style={styles.txtTile}>{'sign in with'}</Text>
        <View style={styles.vwLine} />
      </View>
      <View style={styles.vwSocial}>
        <Button style={styles.btnSocial}>
          <SVG_Facebook />
          <Text medium style={styles.txtSocial}>
            {'FACEBOOK'}
          </Text>
        </Button>
        <Button style={styles.btnSocial}>
          <SVG_Google />
          <Text medium style={styles.txtSocial}>
            {'GOOGLE'}
          </Text>
        </Button>
      </View>
      <Button
        style={styles.btnWithEP}
        onPress={() => goToScreen(routes.LoginScreen)}>
        <Text medium style={styles.txtWithEP}>
          {'Start with email or phone'}
        </Text>
      </Button>
      <View style={styles.vwRequest}>
        <Text style={styles.txtRequest}>{"Don't have an account?"}</Text>
        <Button
          style={styles.btnSignUp}
          onPress={() => goToScreen(routes.LoginScreen)}>
          <Text style={styles.txtSignUp}>{'Sign up'}</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    bottom: hScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(30),
  },
  vwTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vwLine: {
    width: '30%',
    height: hScale(1),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  txtTile: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
  },
  btnWithEP: {
    width: '100%',
    height: hScale(54),
    marginTop: scale(23),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.radius30,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: scale(1),
    borderColor: colors.white,
  },
  txtWithEP: {
    color: colors.white,
  },
  vwSocial: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(19),
  },
  btnSocial: {
    width: '45%',
    height: hScale(54),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.radius30,
  },
  txtSocial: {
    fontSize: fontSize.fontSize14,
    marginLeft: scale(8),
  },
  vwRequest: {
    marginTop: scale(28),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRequest: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
  },
  btnSignUp: {
    marginLeft: scale(6),
    paddingBottom: scale(1),
    borderBottomWidth: scale(1),
    borderBottomColor: colors.white,
  },
  txtSignUp: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
  },
});

export default Action;
