import React, {useState, useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import {openCamera, openPicker} from 'react-native-image-crop-picker';
import {getSystemVersion} from 'react-native-device-info';

import {OPTION_IMAGE, DATA_OPTION_IMAGE} from '@constant';
import {formatImage} from '@utils';

import Popup from '../Popup';
import ModalSelect from '../Modals/ModalSelect';

import Button from './Button';

let systemVersion = getSystemVersion();

const ButtonCamAndLib = ({
  disabled,
  stContainer,
  isCropping,
  Icon,
  name,
  setFieldValue,
  stBtnIcon,
  handleImg,
  multiple = true,
}) => {
  const optionRef = useRef(null);

  const [popup, setPopup] = useState({isVisible: false});
  const [modal, setModal] = useState({isVisible: false});

  const handleCancel = () => {
    setPopup({isVisible: false});
  };

  const handleAccept = () => {
    openSettings();
  };

  const handleOpenSetting = () => {
    setPopup({
      isVisible: true,
      title: 'Attention',
      content: 'Confirm permission to use the gallery and camera',
      cancel: 'Cancel',
      handleCancel: handleCancel,
      accept: 'Confirm',
      handleAccept: handleAccept,
    });
  };

  const handleRecheckPermission = () => {
    const permissions =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : systemVersion >= 13
        ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ];
    requestMultiple(permissions).then(statuses => {
      const cameraStatus = statuses[permissions[0]];
      const photoLibraryStatus = statuses[permissions[1]];
      if (
        cameraStatus === RESULTS.GRANTED &&
        photoLibraryStatus === RESULTS.GRANTED
      ) {
        if (OPTION_IMAGE?.CAMERA?.id === optionRef.current?.id) {
          handleImagePickerCamera();
        } else {
          handleImagePickerGallery();
        }
      } else {
        handleOpenSetting();
      }
    });
  };

  const checkPermissionStatus = (statuses, permission) => {
    return [RESULTS.UNAVAILABLE, RESULTS.DENIED, RESULTS.LIMITED]?.includes(
      statuses[permission],
    );
  };

  const checkMultiplePermission = () => {
    const permissions =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : systemVersion >= 13
        ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ];
    checkMultiple(permissions).then(statuses => {
      const cameraStatus = statuses[permissions[0]];
      const photoLibraryStatus = statuses[permissions[1]];
      if (
        cameraStatus === RESULTS.GRANTED &&
        photoLibraryStatus === RESULTS.GRANTED
      ) {
        if (OPTION_IMAGE?.CAMERA?.id === optionRef.current?.id) {
          handleImagePickerCamera();
        } else {
          handleImagePickerGallery();
        }
      } else if (
        checkPermissionStatus(statuses, permissions[0]) ||
        checkPermissionStatus(statuses, permissions[1])
      ) {
        handleRecheckPermission();
      } else {
        handleOpenSetting();
      }
    });
  };

  const handleImagePickerGallery = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 1,
      maxFiles: 10,
      multiple: multiple,
    };
    try {
      let response = await openPicker(options);
      if (response) {
        let formatArr = null;
        if (multiple) {
          formatArr = response?.map(item => {
            return formatImage(item);
          });
        } else {
          formatArr = formatImage(response);
        }
        if (handleImg) {
          handleImg(formatArr);
        } else {
          setFieldValue(name, formatArr);
        }
      }
    } catch (error) {}
  };

  const handleImagePickerCamera = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 1,
      cropping: isCropping ? true : false,
    };
    try {
      let response = await openCamera(options);
      if (response && Object.values(response)?.length > 0) {
        if (handleImg) {
          handleImg(formatImage(response));
        } else {
          setFieldValue(name, formatImage(response));
        }
      }
    } catch (error) {}
  };

  const handleOpenModal = () => {
    setModal({isVisible: true});
  };

  const onSelectOption = item => {
    optionRef.current = item;
    setModal({
      isVisible: false,
      onModalHide: () => {
        setTimeout(() => {
          checkMultiplePermission();
        }, 100);
      },
    });
  };

  const handleCloseModal = () => {
    setModal({isVisible: false});
  };

  return (
    <View style={[styles.container, stContainer]}>
      <Button
        opacity
        disabled={disabled}
        style={stBtnIcon}
        onPress={handleOpenModal}>
        {Icon && Icon}
      </Button>
      <Popup {...popup} />
      <ModalSelect
        labelValue={'name'}
        title={'Select Options'}
        data={DATA_OPTION_IMAGE}
        onSelect={onSelectOption}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}
        {...modal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ButtonCamAndLib;
