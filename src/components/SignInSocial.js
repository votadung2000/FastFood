import React from 'react';
import {StyleSheet, View} from 'react-native';

import {hScale, scale} from '@resolutions';
import {colors, fontSize, radius} from '@constant';
import {SVG_Facebook, SVG_Google} from '@svg';

import Button from './Button/Button';
import Text from './Text';

const SignInSocial = () => {
  return (
    <View style={styles.container}>
      <View style={styles.vwTitle}>
        <View style={styles.vwLine} />
        <Text medium style={styles.txtTile}>
          {'sign in with'}
        </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    paddingHorizontal: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'rgba(179, 179, 179, 0.5)',
  },
  txtTile: {
    fontSize: fontSize.fontSize14,
    color: colors.blue_5B5B5E,
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
    marginTop: scale(15),
  },
  btnSocial: {
    width: '45%',
    height: hScale(54),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.radius30,
    ...radius.shadow,
  },
  txtSocial: {
    fontSize: fontSize.fontSize14,
    marginLeft: scale(8),
  },
});

export default SignInSocial;
