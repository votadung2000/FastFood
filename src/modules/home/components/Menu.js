import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {observer} from 'mobx-react';

import {Text, Button, EmptyComponent, FastImage} from '@components';
import {colors, fontSize} from '@constant';
import {resolutions, limitedString} from '@utils';
import {useStore} from '@context';

const {scale} = resolutions;

const Menu = ({itemMenu, handleItem}) => {
  const {
    categoryStore: {categories, isLoadingCategories},
  } = useStore();

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return (
      <Button
        onPress={() => handleItem(item)}
        style={[
          styles.item,
          item?.id === itemMenu?.id ? styles.upShadow : styles.shadow,
        ]}>
        <FastImage source={{uri: item?.img}} style={styles.imgMenu} />
        <Text bold style={styles.txtItem}>
          {limitedString(item?.name, 6)}
        </Text>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
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
    marginBottom: scale(15),
  },
  item: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(10),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgMenu: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(10),
    marginBottom: scale(8),
  },
  txtItem: {
    fontSize: fontSize.smaller,
  },
  upShadow: {
    shadowOpacity: 0.3,
  },
  shadow: {
    shadowOpacity: 0.05,
  },
});

export default observer(Menu);
