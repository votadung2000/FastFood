import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

import {colors, fontSize, radius} from '@constant';
import {scale} from 'utils/resolutions';

import {Text, Button} from './index';

const Popup = ({
  isVisible,
  Icon,
  title,
  content,
  txtCancel,
  txtAccept,
  require,
  handleCancel,
  handleAccept,
}) => {
  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      isVisible={isVisible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}>
      <View style={styles.container}>
        <View style={styles.content}>
          {Icon && Icon}
          {title ? (
            <Text bold style={styles.title}>
              {title}
            </Text>
          ) : null}
          <Text style={styles.txtContent}>{content}</Text>
          {require && <Text style={styles.require}>{require}</Text>}
        </View>
        <View style={styles.action}>
          <Button
            style={[styles.btn, !txtAccept && styles.w100]}
            onPress={handleCancel}>
            <Text style={styles.txt}>{txtCancel}</Text>
          </Button>
          {txtAccept && (
            <Button
              style={[styles.btn, styles.btnAccept]}
              onPress={handleAccept}>
              <Text bold style={styles.txt}>
                {txtAccept}
              </Text>
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

Popup.defaultProps = {
  txtCancel: 'Quay lại',
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '86%',
    backgroundColor: colors.white,
    borderRadius: radius.radius6,
  },
  content: {
    alignItems: 'center',
    borderBottomColor: colors.graySystem,
    borderBottomWidth: 0.5,
    padding: scale(10),
  },
  title: {
    fontSize: fontSize.big,
    marginBottom: scale(10),
  },
  txtContent: {
    textAlign: 'center',
  },
  require: {
    color: colors.orangePopup,
    textAlign: 'center',
    marginTop: scale(5),
  },
  action: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: scale(5),
  },
  btn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(5),
  },
  w100: {
    width: '100%',
  },
  btnAccept: {
    borderLeftColor: colors.graySystem,
    borderLeftWidth: 0.5,
  },
  txt: {
    color: colors.orangePopup,
  },
});

export default memo(Popup);
