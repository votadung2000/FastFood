import React, {useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {observer} from 'mobx-react';

import {Text, EmptyComponent, LoadingComponent} from '@components';
import {fontSize} from '@constant';
import {useStore} from '@context';
import {hScale, scale} from '@resolutions';

import CardProducts from './CardProducts';

const Products = ({animatedValue}) => {
  const scrollViewRef = useRef(null);
  const scrollDirection = useRef('');

  const {
    categoryStore: {isLoadingCategories, categories},
  } = useStore();

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    if (item?.products?.length > 0) {
      return (
        <View style={styles.card}>
          <Text bold style={styles.nameCategory}>
            {item?.name}
          </Text>
          <CardProducts data={item} />
        </View>
      );
    }

    return;
  };

  const handleScrollEndDrag = () => {
    if (scrollViewRef.current && scrollDirection.current) {
      scrollViewRef.current.scrollTo({
        y: scrollDirection.current === 'down' ? hScale(80) : 0,
        animated: true,
      });
    }
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: animatedValue}}}],
    {useNativeDriver: false},
  );

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Featured Items'}
      </Text>
      <Animated.FlatList
        ref={scrollViewRef}
        data={categories?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
        contentContainerStyle={styles.ccSt}
        ListHeaderComponent={isLoadingCategories && <LoadingComponent />}
        ListFooterComponent={isLoadingCategories && <LoadingComponent />}
        ListEmptyComponent={
          !isLoadingCategories && <EmptyComponent title="Product's Empty" />
        }
        onScroll={onScroll}
        handleScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
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
  card: {
    marginBottom: scale(30),
  },
  nameCategory: {
    fontSize: fontSize.large,
    marginBottom: scale(10),
  },
});

export default observer(Products);
