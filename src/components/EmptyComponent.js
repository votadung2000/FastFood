import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text, FastImage} from '@components';
import {colors, fontSize} from '@constant';
import {resolutions} from '@utils';

const {scale} = resolutions;

const EmptyComponent = ({url, title}) => {
  return (
    <View style={styles.emptyContainer}>
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
