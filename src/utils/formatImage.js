import {Platform} from 'react-native';

export default ({path, size, modificationDate}) => {
  if (!path) {
    return;
  }

  let uriMedia = Platform.OS === 'android' ? path : path.replace('file://', '');
  let nameMedia = uriMedia.split('/').pop();
  let typeMedia = uriMedia.split('.').pop();

  return {
    id: modificationDate + nameMedia,
    name: nameMedia,
    type: `image/${typeMedia}`,
    uri: uriMedia,
    size: size,
    local: true,
  };
};
