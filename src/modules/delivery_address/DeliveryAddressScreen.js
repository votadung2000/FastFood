import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {Back, Button, Text, LoadingComponent} from '@components';
import {hScale, scale} from '@resolutions';
import {colors, radius} from '@constant';
import {useStore} from '@context';
import routes from '@routes';

import Card from './Card';

const DeliveryAddressScreen = () => {
  const navigation = useNavigation();

  const {
    deliveryAddressStore: {address, isLoadingAddress, fetchApiListAddress},
  } = useStore();

  useEffect(() => {
    fetchApiListAddress();
  }, []);

  const keyExtractor = (_, index) => index?.toString();

  const renderItem = ({item}) => {
    return <Card data={item} />;
  };

  const navScreen = () => {
    navigation.navigate(routes.DetailDeliveryAddressScreen);
  };

  return (
    <View style={styles.container}>
      <Back title={'Delivery Address'} />
      <View style={styles.content}>
        <FlatList
          bounces={false}
          data={address}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ccSt}
          ListHeaderComponent={isLoadingAddress && <LoadingComponent />}
          ListFooterComponent={
            isLoadingAddress ? (
              <LoadingComponent />
            ) : (
              <Button style={styles.btnAction} onPress={navScreen}>
                <Text medium style={styles.txtAction}>
                  {'ADD NEW ADDRESS'}
                </Text>
              </Button>
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginTop: scale(20),
    paddingHorizontal: scale(25),
  },
  ccSt: {
    flexGrow: 1,
    paddingBottom: scale(50),
    padding: scale(1),
  },
  btnAction: {
    width: '80%',
    height: hScale(54),
    borderRadius: scale(27),
    marginTop: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FE724C,
    ...radius.shadow,
  },
  txtAction: {
    color: colors.white,
  },
});

export default observer(DeliveryAddressScreen);
