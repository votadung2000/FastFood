import React, {
  useState,
  useEffect,
} from "react";
import {
  Keyboard,
  StyleSheet,
  Animated,
} from "react-native";

const KeyboardListener = ({ children, style }) => {
  const [opacity, _setOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    _animate(0);
  };

  const _keyboardDidHide = () => {
    _animate(1);
  };

  const _animate = toValue => {
    Animated.timing(opacity, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  const containerStyle = {
    opacity: opacity,
  };

  return (
    <Animated.View
      style={[
        containerStyle,
        styles.icon,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    zIndex: -1,
  },
});

export default KeyboardListener;