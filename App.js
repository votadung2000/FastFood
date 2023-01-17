import React from 'react';
import {NotifierWrapper} from 'react-native-notifier';

import store, {Context} from './src/context';
import AppContainer from './src/modules/AppContainer';

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
