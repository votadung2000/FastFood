import React from 'react';
import {StyleSheet, ActivityIndicator, Text, View} from 'react-native';
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
      <View style={styles.container}>
        <Text>aaaa</Text>
        <ActivityIndicator size="small" color={colors.gray} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    margin: 0,
    height: 100,
    backgroundColor: 'red',
  },
});

export default React.memo(ModalLoading);
