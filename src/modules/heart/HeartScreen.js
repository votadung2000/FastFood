import React from 'react';
import {View, FlatList, Image} from 'react-native';
import {observer} from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, Button} from '../../components';
import {scale} from '../../utils/resolutions';
import styles from './styles';
import {formatCurrency, handleHeart} from '../../utils';
import {useStore} from '../../context';
import {colors} from '../../constant';
import routes from '../routes';

const HeartScreen = ({navigation}) => {
  const {
    heartProductsStore: {heartProducts, fetchHeartProduct},
    productsDetailStore: {fetchProductsDetail},
    cartProductsStore: {fetchCartProduct},
  } = useStore();

  const handleProduct = item => {
    fetchProductsDetail(item?.id);
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const handlePlusCart = item => {
    fetchCartProduct(item);
  };

  const handleFetchHeart = item => {
    fetchHeartProduct(item);
  };

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => {
    return (
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
        <View style={styles.footer}>
          <Button onPress={() => handleFetchHeart(item)} style={styles.plus}>
            <Ionicons
              name={
                handleHeart(item?.id, heartProducts) ? 'heart' : 'heart-outline'
              }
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
        {'Your Heart'}
      </Text>
      {heartProducts?.length === 0 ? (
        <EmptyHeart />
      ) : (
        <FlatList
          data={heartProducts}
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

export default observer(HeartScreen);
