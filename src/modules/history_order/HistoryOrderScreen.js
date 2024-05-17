import React, {useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {observer} from 'mobx-react';

import {EmptyComponent} from '@components';
import {scale} from '@resolutions';
import {useStore} from '@context';
import {SVG_Order_Empty} from '@svg';

import Card from './Card';

const HistoryOrderScreen = () => {
  const {
    orderStore: {orders, isLoadingOrders, fetchApiListOrder},
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      fetchApiListOrder();
    }, []),
  );

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return <Card data={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.ccSt}
        ListEmptyComponent={
          !isLoadingOrders && (
            <EmptyComponent
              title="No history orders"
              Icon={<SVG_Order_Empty width={scale(120)} height={scale(120)} />}
              des={
                'No order history have been placed yet.\nDiscover and order now.'
              }
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(25),
  },
  ccSt: {
    flexGrow: 1,
    paddingBottom: scale(50),
    padding: scale(1),
  },
});

export default observer(HistoryOrderScreen);
