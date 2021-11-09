import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {scale} from '../../../utils/resolutions';
import {Button} from '../../../components';

const ListExtraFood = ({data}) => {
  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return <Button />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ListExtraFood;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
  },
});
