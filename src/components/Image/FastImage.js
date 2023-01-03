import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image as RNImage} from 'react-native';
import RNFastImage from 'react-native-fast-image';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {checkIfValidUUID} from '@utils';
import {colors} from '@constant';
import {scale} from 'utils/resolutions';

const FastImage = ({source, resizeMode, handleError, style, ...rest}) => {
  const [isError, setIsError] = useState(false);
  const [aspectRadio, setAspectRadio] = useState(1);

  useEffect(() => {
    if (source?.uri) {
      RNImage.getSize(source?.uri, (width, height) => {
        if (width > 0 && height > 0) {
          setAspectRadio(width / height);
        } else {
          setAspectRadio(1);
        }
      });
    }
  }, []);

  const onError = () => {
    let dataUri = source?.uri?.split('/');
    let id = dataUri[dataUri?.length - 1];
    if (!isError && id !== 'undefined' && !checkIfValidUUID(id)) {
      setIsError(true);
      handleError && handleError();
    }
  };

  if (!source?.uri || isError) {
    return (
      <View style={[styles.error, style]}>
        <MCIcons
          name="image-remove"
          color={colors.graySystem}
          size={scale(32)}
        />
      </View>
    );
  }

  return (
    <RNFastImage
      {...rest}
      source={source}
      resizeMode={resizeMode || RNFastImage.resizeMode.cover}
      style={[styles.img, {aspectRadio}, style]}
      onError={onError}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(FastImage);
