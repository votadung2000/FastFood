import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {scale} from '@resolutions';

import Card from './Card';

const UpcomingOrderScreen = () => {
  const keyExtractor = (_, index) => index.toString();

  const renderItem = () => {
    return <Card />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, 3]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.ccSt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: scale(25),
  },
  ccSt: {
    paddingBottom: scale(50),
    padding: scale(1),
  },
});

export default UpcomingOrderScreen;
