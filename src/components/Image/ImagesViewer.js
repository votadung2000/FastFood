import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '@constant';
import {scale} from '@resolutions';

import Button from '../Button/Button';
import Modal from '../Modal';

const ImagesViewer = ({images, index, closeModal, ...rest}) => {
  const imageUrls = images?.map(ele => {
    if (ele?.uri) {
      return {url: ele?.uri};
    }
    if (ele?.source) {
      return {
        url: '',
        props: {
          source: ele?.source,
        },
      };
    }
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <Button onPress={closeModal} style={styles.btnClose}>
        <Ionicons
          size={scale(28)}
          name="ios-close-circle-sharp"
          color={colors.white}
        />
      </Button>
    </View>
  );

  const loadingRender = () => (
    <ActivityIndicator size="small" color={colors.white} />
  );

  return (
    <Modal {...rest}>
      <ImageViewer
        useNativeDriver
        enableSwipeDown
        index={index || 0}
        imageUrls={imageUrls}
        loadingRender={loadingRender}
        renderHeader={renderHeader}
        backgroundColor="rgba(0, 0, 0, 0.5)"
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 999,
    position: 'absolute',
    right: 0,
    top: isIphoneX() ? 30 : 10,
    alignItems: 'flex-end',
  },
  btnClose: {
    paddingLeft: scale(5),
    paddingRight: scale(12),
    paddingVertical: scale(3),
  },
});

export default React.memo(ImagesViewer);
