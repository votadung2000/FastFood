import React, {useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import _uniqBy from 'lodash/uniqBy';

import {Text, Back, Button, ModalLoading} from '../../components';
import styles from './styles';
import {useStore} from '../../context';
import {colors} from '../../constant';
import {formatCurrency, findId, handleHeart} from '../../utils';
import {scale} from '../../utils/resolutions';
import ListExtraFood from './components/ListExtraFood';

const ProductsDetailScreen = () => {
  const {
    productsDetailStore: {extraFood, productDetail},
    cartProductsStore: {updateCartProduct},
    heartProductsStore: {heartProducts, updateHeartProduct},
  } = useStore();

  const [extra, setExtra] = useState(null);

  const {id, img, name, price, description, taste} = productDetail;

  const handleFavorite = () => {
    updateHeartProduct(productDetail);
  };

  const handlePlusCart = () => {
    updateCartProduct(productDetail);
  };

  const handleExtraFood = item => {
    if (extra && extra.length > 0) {
      if (findId(extra, item?.id)) {
        const newData = extra.filter(ext => ext?.id !== item?.id);
        setExtra(newData);
      } else {
        setExtra(_uniqBy([...extra, item], 'id'));
      }
    } else {
      setExtra([item]);
    }
  };

  if (!Object.keys(productDetail)?.length) {
    return <ModalLoading />;
  }

  return (
    <View style={styles.layout}>
      <ScrollView
        bounces={false}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{right: 1}}>
        <View style={styles.container}>
          <Back
            heart
            position
            favorite={handleHeart(id, heartProducts)}
            handleFavorite={handleFavorite}
          />
          <View style={styles.header}>
            {img && <Image source={{uri: img}} style={styles.img} />}
          </View>
          <View style={styles.body}>
            <View style={styles.headerContent}>
              <Text bold style={styles.txtTitle}>
                {name}
              </Text>
              <Text
                bold
                style={[styles.txtTitle, styles.price]}>{`${formatCurrency(
                price,
              )} VNĐ`}</Text>
            </View>
            <Text style={styles.txtContent}>{taste}</Text>
            <ListExtraFood
              data={extraFood}
              handleExtraFood={handleExtraFood}
              extra={extra}
            />
            <Text style={styles.txtContent}>{description}</Text>
          </View>
        </View>
      </ScrollView>
      <Button onPress={() => handlePlusCart()} style={styles.plus}>
        <AntDesign name="shoppingcart" size={scale(24)} color={colors.white} />
      </Button>
    </View>
  );
};

export default observer(ProductsDetailScreen);
