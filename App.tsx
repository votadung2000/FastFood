import React from 'react';
import {NotifierWrapper} from 'react-native-notifier';

import {Context} from './src/context';
import AppContainer from './src/modules/AppContainer';
import store from './src/context';

const App = () => {
  return (
    <Context.Provider value={store}>
      <NotifierWrapper children={undefined}>
        <AppContainer />
      </NotifierWrapper>
    </Context.Provider>
  );
};

export default App;
