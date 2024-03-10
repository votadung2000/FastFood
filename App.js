import React from 'react';
import {StyleSheet} from 'react-native';
import {NotifierWrapper} from 'react-native-notifier';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Context} from '@context';
import store from '@store';

import AppContainer from './src/modules/AppContainer';

const App = () => {
  return (
    <Context.Provider value={store}>
      <GestureHandlerRootView style={styles.gesView}>
        <NotifierWrapper>
          <AppContainer />
        </NotifierWrapper>
      </GestureHandlerRootView>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  gesView: {
    flex: 1,
  },
});

export default App;
