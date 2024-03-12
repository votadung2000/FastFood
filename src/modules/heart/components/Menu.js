import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {observer} from 'mobx-react';

import {EmptyComponent} from '@components';
import {useStore} from '@context';
import {scale} from '@resolutions';

import CardMenu from './CardMenu';

const Menu = () => {
  const {
    categoryStore: {categories, isLoadingCategories},
  } = useStore();

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return <CardMenu data={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        data={categories?.data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          !isLoadingCategories && <EmptyComponent title={"Menu's Empty"} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
  },
});

export default observer(Menu);
