import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {Back, EmptyComponent, LoadingComponent} from '@components';
import {colors} from '@constant';
import {scale} from '@resolutions';

import Card from './Card';

const HelpsAndFAQsScreen = () => {
  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return <Card data={item} />;
  };

  return (
    <View style={styles.container}>
      <Back title={'FAQs'} />
      <View style={styles.content}>
        <FlatList
          data={[1, 2, 3]}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          bounces={false}
          contentContainerStyle={styles.ccSt}
          ListHeaderComponent={false && <LoadingComponent />}
          ListFooterComponent={false && <LoadingComponent />}
          ListEmptyComponent={!false && <EmptyComponent title="FAQ's Empty" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: scale(25),
    marginTop: scale(30),
  },
});

export default HelpsAndFAQsScreen;
