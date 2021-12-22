import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {Text, Button} from '../../../components';
import {colors, fontSize} from '../../../constant';
import {scale} from '../../../utils/resolutions';
import {limitedString} from '../../../utils';

const Menu = ({data, itemMenu, handleItem}) => {
  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return (
      <Button
        onPress={() => handleItem(item)}
        style={[
          styles.item,
          item?.id === itemMenu?.id ? styles.upShadow : styles.shadow,
        ]}>
        <Image source={{uri: item.img}} style={styles.imgMenu} />
        <Text bold style={styles.txtItem}>
          {limitedString(item.title, 6)}
        </Text>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text bold style={styles.txtTitle}>
            {'Menu'}
          </Text>
        }
        ListHeaderComponentStyle={styles.stHeaderCp}
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
  stHeaderCp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(5),
  },
  txtTitle: {
    fontSize: fontSize.normal,
  },
});

export default Menu;
