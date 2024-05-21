import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNStars from 'react-native-stars';

import {scale, wScale} from '@resolutions';
import {SVG_Star_Empty, SVG_Star_Full} from '@svg';
import {colors, findTypeRating, fontSize} from '@constant';

import Text from './Text';

const Stars = ({
  stars,
  count = 5,
  wStar = wScale(40),
  hStar = wScale(40),
  disabled,
  handleChangeStars,
}) => {
  const updateStars = val => {
    if (handleChangeStars) {
      handleChangeStars(val);
    }
  };

  return (
    <View style={styles.container}>
      {stars > 0 && (
        <Text bold style={styles.title}>
          {findTypeRating(stars)?.name || ''}
        </Text>
      )}
      <RNStars
        disabled={disabled}
        default={stars || 0}
        update={updateStars}
        spacing={scale(15)}
        count={count}
        starSize={50}
        fullStar={
          <SVG_Star_Full
            width={wStar}
            height={hStar}
            color={colors.orange_FFC529}
          />
        }
        emptyStar={
          <SVG_Star_Empty
            width={wStar}
            height={hStar}
            color={colors.graySystem}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.huge,
    color: colors.orange_FE724C,
    marginBottom: scale(10),
  },
});

export default Stars;
