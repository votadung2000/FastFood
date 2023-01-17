import React from 'react';
import {NotifierWrapper} from 'react-native-notifier';

import {Context} from '@context';
import store from '@store';

import AppContainer from './src/modules/AppContainer';

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
