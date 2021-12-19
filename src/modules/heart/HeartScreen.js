import React from 'react';
import {View, FlatList, Image} from 'react-native';
import {observer} from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text, Button} from '../../components';
import {scale} from '../../utils/resolutions';
import styles from './styles';
import {formatCurrency} from '../../utils';
import {useStore} from '../../context';
import {colors} from '../../constant';

const HeartScreen = () => {
  const {
    heartProductsStore: {heartProducts},
  } = useStore();

  const handleProduct = () => {};

  const handlePlusCart = () => {};

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
        {'Your Heart'}
      </Text>
      {heartProducts?.length === 0 ? (
        <EmptyHeart />
      ) : (
        <FlatList
          numColumns={2}
          data={heartProducts}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          bounces={false}
          columnWrapperStyle={styles.wrapperStyle}
          contentContainerStyle={styles.containerStyle}
          scrollIndicatorInsets={{right: 1}}
        />
      )}
    </View>
  );
};

export default observer(HeartScreen);
