import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Dimensions, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Button, Text} from '@components';
import {hScale, scale, wScale} from '@resolutions';
import {DATA_CAROUSEL, colors, fontSize} from '@constant';
import {getCarousel, setCarousel} from '@storage';
import routes from '@routes';

const {width} = Dimensions.get('window');

const CarouselScreen = () => {
  const navigation = useNavigation();

  const [indexCarousel, setIndexCarousel] = useState(0);

  useEffect(() => {
    handleCheckFirstCarousel();
  }, []);

  const handleCheckFirstCarousel = async () => {
    let firstCarousel = await getCarousel();

    if (!firstCarousel) {
      await setCarousel('HAD');
    } else {
      navigation.replace(routes.RoutesNavigator);
    }
  };

  const handleCarousel = () => {
    if (indexCarousel + 1 === DATA_CAROUSEL?.length) {
      navigation.navigate(routes.RoutesNavigator);
    } else {
      let index = indexCarousel + 1;
      setIndexCarousel(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={DATA_CAROUSEL[indexCarousel]?.image}
          style={styles.imgCard}
          resizeMode="contain"
        />
        <View style={styles.vwDes}>
          <Text style={styles.title}>
            {DATA_CAROUSEL[indexCarousel]?.title}
          </Text>
          <Text style={styles.context}>
            {DATA_CAROUSEL[indexCarousel]?.context}
          </Text>
        </View>
      </View>
      <Button style={styles.btnNext} onPress={handleCarousel}>
        <AntDesign name="arrowright" size={wScale(28)} color={colors.white} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    ...Platform.select({
      android: {
        paddingTop: scale(50),
      },
      ios: {
        paddingTop: scale(70),
      },
    }),
  },
  card: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCard: {
    width: wScale(330),
    height: hScale(345),
    backgroundColor: colors.white,
    paddingBottom: scale(14),
  },
  vwDes: {
    marginTop: scale(14),
  },
  title: {
    fontSize: fontSize.fontSize34,
    color: colors.blue_131A38,
    textAlign: 'center',
  },
  context: {
    color: colors.gray_616772,
    textAlign: 'center',
    marginTop: scale(16),
  },
  btnNext: {
    width: wScale(67),
    height: wScale(67),
    borderRadius: scale(67),
    marginTop: scale(50),
    backgroundColor: colors.orange_FD724C,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default CarouselScreen;
