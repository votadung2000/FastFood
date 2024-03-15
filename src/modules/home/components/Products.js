import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {observer} from 'mobx-react';

import {Text, EmptyComponent, LoadingComponent} from '@components';
import {fontSize} from '@constant';
import {useStore} from '@context';
import {scale} from '@resolutions';

import CardProducts from './CardProducts';

const Products = () => {
  // const scrollViewRef = useRef(null);
  // const scrollDirection = useRef('');
  // const lastOffsetY = useRef(0);

  const {
    categoryStore: {isLoadingCategories, categories},
  } = useStore();

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <Text bold style={styles.nameCategory}>
          {item?.name}
        </Text>
        <CardProducts data={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Featured Items'}
      </Text>
      <FlatList
        data={categories?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
        contentContainerStyle={styles.ccSt}
        ListHeaderComponent={isLoadingCategories && <LoadingComponent />}
        ListFooterComponent={isLoadingCategories && <LoadingComponent />}
        ListEmptyComponent={
          !isLoadingCategories && (
            <EmptyComponent
              title="Product's Empty"
              // url={filterPr?.category_id?.image?.url}
            />
          )
        }
      />
      {/* <Animated.FlatList
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
      /> */}
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
  card: {
    marginBottom: scale(30),
  },
  nameCategory: {
    fontSize: fontSize.large,
    marginBottom: scale(10),
  },
});

export default observer(Products);
