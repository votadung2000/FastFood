import React, {useCallback} from 'react';
import {Linking} from 'react-native';

import Notifer from '../Notifer';
import Button from './Button';

const ButtonOpenURL = ({url, children}) => {
  const handleOpenLink = useCallback(async () => {
    await Linking.openURL(url).catch(err => {
      Notifer({
        alertType: 'warn',
        title: 'Unable to open link',
      });
      console.log(err);
    });
  }, [url]);

  return <Button onPress={handleOpenLink}>{children}</Button>;
};

export default ButtonOpenURL;
