import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

import {colors} from '@constant';

const ModalLoading = ({isVisible}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.72}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <ActivityIndicator size="large" color={colors.blue} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(ModalLoading);
