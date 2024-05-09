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
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: radius.radius10,
    backgroundColor: colors.white,
    ...radius.shadow,
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
    height: hScale(48),
    width: '100%',
    paddingLeft: scale(40),
  },
});

export default React.memo(Search);
