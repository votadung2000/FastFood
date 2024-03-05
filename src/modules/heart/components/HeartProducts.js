import React from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '@components';
import {colors, fontSize} from '@constant';
import {useStore} from '@context';
import {resolutions} from '@utils';

import {CardFavorite} from './index';

const {scale} = resolutions;

const HeartProducts = () => {
  const {
    favoritesStore: {favorites, filterFavorites, isLoadingFavorites},
  } = useStore();

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return <CardFavorite data={item} />;
  };

  const EmptyFavorite = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={{uri: 'hearts_empty'}} style={styles.emptyImg} />
        <Text bold style={styles.txtEmpty}>
          {"Heart's Empty"}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {filterFavorites?.category_id?.name || 'All'}
      </Text>
      <FlatList
        data={favorites?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
        contentContainerStyle={styles.containerStyle}
        scrollIndicatorInsets={{right: 1}}
        ListEmptyComponent={!isLoadingFavorites && <EmptyFavorite />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.normal,
    marginTop: scale(5),
    marginBottom: scale(10),
  },
  containerStyle: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(1),
    marginTop: scale(5),
  },
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

export default observer(HeartProducts);
