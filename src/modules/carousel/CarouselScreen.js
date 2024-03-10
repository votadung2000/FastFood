import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View, Image} from 'react-native';
import {Pagination} from 'react-native-snap-carousel';
import ReanimatedCarousel from 'react-native-reanimated-carousel';
import RNBootSplash from 'react-native-bootsplash';

import {Text} from '@components';
import {hScale, scale, wScale} from '@resolutions';
import {DATA_CAROUSEL, colors} from '@constant';

const {width} = Dimensions.get('window');

const CarouselScreen = () => {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <Image source={item?.image} style={styles.imgCard} />
        <View style={styles.vwDes}>
          <Text>{item?.context}</Text>
        </View>
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={DATA_CAROUSEL?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.containerStyle}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };

  const handleChangeItem = index => {
    setActiveSlide(index);
  };

  return (
    <View style={styles.container}>
      <ReanimatedCarousel
        loop={true}
        width={width - scale(40)}
        height={hScale(400)}
        autoPlay={true}
        // mode={"horizontal-stack"}
        data={DATA_CAROUSEL}
        scrollAnimationDuration={3000}
        onProgressChange={(_, absoluteProgress) => {
          handleChangeItem(Math.round(absoluteProgress));
        }}
        renderItem={renderItem}
        style={styles.stSnapCarousel}
      />
      {pagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: colors.white,
  },
  stSnapCarousel: {
    // marginTop: scale(20),
  },
  card: {
    alignItems: 'center',
  },
  imgCard: {
    width: wScale(330),
    height: hScale(300),
    // borderRadius: radius.radius30,
    backgroundColor: colors.white,
    paddingBottom: scale(14),
  },
  vwDes: {
    marginTop: scale(14),
  },
  containerStyle: {
    paddingVertical: scale(18),
  },
  dotStyle: {
    width: wScale(10),
    height: hScale(10),
    borderRadius: scale(10),
    marginHorizontal: scale(4),
    backgroundColor: colors.orange_FFE8A8,
  },
  inactiveDotStyle: {
    backgroundColor: colors.orange_FFC529,
  },
});

export default CarouselScreen;
