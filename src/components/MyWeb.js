import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const MyWeb = ({uri}) => {
  return (
    <WebView
      useWebKit
      originWhitelist={['*']}
      source={{uri}}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyWeb;
