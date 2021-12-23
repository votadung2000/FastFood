import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors, fontSize} from '../../constant';
import {hScale, scale} from '../../utils/resolutions';

const Search = ({placeholder, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={scale(22)}
        color={colors.graySystem}
        style={styles.icon}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.graySystem}
        autoCapitalize="none"
        style={styles.inputSearch}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Search;

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
    borderRadius: scale(6),
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
