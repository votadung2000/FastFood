import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {Text, Button} from '../../../components';
import {fontSize} from '../../../constant';

const Products = ({title}) => {
  return (
    <View>
      <Text bold style={styles.title}>{`Popular ${title}`}</Text>
      <FlatList />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.fontSize28,
  },
});

export default Products;
