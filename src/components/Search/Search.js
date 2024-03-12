import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors, fontSize, radius} from '@constant';
import {hScale, scale} from '@resolutions';

const Search = ({style, value, placeholder, onChangeText}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name="search"
        size={scale(22)}
        color={colors.graySystem}
        style={styles.icon}
      />
      <TextInput
        value={value}
        placeholder={placeholder}
        autoCapitalize="none"
        style={styles.inputSearch}
        onChangeText={onChangeText}
        placeholderTextColor={colors.graySystem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: radius.radius6,
    marginBottom: scale(10),
  },
  icon: {
    position: 'absolute',
    left: scale(10),
    zIndex: 9999,
  },
  inputSearch: {
    color: colors.black,
    fontSize: fontSize.normal,
    backgroundColor: colors.systemGray3,
    height: hScale(38),
    width: '100%',
    paddingLeft: scale(40),
  },
});

export default React.memo(Search);
