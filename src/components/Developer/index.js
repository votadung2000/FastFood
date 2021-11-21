import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LOGGING } from 'react-native-dotenv';
import { useNavigation } from '@react-navigation/native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { hScale, wScale } from '../../utils/resolutions';
import routes from '../../routes';


const Developer = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const handleCount = () => {
    if (count > 6) {
      setCount(0);
      navigation.navigate(routes.LOGGING);
    } else {
      setCount(prev => prev + 1);
    }
  }

  if (LOGGING === 'TRUE') {
    return <TouchableOpacity style={styles.btn} onPress={handleCount} />;
  };
  return null;
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wScale(isIphoneX() ? 42 : 38),
    height: hScale(isIphoneX() ? 32 : 22),
    zIndex: 9999,
  },
});

export default React.memo(Developer);
