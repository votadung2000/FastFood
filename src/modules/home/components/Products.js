import React from 'react';
import {StyleSheet, View, Dimensions, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text, Button, ModalLoading} from '../../../components';
import {colors, fontSize} from '../../../constant';
import {hScale, scale} from '../../../utils/resolutions';
import {formatCurrency} from '../../../utils';

const {width} = Dimensions.get('window');

const Products = ({title, data, handlePlusCart, handleProduct}) => {
  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return item && Object.keys(item).length > 0 ? (
      <Button onPress={() => handleProduct(item)} style={styles.item}>
        <Image source={{uri: item?.img}} style={styles.img} />
        <View style={styles.content}>
          <Text bold style={[styles.txtItem, styles.txtName]}>
            {item?.name}
          </Text>
          <Text style={[styles.txtItem, styles.txtTaste]}>{item?.taste}</Text>
          <Text bold style={styles.txtItem}>{`${formatCurrency(
            item?.price,
          )} Đ`}</Text>
        </View>
        <Button onPress={() => handlePlusCart(item)} style={styles.plus}>
          <AntDesign name="pluscircle" size={scale(26)} color={colors.orange} />
        </Button>
      </Button>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>{`Popular ${title}`}</Text>
      <FlatList
        numColumns={2}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
        columnWrapperStyle={styles.wrapperStyle}
        contentContainerStyle={styles.containerStyle}
        scrollIndicatorInsets={{right: 1}}
        ListHeaderComponent={
          <ModalLoading isVisible={data?.length ? false : true} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.fontSize28,
    marginBottom: scale(10),
  },
  item: {
    width: width / 2.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(80),
    backgroundColor: colors.white,
    borderRadius: scale(15),
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
    width: scale(80),
    height: scale(80),
    position: 'absolute',
    top: -hScale(60),
    zIndex: 9999,
  },
  txtItem: {
    textAlign: 'auto',
    fontSize: fontSize.fontSize14,
    marginBottom: scale(6),
  },
  content: {
    width: '100%',
    marginTop: scale(25),
  },
  txtTaste: {
    fontSize: fontSize.small,
    color: colors.gray,
  },
  txtName: {
    fontSize: fontSize.fontSize16,
    textAlign: 'center',
  },
  plus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
  },
  wrapperStyle: {
    justifyContent: 'space-around',
  },
  containerStyle: {
    marginTop: scale(65),
  },
});

export default Products;
