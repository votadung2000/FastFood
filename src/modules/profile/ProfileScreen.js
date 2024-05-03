import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  ScrollView,
} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {Back, Button, Text} from '@components';
import {colors, fontSize, radius} from '@constant';
import {scale, wScale} from '@resolutions';
import {useStore} from '@context';
import routes from '@routes';

import ItemCard from './ItemCard';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const {
    userStore: {user},
  } = useStore();

  const handleNav = route => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('@images/bg_profile.png')}
          resizeMode="stretch"
          style={styles.image}
        />
        <Back style={styles.back} />
        <View style={styles.vwImg}>
          <Image source={require('@images/avatar.png')} style={styles.img} />
        </View>
        <Button
          style={styles.btnEdit}
          onPress={() => handleNav(routes.EditProfileScreen)}>
          <Text style={styles.txtEdit}>{'Edit Profile'}</Text>
        </Button>
        <View style={styles.content}>
          <ItemCard label={'Name'} value={user?.name || ''} />
          <ItemCard
            label={'Username'}
            value={user?.user_name || ''}
            style={styles.stItemCard}
          />
          <ItemCard
            label={'Phone number'}
            value={user?.phone_number || ''}
            style={styles.stItemCard}
          />
          <ItemCard
            label={'E-mail'}
            value={user?.email || ''}
            style={styles.stItemCard}
          />
          <ItemCard
            label={'Address'}
            value={user?.address || ''}
            style={styles.stItemCard}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  back: {
    marginTop: scale(27),
    paddingHorizontal: scale(25),
  },
  vwImg: {
    width: wScale(110),
    height: wScale(110),
    borderRadius: scale(110),
    marginTop: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  img: {
    width: wScale(90),
    height: wScale(90),
    borderRadius: scale(90),
  },
  btnEdit: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: scale(2),
  },
  txtEdit: {
    fontSize: fontSize.fontSize14,
    color: colors.gray_9796A1,
  },
  scroll: {
    flexGrow: 1,
    marginTop: scale(20),
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: scale(25),
    paddingBottom: scale(50),
  },
  stItemCard: {
    marginTop: scale(20),
  },
});

export default observer(ProfileScreen);