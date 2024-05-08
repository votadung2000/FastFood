import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text, Switch, Button} from '@components';
import {colors, radius} from '@constant';
import {scale} from '@resolutions';

const CardPermission = ({
  disabled,
  isOn,
  title,
  Icon,
  onPress,
  handleActionSwitch,
}) => {
  if (Icon) {
    return (
      <View style={styles.container}>
        <Button disabled={disabled} style={styles.content} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
          {Icon && Icon}
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Switch isOn={isOn} handleActionSwitch={handleActionSwitch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(1),
  },
  content: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    marginBottom: scale(15),
    backgroundColor: colors.white,
    borderRadius: radius.radius6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...radius.shadow,
  },
  title: {},
});

export default CardPermission;
