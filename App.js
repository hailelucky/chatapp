/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { MainContextProvider } from './src/contexts';
import { store } from './src/store';
import { MainStackNavigator } from './src/navigators/MainNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <MainContextProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </MainContextProvider>
    </Provider>
  );
};

export default App;
