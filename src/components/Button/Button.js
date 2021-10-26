import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const defaultProps = {
  activeOpacity: 0.9,
};

const Button = ({disabled, children, style, ...rest}) => {
  return (
    <TouchableOpacity
      {...rest}
      {...{disabled}}
      style={[style, disabled && styles.disabled]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

Button.defaultProps = defaultProps;
export default Button;
