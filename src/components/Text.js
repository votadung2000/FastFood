import React from 'react';

import {StyleSheet, Text as RNText, Platform} from 'react-native';

import {colors, fontSize} from '@constant';

const Text = ({children, style, bold, ...rest}) => {
  return (
    <RNText
      style={[bold ? styles.bold : styles.regular, styles.text, style]}
      {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.normal,
    color: colors.black,
  },
  regular: {
    ...Platform.select({
      android: {},
      ios: {},
    }),
  },
  bold: {
    fontWeight: '700',
    ...Platform.select({
      android: {},
      ios: {},
    }),
  },
});

export default React.memo(Text);
