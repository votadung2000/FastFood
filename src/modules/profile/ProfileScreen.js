import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  ScrollView,
} from 'react-native';
import {observer} from 'mobx-react';

import {Back} from '@components';
import {colors, radius} from '@constant';
import {scale, wScale} from '@resolutions';
import {useStore} from '@context';

import ItemCard from './ItemCard';

const ProfileScreen = () => {
  const {
    userStore: {user},
  } = useStore();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@images/bg_profile.png')}
        resizeMode="stretch"
        style={styles.image}
      />
      <Back style={styles.back} />
      <View style={styles.vwImg}>
        <Image source={require('@images/avatar.png')} style={styles.img} />
      </View>
      <ScrollView
        bounces={false}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}>
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
    marginTop: scale(30),
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
  scroll: {
    flexGrow: 1,
    marginTop: scale(30),
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
