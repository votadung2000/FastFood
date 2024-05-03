import React from 'react';
import {StyleSheet} from 'react-native';
import {NotifierWrapper} from 'react-native-notifier';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {request, PERMISSIONS} from 'react-native-permissions';

import {Context} from '@context';
import store from '@store';

import AppContainer from './src/modules/AppContainer';

const App = () => {
  // useEffect(() => {
  //   const listener = AppState.addEventListener('change', status => {
  //     if (Platform.OS === 'ios' && status === 'active') {
  //       request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
  //         .then(result => console.log(result))
  //         .catch(error => console.log(error));
  //     }
  //   });

  //   return listener.remove;
  // }, []);

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
