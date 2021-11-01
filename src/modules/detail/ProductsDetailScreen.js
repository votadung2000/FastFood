import React, {useEffect} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react';

import {Layout} from '../../views';
// import {Text, Button} from '../../components';
import styles from './styles';
import {useStore} from '../../context';
import {colors} from '../../constant';

const ProductsDetailScreen = ({route}) => {
  const {
    productsDetailStore: {productDetail, fetchProductsDetail},
  } = useStore();

  useEffect(() => {
    fetchProductsDetail(route.params?.id);
  }, []);

  const {img} = productDetail;

  if (!productDetail) {
    return <ActivityIndicator color={colors.gray} />;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          {img && <Image source={{uri: img}} style={styles.img} />}
        </View>
      </View>
    </Layout>
  );
};

export default observer(ProductsDetailScreen);
