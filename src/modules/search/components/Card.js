import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fontSize} from '../../../constant';
import {scale} from '../../../utils/resolutions';
import {Text, Button} from '../../../components';

const Card = ({
  // index,
  data,
  bgLG,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={bgLG}
        style={styles.linearGradient}>
        <Button
          // onPress={() => onPress()}
          style={styles.btn}>
          <Text bold style={styles.text}>
            {data?.title}
          </Text>
          <Image source={{uri: data.img}} style={styles.img} />
        </Button>
      </LinearGradient>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
  },
  linearGradient: {
    zIndex: 9999,
    borderRadius: scale(15),
  },
  text: {
    fontSize: fontSize.big,
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
