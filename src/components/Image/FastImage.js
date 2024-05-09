import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image as RNImage} from 'react-native';
import RNFastImage from 'react-native-fast-image';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'react-native-config';

import {checkIfValidUUID} from '@utils';
import {colors, radius} from '@constant';
import {scale} from '@resolutions';

const FastImage = ({
  isPath,
  source,
  resizeMode,
  handleError,
  style,
  ...rest
}) => {
  const [isError, setIsError] = useState(false);
  const [aspectRadio, setAspectRadio] = useState(1);

  useEffect(() => {
    if (isPath) {
      RNImage.getSize(Config.API_IMAGE + source?.uri, (width, height) => {
        if (width > 0 && height > 0) {
          setAspectRadio(width / height);
        } else {
          setAspectRadio(1);
        }
      });
    } else if (source?.uri) {
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
      source={isPath ? {uri: Config.API_IMAGE + source?.uri} : source}
      resizeMode={resizeMode || RNFastImage.resizeMode.cover}
      style={[styles.img, {aspectRadio}, style]}
      onError={onError}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    borderRadius: radius.radius6,
  },
  error: {
    paddingVertical: scale(5),
    borderRadius: radius.radius10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default React.memo(FastImage);
