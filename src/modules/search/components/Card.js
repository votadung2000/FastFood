import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fontSize} from '@constant';
import {resolutions} from '@utils';
import {Text, Button, FastImage} from '@components';

const {scale} = resolutions;

const Card = ({data, bgLG, onPressCard}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={bgLG}
        style={styles.linearGradient}>
        <Button onPress={() => onPressCard(data)} style={styles.btn}>
          <Text bold style={styles.text}>
            {data?.name}
          </Text>
          <FastImage source={{uri: data?.image}} style={styles.img} />
        </Button>
      </LinearGradient>
    </View>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(20),
  },
  linearGradient: {
    zIndex: 9999,
    borderRadius: scale(6),
  },
  text: {
    fontSize: fontSize.huge,
    color: colors.white,
  },
  btn: {
    width: '100%',
    paddingVertical: scale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(15),
  },
  img: {
    width: scale(70),
    height: scale(70),
  },
});
