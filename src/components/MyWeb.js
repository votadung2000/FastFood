import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

import Loading from './Loading';

const MyWeb = ({uri}) => {
  const [isLoading, setLoading] = useState(true);

  const openModalLoading = () => {
    setLoading(true);
  };

  const closeModalLoading = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <WebView
        useWebKit
        originWhitelist={['*']}
        bounces={false}
        showsVerticalScrollIndicator={false}
        source={{uri}}
        style={styles.stWebView}
        onLoadStart={openModalLoading}
        onLoadEnd={closeModalLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stWebView: {
    flex: 1,
  },
});

export default MyWeb;
