import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const CarouselScreen = () => {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <View>
      <Text>CarouselScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CarouselScreen;
