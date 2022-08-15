import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {Text} from '@components';
import {colors, fontSize} from '@constant';
import {resolutions} from '@utils';

const {scale} = resolutions;

const EmptyComponent = ({uri, title}) => {
  return (
    <View style={styles.emptyContainer}>
      {uri && <Image source={{uri: uri}} style={styles.emptyImg} />}
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
