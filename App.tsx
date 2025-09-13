import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
enableScreens();
const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </>
  );
};

export default App;