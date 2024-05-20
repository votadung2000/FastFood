import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@components';
import {scale} from '@resolutions';
import {fontSize} from '@constant';

import CardProduct from './CardProduct';

const OrdersFood = ({data}) => {
  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Orders food'}
      </Text>
      {data?.order_item?.map((item, index) => {
        return <CardProduct key={index?.toString()} data={item} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
  },
  title: {
    fontSize: fontSize.large,
  },
});

export default OrdersFood;
