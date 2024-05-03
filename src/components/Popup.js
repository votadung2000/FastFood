import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
// import Modal from 'react-native-modal';

import {colors, fontSize, radius} from '@constant';
import {scale} from '@resolutions';

import Button from './Buttons/Button';
import Text from './Text';
import Modal from './Modals/Modal';

const Popup = ({
  Icon,
  title,
  content,
  cancel,
  accept,
  require,
  handleCancel,
  handleAccept,
  ...rest
}) => {
  return (
    <Modal stModal={styles.modal} {...rest}>
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
            style={[styles.btn, !accept && styles.w100]}
            onPress={handleCancel}>
            <Text style={styles.txt}>{cancel}</Text>
          </Button>
          {accept && (
            <Button
              style={[styles.btn, styles.btnAccept]}
              onPress={handleAccept}>
              <Text bold style={styles.txt}>
                {accept}
              </Text>
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

Popup.defaultProps = {
  cancel: 'Cancel',
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
