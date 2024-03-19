import {StyleSheet} from 'react-native';
import {Notifier, NotifierComponents} from 'react-native-notifier';

import {colors, fontSize} from '@constant';

const Notifer = ({alertType, title, des}) => {
  // const getTileStyle = () => {
  //   if (alertType === 'error') {
  //     return styles.titleError;
  //   }
  //   if (alertType === 'success') {
  //     return styles.titleSuccess;
  //   }
  //   if (alertType === 'warn') {
  //     return styles.titleWarn;
  //   }
  //   if (alertType === 'info') {
  //     return styles.titleInfo;
  //   }
  // };

  if (alertType) {
    if (title && des) {
      return Notifier.showNotification({
        title: title,
        description: des,
        Component: NotifierComponents.Alert,
        // Component: NotifierComponents.Notification,
        componentProps: {
          alertType: alertType || 'info', // error(red), success(green), warn(orange) and info(blue)
          // titleStyle: getTileStyle(),
          titleStyle: styles.titleStyle,
          descriptionStyle: styles.desStyle,
        },
        // containerStyle: styles.ccSt
      });
    } else {
      return Notifier.showNotification({
        title: title,
        Component: NotifierComponents.Alert,
        // Component: NotifierComponents.Notification,
        componentProps: {
          alertType: alertType || 'info',
          // titleStyle: getTileStyle(),
          titleStyle: styles.titleStyle,
          descriptionStyle: styles.desStyle,
        },
        // containerStyle: styles.ccSt
      });
    }
  }
};

const styles = StyleSheet.create({
  ccSt: {
    position: 'absolute',
    top: 20,
    borderRadius: 4,
  },
  titleStyle: {
    color: colors.white,
    fontFamily: 'Inter-Regular',
  },
  titleError: {
    fontSize: fontSize.fontSize16,
    color: colors.redSystem,
    fontFamily: 'Inter-Regular',
  },
  titleSuccess: {
    fontSize: fontSize.fontSize16,
    color: colors.green,
    fontFamily: 'Inter-Regular',
  },
  titleWarn: {
    fontSize: fontSize.fontSize16,
    color: colors.yellow,
    fontFamily: 'Inter-Regular',
  },
  titleInfo: {
    fontSize: fontSize.fontSize16,
    color: colors.blue,
    fontFamily: 'Inter-Regular',
  },
  desStyle: {
    fontSize: fontSize.fontSize16,
    color: colors.black,
    fontFamily: 'Inter-Regular',
  },
});

export default Notifer;
