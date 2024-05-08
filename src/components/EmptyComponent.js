import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors, fontSize} from '@constant';
import {scale} from '@resolutions';

import FastImage from './Image/FastImage';
import Text from './Text';

const EmptyComponent = ({url, title, Icon}) => {
  return (
    <View style={styles.emptyContainer}>
      {Icon && Icon}
      {url && <FastImage isPath source={{uri: url}} style={styles.emptyImg} />}
      <Text bold style={styles.txtEmpty}>
        {title || "Product's Empty"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(8),
  },
  emptyImg: {
    width: scale(100),
    height: scale(100),
    marginBottom: scale(8),
  },
  txtEmpty: {
    color: colors.graySystem2,
    fontSize: fontSize.large,
  },
});

export default EmptyComponent;
