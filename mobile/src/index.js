import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import '~/config/ReactotronConfig';

import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '~/store';

import App from './App';

YellowBox.ignoreWarnings(['componentWillReceiveProps', 'Failed prop type']);

export default function Index() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar backgroundColor="#7D40E7" barStyle="light-content" />
          <App />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
