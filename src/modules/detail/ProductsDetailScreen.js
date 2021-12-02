import React, {useEffect, useState} from 'react';
import {View, Image, ActivityIndicator, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import _uniqBy from 'lodash/uniqBy';

import {Layout} from '../../views';
import {Text, Back, Button} from '../../components';
import styles from './styles';
import {useStore} from '../../context';
import {colors} from '../../constant';
import {formatCurrency, findId} from '../../utils';
import {scale} from '../../utils/resolutions';
import ListExtraFood from './components/ListExtraFood';

const ProductsDetailScreen = ({route}) => {
  const {
    productsDetailStore: {extraFood, productDetail, fetchProductsDetail},
  } = useStore();

  const [extra, setExtra] = useState(null);

  useEffect(() => {
    fetchProductsDetail(route.params?.id);
  }, []);

  const {img, name, price, description, taste} = productDetail;

  const handleFavorite = () => {};

  const handlePlusCart = () => {};

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

  if (!productDetail) {
    return <ActivityIndicator color={colors.gray} />;
  }

  return (
    <Layout>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{right: 1}}>
        <View style={styles.container}>
          <Back
            heart
            position
            favorite={false}
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
    </Layout>
  );
};

export default observer(ProductsDetailScreen);
