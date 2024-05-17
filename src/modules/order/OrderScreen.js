import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Back} from '@components';
import {TAB_ORDER, colors} from '@constant';
import {scale} from '@resolutions';
import {useStore} from '@context';

import TopTabs from './TopTabs';
import UpcomingOrderScreen from '../upcoming_order';
import HistoryOrderScreen from '../history_order';

const OrderScreen = () => {
  const {
    orderStore: {tab, initTab},
  } = useStore();

  useEffect(() => {
    return () => {
      initTab();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Back title={'My Order'} />
      <TopTabs />
      <View style={styles.content}>
        {TAB_ORDER.UPCOMING.id === tab?.id ? (
          <UpcomingOrderScreen />
        ) : (
          <HistoryOrderScreen />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginTop: scale(20),
  },
});

export default observer(OrderScreen);
