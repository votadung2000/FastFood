import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
  request,
} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Popup from './Popup';

const Location = () => {
  const [popup, setPopup] = useState({isVisible: false});

  useEffect(() => {
    checkLocation();
  }, []);

  const handleOpenSetting = () => {
    setPopup({
      isVisible: true,
      title: 'Attention',
      content: 'Confirm permission to use the location',
      cancel: 'Cancel',
      handleCancel: () => {
        setPopup({isVisible: false});
      },
      accept: 'Confirm',
      handleAccept: () => {
        openSettings();
      },
    });
  };

  const checkPermissionStatus = status => {
    return [RESULTS.UNAVAILABLE, RESULTS.DENIED, RESULTS.LIMITED]?.includes(
      status,
    );
  };

  const handleRecheckPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await request(permission);

    if (status === RESULTS.GRANTED) {
      handleGetGeolocation();
    } else {
      handleOpenSetting();
    }
  };

  const checkLocation = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      handleGetGeolocation();
    } else if (checkPermissionStatus(status)) {
      handleRecheckPermission();
    } else {
      handleOpenSetting();
    }
  };

  const handleGetGeolocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
      },
      error => {
        console.log('error', error?.message);
      },
      {
        timeout: 2000,
        maximumAge: 30000,
        enableHighAccuracy: true,
      },
    );
  };

  return <Popup {...popup} />;
};

export default Location;
