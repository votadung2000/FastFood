import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';

import {hScale, scale, wScale} from '@resolutions';
import {colors} from '@constant';

import {Button} from './Buttons';

const widthSwitch = wScale(33);
const widthCycleOutside = wScale(20);
const outputRange = widthSwitch - widthCycleOutside;

const Switch = ({isOn = false, handleActionSwitch}) => {
  let transformX = useRef(new Animated.Value(0)).current;

  const [active, setActive] = useState(true);
  const [on, setOn] = useState(true);

  useEffect(() => {
    setActive(isOn);
    setTimeout(() => {
      setOn(isOn);
    }, 150);
  }, [isOn]);

  useEffect(() => {
    if (active) {
      animatedTiming(1);
    } else {
      animatedTiming(0);
    }
  }, [active]);

  const animatedTiming = value => {
    Animated.timing(transformX, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, outputRange],
  });

  const clickAction = () => {
    if (handleActionSwitch) {
      handleActionSwitch();
    }
    setActive(status => !status);
    setTimeout(() => {
      setOn(value => !value);
    }, 150);
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={clickAction}
        style={[styles.btnSwitch, !on && styles.btnSwitchOff]}>
        <Animated.View
          style={[
            styles.vwCycleOutside,
            !on && styles.vwCycleOutsideOff,
            {
              transform: [
                {
                  translateX: rotationX,
                },
              ],
            },
          ]}>
          <View style={styles.vwCycleInside} />
        </Animated.View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  btnSwitch: {
    width: widthSwitch,
    height: hScale(17),
    borderRadius: scale(17),
    backgroundColor: colors.orange_FE724C,
    justifyContent: 'center',
  },
  btnSwitchOff: {
    backgroundColor: colors.gray_E0E0E0,
  },
  vwCycleOutside: {
    width: widthCycleOutside,
    height: wScale(20),
    borderRadius: scale(20),
    borderWidth: scale(2),
    borderColor: colors.white,
    backgroundColor: colors.orange_FE724C,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vwCycleOutsideOff: {
    backgroundColor: colors.gray_BDBDBD,
  },
  vwCycleInside: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(12),
    backgroundColor: colors.white,
  },
});

export default Switch;
