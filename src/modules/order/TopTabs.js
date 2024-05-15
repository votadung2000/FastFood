import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Button, Text} from '@components';
import {hScale, scale} from '@resolutions';
import {DATA_TAB_ORDER, colors} from '@constant';
import {useStore} from '@context';

const TopTabs = () => {
  const {
    orderStore: {tab, handleTabSwitch},
  } = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {DATA_TAB_ORDER.map((ele, index) => {
          const isSelect = ele?.id === tab.id;
          return (
            <Button
              key={index?.toString()}
              style={[styles.btnTab, isSelect && styles.isSelectBtnTab]}
              onPress={() => handleTabSwitch(ele)}>
              <Text
                bold
                style={[styles.txtTab, isSelect && styles.isSelectTxtTab]}>
                {ele?.name}
              </Text>
            </Button>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(25),
    marginTop: scale(25),
  },
  content: {
    width: '100%',
    height: hScale(55),
    borderWidth: scale(1),
    borderRadius: scale(25),
    borderColor: colors.gray_EEEEEE,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btnTab: {
    width: '48%',
    height: hScale(46),
    borderRadius: scale(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  isSelectBtnTab: {
    backgroundColor: colors.orange_FE724C,
  },
  txtTab: {
    color: colors.orange_FE724C,
  },
  isSelectTxtTab: {
    color: colors.white,
  },
});

export default observer(TopTabs);
