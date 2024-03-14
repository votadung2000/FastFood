import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {observer} from 'mobx-react';

import {Text, EmptyComponent, LoadingComponent} from '@components';
import {fontSize} from '@constant';
import {handleDataOdd} from '@utils';
import {useStore} from '@context';
import {scale} from '@resolutions';

import CardProducts from './CardProducts';

const Products = ({animatedValue}) => {
  const scrollViewRef = useRef(null);
  const scrollDirection = useRef('');
  const lastOffsetY = useRef(0);

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
      <Animated.FlatList
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
        ref={scrollViewRef}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          console.log('offsetY', offsetY);
          animatedValue.setValue(offsetY);
        }}
        // onScrollEndDrag={() => {
        //   scrollViewRef.current?.scrollTo({
        //     y: scrollDirection.current === 'down' ? 100 : 0,
        //     animated: true,
        //   });
        // }}
        scrollEventThrottle={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: scale(30),
  },
  title: {
    fontSize: fontSize.fontSize28,
    marginBottom: scale(10),
  },
  ccSt: {
    flexGrow: 1,
    paddingBottom: scale(50),
  },
  wrapperStyle: {
    justifyContent: 'space-around',
  },
});

export default observer(Products);
