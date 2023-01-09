import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {colors} from '@constant';
import {Button} from '@components';
import {resolutions} from '@utils';

const {scale} = resolutions;

const ImagesViewer = ({images, index, closeModal}) => {
  const imageUrls = images?.map(image => ({
    url: image,
  }));

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
    <Modal
      useNativeDriver
      isVisible={true}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={styles.modal}>
      <ImageViewer
        useNativeDriver
        enableSwipeDown
        index={index || 0}
        imageUrls={imageUrls}
        onCancel={closeModal}
        loadingRender={loadingRender}
        renderHeader={renderHeader}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
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
