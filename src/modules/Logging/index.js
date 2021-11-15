import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, Back } from '../../components';
import { colors, fontSize } from '../../constant';
import { scale } from '../../utils/resolutions';
import { Layout } from '../../views';

const Logging = () => {
  return (
    <Layout>
      <View style={styles.header}>
        <Back />
        <Text bold color={colors.background1} style={styles.title}>
          {`Logging`}
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    // justifyContent: '',
    alignItems:'',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  title: {
    fontSize: fontSize.large,
  },
});

export default Logging;
