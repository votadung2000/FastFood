import React from 'react';
import {NotifierWrapper} from 'react-native-notifier';

import AppContainer from './src/modules/AppContainer';
import store from './src/store';
import {Context} from './src/context';

const App = () => {
  return (
    <Context.Provider value={store}>
      <NotifierWrapper>
        <AppContainer />
      </NotifierWrapper>
    </Context.Provider>
  );
};

export default App;
