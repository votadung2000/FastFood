import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {scale} from '../utils/resolutions';
import {colors, radius} from '../constant';
import {Button} from '../components';
import routes from '../modules/routes';

const Cart = () => {
  const navigation = useNavigation();

  const goToCart = () => {
    navigation.navigate(routes.CartScreen);
  };

  return (
    <View style={styles.container}>
      <Button style={styles.btn} onPress={() => goToCart()}>
        <AntDesign name="shoppingcart" size={scale(18)} color={colors.black} />
      </Button>
    </View>
  );
};

export default React.memo(Cart);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: scale(15),
    paddingVertical: scale(1),
  },
  btn: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    borderRadius: radius.radius6,
  },
});
