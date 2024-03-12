import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {observer} from 'mobx-react';

import {Text, EmptyComponent, LoadingComponent} from '@components';
import {fontSize} from '@constant';
import {handleDataOdd} from '@utils';
import {useStore} from '@context';
import {hScale, scale} from '@resolutions';

import CardProducts from './CardProducts';

const Products = () => {
  const {
    categoryStore: {categories},
    productsStore: {
      filterPr,
      products,
      isLoadingProducts,
      isFetchingProducts,
      loadMoreListProducts,
      fetchApiListProducts,
    },
  } = useStore();

  useEffect(() => {
    fetchApiListProducts({category_id: categories?.data[0]});
  }, []);

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
        contentContainerStyle={styles.ccSt}
        scrollIndicatorInsets={{right: 1}}
        ListHeaderComponent={isLoadingProducts && <LoadingComponent />}
        ListFooterComponent={isFetchingProducts && <LoadingComponent />}
        ListEmptyComponent={
          !isLoadingProducts && (
            <EmptyComponent
              title="Product's Empty"
              url={filterPr?.category_id?.image?.url}
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
  ccSt: {
    flexGrow: 1,
    paddingBottom: hScale(50),
  },
  wrapperStyle: {
    justifyContent: 'space-around',
  },
});

export default observer(Products);
