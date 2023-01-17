import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {observer} from 'mobx-react';

import {Text, EmptyComponent, LoadingComponent} from '@components';
import {fontSize} from '@constant';
import {handleDataOdd, resolutions} from '@utils';
import {useStore} from '@context';

import {CardProducts} from './index';

const {scale} = resolutions;

const Products = () => {
  const {
    productsStore: {
      filterPr,
      products,
      isLoadingProducts,
      isFetchingProducts,
      loadMoreListProducts,
    },
  } = useStore();

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return item && Object.keys(item).length > 0 ? (
      <CardProducts data={item} />
    ) : null;
  };

  const onEndReached = () => {
    if (!isFetchingProducts && products?.total > products?.data?.length) {
      loadMoreListProducts();
    }
  };

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {`Popular ${filterPr?.category_id?.name || ''}`}
      </Text>
      <FlatList
        numColumns={2}
        data={handleDataOdd(products?.data)}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        bounces={false}
        columnWrapperStyle={styles.wrapperStyle}
        scrollIndicatorInsets={{right: 1}}
        ListHeaderComponent={isLoadingProducts && <LoadingComponent />}
        ListFooterComponent={isFetchingProducts && <LoadingComponent />}
        ListEmptyComponent={
          !isLoadingProducts && (
            <EmptyComponent
              title="Product's Empty"
              img={filterPr?.category_id}
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
  },
  title: {
    fontSize: fontSize.fontSize28,
    marginBottom: scale(10),
  },
  wrapperStyle: {
    justifyContent: 'space-around',
  },
});

export default observer(Products);
