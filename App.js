import React from 'react';
import {NotifierWrapper} from 'react-native-notifier';

import AppContainer from './src/modules/AppContainer';

const App = () => {
  return (
    <NotifierWrapper>
      <AppContainer />
    </NotifierWrapper>
  );
};

export default App;
