import React from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, Button} from '../../../components';
import {colors, fontSize} from '../../../constant';
import {scale} from '../../../utils/resolutions';
import {formatCurrency, limitedString, handleHeart} from '../../../utils';
import { toJS } from 'mobx';

const HeartProducts = ({
  itemMenu,
  data,
  handlePlusCart,
  handleProduct,
  handleRemoveHeart,
}) => {
  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return (
      <Button onPress={() => handleProduct(item)} style={styles.item}>
        <Image source={{uri: item?.img}} style={styles.img} />
        <View style={styles.content}>
          <Text bold style={[styles.txtItem, styles.txtName]}>
            {limitedString(item?.name, 10)}
          </Text>
          <Text style={[styles.txtItem, styles.txtTaste]}>{item?.taste}</Text>
          <Text bold style={styles.txtItem}>{`${formatCurrency(
            item?.price,
          )} Đ`}</Text>
        </View>
        <View style={styles.footer}>
          <Button onPress={() => handleRemoveHeart(item)} style={styles.plus}>
            <Ionicons
              name={handleHeart(item?.id, data) ? 'heart' : 'heart-outline'}
              size={scale(26)}
              color={colors.heart}
            />
          </Button>
          <Button onPress={() => handlePlusCart(item)} style={styles.plus}>
            <AntDesign
              name="pluscircle"
              size={scale(26)}
              color={colors.orange}
            />
          </Button>
        </View>
      </Button>
    );
  };

  const EmptyHeart = () => {
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
        {itemMenu ? itemMenu?.title : 'All'}
      </Text>
      {data?.length === 0 ? (
        <EmptyHeart />
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          bounces={false}
          contentContainerStyle={styles.containerStyle}
          scrollIndicatorInsets={{right: 1}}
        />
      )}
    </View>
  );
};

export default React.memo(HeartProducts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.normal,
    marginTop: scale(5),
    marginBottom: scale(10),
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
    backgroundColor: colors.white,
    borderRadius: scale(15),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  img: {
    width: scale(70),
    height: scale(70),
  },
  txtItem: {
    textAlign: 'auto',
    fontSize: fontSize.fontSize14,
  },
  content: {
    width: '50%',
    paddingHorizontal: scale(5),
  },
  txtTaste: {
    fontSize: fontSize.small,
    color: colors.gray,
    marginBottom: scale(6),
  },
  txtName: {
    fontSize: fontSize.fontSize16,
    marginBottom: scale(6),
  },
  plus: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
    zIndex: 999,
  },
  containerStyle: {
    paddingHorizontal: scale(10),
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
  footer: {
    alignItems: 'center',
  },
});
