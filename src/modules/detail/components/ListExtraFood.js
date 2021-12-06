import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {scale} from '../../../utils/resolutions';
import {Button, Text} from '../../../components';
import {colors, fontSize} from '../../../constant';
import {findId} from '../../../utils';

const ListExtraFood = ({data, handleExtraFood, extra}) => {
  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    const checkItem = !!extra && findId(extra, item?.id);
    return (
      <Button
        onPress={() => handleExtraFood(item)}
        style={[styles.btn, checkItem && styles.choose]}>
        <Text bold style={styles.name}>
          {item?.name}
        </Text>
        {/* {checkItem && (
          // <AntDesign
          //   name="check"
          //   size={scale(30)}
          //   color={colors.green}
          //   style={styles.icon}
          // />
        )} */}
      </Button>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        scrollIndicatorInsets={{right: 1}}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
  },
  btn: {
    marginRight: scale(10),
    width: scale(56),
    height: scale(56),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(15),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  name: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.small,
  },
  flatList: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(2),
  },
  choose: {
    borderWidth: 2,
    borderColor: colors.green,
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(ListExtraFood);
